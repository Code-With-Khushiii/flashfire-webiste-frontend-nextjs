"use client";

import { useState, useRef } from "react";

const CATEGORIES = [
  "Resume Writing",
  "Job Search",
  "Interview Tips",
  "Career Tips",
  "LinkedIn",
  "Salary",
  "Remote Work",
  "Cover Letter",
  "ATS Optimization",
  "Networking",
];

const AUTHORS = [
  { name: "Debashri Mandal", bio: "Career expert and resume strategist helping job seekers land their dream roles." },
  { name: "Riya Sharma", bio: "Job search coach and career writer with a passion for helping freshers break into top companies." },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Resume Writing": "bg-blue-100 text-blue-600",
  "Job Search": "bg-green-100 text-green-600",
  "Interview Tips": "bg-purple-100 text-purple-600",
  "Career Tips": "bg-orange-100 text-orange-600",
  "LinkedIn": "bg-sky-100 text-sky-600",
  "Salary": "bg-yellow-100 text-yellow-600",
  "Remote Work": "bg-teal-100 text-teal-600",
  "Cover Letter": "bg-pink-100 text-pink-600",
  "ATS Optimization": "bg-indigo-100 text-indigo-600",
  "Networking": "bg-red-100 text-red-600",
};

export default function NewBlogPage() {
  const [form, setForm] = useState({
    metaTitle: "",
    metaDescription: "",
    h1: "",
    slug: "",
    category: CATEGORIES[0],
    tags: "",
    authorName: AUTHORS[0].name,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "",
    imageUrl: "",
    content: "",
    secretKey: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  }

  async function uploadImage(): Promise<string> {
    if (!imageFile) return form.imageUrl;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("secretKey", form.secretKey);

      const res = await fetch("/api/upload-blog-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");
      return data.url;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.secretKey) {
      setStatus({ type: "error", message: "Secret key is required." });
      return;
    }
    if (!form.metaTitle || !form.metaDescription || !form.h1 || !form.slug) {
      setStatus({ type: "error", message: "Meta Title, Meta Description, H1, and Slug are required." });
      return;
    }
    if (!form.content.trim()) {
      setStatus({ type: "error", message: "Blog content is required." });
      return;
    }
    if (!imageFile && !form.imageUrl) {
      setStatus({ type: "error", message: "Please upload an image or provide an image URL." });
      return;
    }

    try {
      setPublishing(true);

      const imageUrl = await uploadImage();

      const author = AUTHORS.find((a) => a.name === form.authorName) || AUTHORS[0];
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        slug: form.slug.trim(),
        title: form.h1.trim(),
        metaTitle: form.metaTitle.trim(),
        excerpt: form.metaDescription.trim(),
        date: form.date,
        readTime: form.readTime || "8 min",
        category: form.category,
        tags: tagsArray.length ? tagsArray : [form.category],
        author,
        image: imageUrl,
        categoryColor: CATEGORY_COLORS[form.category] || "bg-gray-100 text-gray-600",
        content: form.content,
        secretKey: form.secretKey,
      };

      const res = await fetch("/api/publish-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed");

      setStatus({ type: "success", message: `Blog published! It will be live after GitHub deploys. Slug: /blog/${form.slug}` });
      setForm((prev) => ({ ...prev, metaTitle: "", metaDescription: "", h1: "", slug: "", tags: "", readTime: "", imageUrl: "", content: "" }));
      setImageFile(null);
      setImagePreview("");
    } catch (err: unknown) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setPublishing(false);
    }
  }

  const isLoading = uploading || publishing;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Publish New Blog</h1>
          <p className="text-gray-500 mt-1">Fill in the details below and click Publish. The blog will go live after auto-deploy.</p>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Auth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Secret Key <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="secretKey"
              value={form.secretKey}
              onChange={handleChange}
              placeholder="Enter the admin secret key"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <hr className="border-gray-100" />

          {/* SEO Fields */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">SEO Fields</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                placeholder="e.g. How to Get a Job in the UK: A Complete Guide"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">{form.metaTitle.length}/60 chars recommended</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description <span className="text-red-500">*</span></label>
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Learn how to get a job in the UK, including where to find jobs, visa requirements, CV tips..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/160 chars recommended</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">H1 (Blog Page Title) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="h1"
                value={form.h1}
                onChange={handleChange}
                placeholder="e.g. How to Get a Job in the UK"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 whitespace-nowrap">/blog/</span>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="how-to-get-a-job-in-the-uk"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Blog Details */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blog Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={form.readTime}
                  onChange={handleChange}
                  placeholder="e.g. 8 min"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                <select
                  name="authorName"
                  value={form.authorName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {AUTHORS.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Publish Date</label>
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="e.g. Jan 15, 2025"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. Job Search, UK Jobs, Work Visa, CV Tips"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Image */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blog Thumbnail Image</h2>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
              ) : (
                <div>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — uploads directly to Cloudflare R2</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or paste URL directly</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={(e) => {
                handleChange(e);
                setImageFile(null);
                setImagePreview("");
              }}
              placeholder="https://pub-xxxx.r2.dev/blog-images/my-image.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <hr className="border-gray-100" />

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blog Content (HTML)</h2>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={20}
              placeholder={`<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-3">Your Section Title</h2>\n<p style='margin-bottom:12px; line-height:1.7;'>Your paragraph text here...</p>`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
            <p className="text-xs text-gray-400">Paste the HTML content from Google Doc here. Use the same format as existing blogs.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-lg">⟳</span>
                {uploading ? "Uploading image..." : "Publishing to GitHub..."}
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
