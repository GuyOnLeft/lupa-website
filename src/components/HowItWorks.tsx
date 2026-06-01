import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const mono = { fontFamily: "'IBM Plex Mono', monospace" } as const;

const STEPS = [
  {
    num: "01", title: "Ingest",
    desc: "Pull public parcel records across jurisdictions — county assessors, state cadastral databases, business registries. No paid data sources required.",
    viz: (
      <div>
        <div style={{ color: "#FFB800", marginBottom: 3 }}>County Assessors</div>
        <div style={{ color: "#555", marginBottom: 3 }}>State Cadastral</div>
        <div style={{ color: "#555", marginBottom: 3 }}>Business Registries</div>
        <div style={{ color: "#2a2a2a" }}>Permit History · Tax Rolls</div>
      </div>
    ),
  },
  {
    num: "02", title: "Cross-reference",
    desc: "Identify discrepancies between public signals and assessment records across jurisdictions, permit history, and tax rolls.",
    viz: (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#FFB800" }}>RECORD A · FL</span>
          <span style={{ color: "#ff6b6b" }}>≠</span>
          <span style={{ color: "#FFB800" }}>RECORD B · NY</span>
        </div>
        <div style={{ color: "#555", marginBottom: 2 }}>OWNER ████████ · EXEMPT</div>
        <div style={{ color: "#555" }}>OWNER ████████ · EXEMPT</div>
      </div>
    ),
  },
  {
    num: "03", title: "Deliver",
    desc: "Ranked investigative leads with source citations and verification links — ready for your audit team, independently verifiable.",
    viz: (
      <div>
        <div style={{ marginBottom: 3 }}><span style={{ color: "#FFB800" }}>01</span><span style={{ color: "#ccc" }}> · Parcel #12-44-24 · </span><span style={{ color: "#ff6b6b" }}>DUAL CLAIM</span></div>
        <div style={{ marginBottom: 3 }}><span style={{ color: "#FFB800" }}>02</span><span style={{ color: "#ccc" }}> · Parcel #08-31-17 · </span><span style={{ color: "#ff6b6b" }}>DUAL CLAIM</span></div>
        <div style={{ color: "#2a2a2a" }}>03 · Parcel #22-19-05 · ...</div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, ...mono }}>// How It Works</div>
        <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: "#fff", marginBottom: isMobile ? 32 : 48, fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em" }}>From public record to ranked lead.</h2>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 48px 1fr 48px 1fr", gap: isMobile ? 16 : 0 }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 4, padding: isMobile ? 20 : 24, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s` }}>
                <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.15em", marginBottom: 10, ...mono }}>{step.num} —</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{step.title}</div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 16, ...mono }}>{step.desc}</div>
                <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 3, padding: "12px 14px", fontSize: 10, ...mono }}>{step.viz}</div>
              </div>
              {i < 2 && !isMobile && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
                  <span style={{ color: "#FFB800", fontSize: 20, opacity: visible ? 0.5 : 0, transition: `opacity 0.4s ease ${i * 0.15 + 0.35}s` }}>→</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
