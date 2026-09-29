import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const secretKey = formData.get("secretKey") as string;
    const file = formData.get("file") as File;

    if (secretKey !== process.env.BLOG_ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const accountId = process.env.CF_R2_ACCOUNT_ID;
    const accessKeyId = process.env.CF_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CF_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CF_R2_BUCKET_NAME;
    const publicUrl = process.env.CF_R2_PUBLIC_URL?.replace(/\/$/, "");

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
      return NextResponse.json({ error: "R2 environment variables not configured" }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 60);
    const objectKey = `blog-images/${safeName}-${timestamp}.${ext}`;

    // Use AWS Signature V4 to upload to R2 (R2 is S3-compatible)
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;
    const url = `${endpoint}/${bucketName}/${objectKey}`;

    const { createHmac, createHash } = await import("crypto");

    const now = new Date();
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, "");
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 15) + "Z";
    const region = "auto";
    const service = "s3";

    const contentType = file.type || "image/jpeg";
    const payloadHash = createHash("sha256").update(buffer).digest("hex");

    const headers: Record<string, string> = {
      "content-type": contentType,
      "host": `${accountId}.r2.cloudflarestorage.com`,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
    };

    const signedHeaders = Object.keys(headers).sort().join(";");
    const canonicalHeaders = Object.keys(headers)
      .sort()
      .map((k) => `${k}:${headers[k]}`)
      .join("\n") + "\n";

    const canonicalRequest = [
      "PUT",
      `/${bucketName}/${objectKey}`,
      "",
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join("\n");

    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = [
      "AWS4-HMAC-SHA256",
      amzDate,
      credentialScope,
      createHash("sha256").update(canonicalRequest).digest("hex"),
    ].join("\n");

    function hmac(key: Buffer | string, data: string): Buffer {
      return createHmac("sha256", key).update(data).digest();
    }

    const signingKey = hmac(
      hmac(hmac(hmac(`AWS4${secretAccessKey}`, dateStamp), region), service),
      "aws4_request"
    );
    const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");

    const authHeader = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const uploadRes = await fetch(url, {
      method: "PUT",
      headers: {
        ...headers,
        "Authorization": authHeader,
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      console.error("R2 upload failed:", text);
      return NextResponse.json({ error: "R2 upload failed", detail: text }, { status: 500 });
    }

    const imageUrl = `${publicUrl}/${objectKey}`;
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error("upload-blog-image error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
