import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const mono = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const PRODUCTS = [
  {
    num: "01", title: "Lupa CrossCheck",
    desc: "Cross-jurisdiction homestead violation detection — identifying owners simultaneously claiming primary-residence tax benefits in more than one jurisdiction. Public-records-only sourcing with citation-backed evidence packets.",
    tags: ["FL §196.155", "ARS 42-12053", "FL §196.031"],
    learnHref: "/homestead-exemption-audit/",
    demoSubject: "Lupa CrossCheck inquiry",
    terminalLabel: "// CROSSCHECK · DUAL-CLAIM DETECTION",
    terminalRows: [
      { key: "RECORD A", val: "J. Smith · FL · EXEMPT", gold: true },
      { key: "RECORD B", val: "J. Smith · NY · EXEMPT", gold: true },
      { key: "STATUS",   val: "DUAL CLAIM DETECTED",    alert: true },
    ],
  },
  {
    num: "02", title: "Lupa PoolFind",
    desc: "Satellite-based detection of unrecorded pool installations cross-referenced against permit history and tax roll records. Validated 2026 against Cape Coral / Lee County FL.",
    tags: ["FL §193.011", "DR-405 Extra Features"],
    learnHref: "/pool-detection/",
    demoSubject: "Lupa PoolFind inquiry",
    terminalLabel: "// POOLFIND · AERIAL SCAN · NAIP 0.6m",
    terminalRows: [
      { key: "CONF",     val: "0.97",          gold: true },
      { key: "TYPE",     val: "IN-GROUND",      gold: false },
      { key: "TAX ROLL", val: "NOT ASSESSED",   alert: true },
    ],
  },
];

export default function ProductCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, ...mono }}>// Products</div>
        <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: "#fff", marginBottom: isMobile ? 32 : 48, fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em" }}>Built for compliance, not guesswork.</h2>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>
          {PRODUCTS.map((p, i) => (
            <div key={p.num} style={{
              background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 4, overflow: "hidden",
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
            }}>
              {/* Terminal header */}
              <div style={{ background: "#070707", borderBottom: "1px solid #1a1a1a", padding: "10px 14px 0" }}>
                <div style={{ display: "flex", gap: 5, paddingBottom: 10, borderBottom: "1px solid #111" }}>
                  {["#3a1515","#3a2e00","#0d2a0d"].map((c, j) => (
                    <div key={j} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "#444", padding: "8px 0", ...mono }}>{p.terminalLabel}</div>
                <div style={{ padding: "0 0 14px", fontSize: 10, ...mono }}>
                  {p.terminalRows.map((r) => (
                    <div key={r.key} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                      <span style={{ color: "#555", minWidth: 72 }}>{r.key}</span>
                      <span style={{ color: r.alert ? "#ff6b6b" : r.gold ? "#FFB800" : "#ccc" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.15em", marginBottom: 8, ...mono }}>{p.num}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10, fontFamily: "Inter, sans-serif" }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.8, marginBottom: 16, ...mono }}>{p.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 3, padding: "3px 8px", fontSize: 10, color: "#FFB800", ...mono }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href={`mailto:jeremy@lupaintel.com?subject=${encodeURIComponent(p.demoSubject)}`} style={{ background: "#FFB800", color: "#000", padding: "9px 18px", fontSize: 11, fontWeight: 700, borderRadius: 3, textDecoration: "none", ...mono }}>Request Demo →</a>
                  <a href={p.learnHref} style={{ background: "transparent", color: "#555", border: "1px solid #222", padding: "9px 18px", fontSize: 11, borderRadius: 3, textDecoration: "none", ...mono }}>Learn more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 10, color: "#333", marginTop: 24, ...mono }}>// Additional verticals on roadmap. Reach out if you have a specific use case.</p>
      </div>
    </section>
  );
}
