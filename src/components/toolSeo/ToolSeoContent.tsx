import { toolSeoCopy } from "./toolSeoData";

/** Server-rendered explainer under a tool: gives the page real, crawlable content and H2 structure. */
export default function ToolSeoContent({ slug }: { slug: keyof typeof toolSeoCopy | string }) {
  const copy = toolSeoCopy[slug];
  if (!copy) return null;
  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem", lineHeight: 1.7 }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.75rem" }}>About the {copy.name}</h2>
      <p style={{ marginBottom: "1.5rem" }}>{copy.intro}</p>

      {copy.deepDive && (
        <>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Why it matters for your job search</h2>
          {copy.deepDive.map((para) => (
            <p key={para} style={{ marginBottom: "1rem" }}>{para}</p>
          ))}
        </>
      )}

      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>How to use the {copy.name}</h2>
      <ol style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem", listStyle: "decimal" }}>
        {copy.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Tips for better results</h2>
      <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem", listStyle: "disc" }}>
        {copy.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Frequently asked questions</h2>
      {copy.faqs.map((f) => (
        <div key={f.q} style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <p style={{ marginTop: "1.5rem" }}>
        Want Flashfire to apply to jobs for you? <a href="/pricing" style={{ textDecoration: "underline" }}>See our plans</a> or{" "}
        <a href="/book-a-demo" style={{ textDecoration: "underline" }}>book a free demo</a>.
      </p>
    </section>
  );
}
