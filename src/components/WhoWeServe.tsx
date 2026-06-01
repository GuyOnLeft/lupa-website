import { useEffect, useRef, useState } from "react";

const mono = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const AUDIENCES = [
  { icon: "🏛", title: "County Property Appraisers", desc: "Homestead and exemption compliance across large parcel portfolios — without adding staff.", tag: "Primary audience" },
  { icon: "🗂", title: "State Revenue Agencies", desc: "Cross-county exemption stacking detection and statewide audit program support.", tag: "Statewide scale" },
  { icon: "📐", title: "Municipal Assessors", desc: "Permit compliance, unpermitted construction detection, and assessment gap recovery.", tag: "Local compliance" },
];

function AudienceCard({ a, i, visible }: { a: typeof AUDIENCES[0]; i: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#0f0f0a" : "#0d0d0d",
        border: `1px solid ${hov ? "#FFB800" : "#1a1a1a"}`,
        borderRadius: 4, padding: 28, cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${i * 0.12}s`,
        transitionProperty: "opacity, transform, background, border-color",
        transitionDuration: "0.5s, 0.5s, 0.2s, 0.2s",
        transitionTimingFunction: "ease",
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 16 }}>{a.icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{a.title}</div>
      <div style={{ fontSize: 11, color: "#555", lineHeight: 1.7, marginBottom: 16, ...mono }}>{a.desc}</div>
      <div style={{ fontSize: 9, color: "#FFB800", letterSpacing: "0.15em", textTransform: "uppercase", ...mono }}>{a.tag} →</div>
    </div>
  );
}

export default function WhoWeServe() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section style={{ padding: "80px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, ...mono }}>// Who We Serve</div>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 48, fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em" }}>Built for the agencies that own parcel-level compliance.</h2>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {AUDIENCES.map((a, i) => <AudienceCard key={a.title} a={a} i={i} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}
