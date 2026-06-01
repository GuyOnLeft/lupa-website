import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const mono = { fontFamily: "'IBM Plex Mono', monospace" } as const;

type Coverage = "full" | "county" | "none";

const STATES: { abbr: string; name: string; coverage: Coverage }[] = [
  { abbr: "FL", name: "Florida", coverage: "full" },
  { abbr: "NY", name: "New York", coverage: "full" },
  { abbr: "MD", name: "Maryland", coverage: "full" },
  { abbr: "NJ", name: "New Jersey", coverage: "full" },
  { abbr: "IN", name: "Indiana", coverage: "full" },
  { abbr: "WI", name: "Wisconsin", coverage: "full" },
  { abbr: "MA", name: "Massachusetts", coverage: "full" },
  { abbr: "OH", name: "Ohio", coverage: "county" },
  { abbr: "MI", name: "Michigan", coverage: "county" },
  { abbr: "CA", name: "California", coverage: "county" },
  { abbr: "IL", name: "Illinois", coverage: "county" },
  { abbr: "MN", name: "Minnesota", coverage: "county" },
  { abbr: "VA", name: "Virginia", coverage: "county" },
  { abbr: "WA", name: "Washington", coverage: "county" },
  { abbr: "AZ", name: "Arizona", coverage: "county" },
  { abbr: "TX", name: "Texas", coverage: "none" },
  { abbr: "PA", name: "Pennsylvania", coverage: "none" },
  { abbr: "OR", name: "Oregon", coverage: "none" },
  { abbr: "NV", name: "Nevada", coverage: "none" },
  { abbr: "NM", name: "New Mexico", coverage: "none" },
  { abbr: "CO", name: "Colorado", coverage: "none" },
  { abbr: "UT", name: "Utah", coverage: "none" },
  { abbr: "ID", name: "Idaho", coverage: "none" },
  { abbr: "MT", name: "Montana", coverage: "none" },
  { abbr: "WY", name: "Wyoming", coverage: "none" },
  { abbr: "ND", name: "North Dakota", coverage: "none" },
  { abbr: "SD", name: "South Dakota", coverage: "none" },
  { abbr: "NE", name: "Nebraska", coverage: "none" },
  { abbr: "KS", name: "Kansas", coverage: "none" },
  { abbr: "IA", name: "Iowa", coverage: "none" },
  { abbr: "MO", name: "Missouri", coverage: "none" },
  { abbr: "AR", name: "Arkansas", coverage: "none" },
  { abbr: "LA", name: "Louisiana", coverage: "none" },
  { abbr: "MS", name: "Mississippi", coverage: "none" },
  { abbr: "AL", name: "Alabama", coverage: "none" },
  { abbr: "GA", name: "Georgia", coverage: "none" },
  { abbr: "SC", name: "South Carolina", coverage: "none" },
  { abbr: "NC", name: "North Carolina", coverage: "none" },
  { abbr: "WV", name: "West Virginia", coverage: "none" },
  { abbr: "KY", name: "Kentucky", coverage: "none" },
  { abbr: "TN", name: "Tennessee", coverage: "none" },
  { abbr: "CT", name: "Connecticut", coverage: "none" },
  { abbr: "RI", name: "Rhode Island", coverage: "none" },
  { abbr: "VT", name: "Vermont", coverage: "none" },
  { abbr: "NH", name: "New Hampshire", coverage: "none" },
  { abbr: "ME", name: "Maine", coverage: "none" },
  { abbr: "DE", name: "Delaware", coverage: "none" },
  { abbr: "AK", name: "Alaska", coverage: "none" },
  { abbr: "HI", name: "Hawaii", coverage: "none" },
  { abbr: "DC", name: "Washington DC", coverage: "none" },
];

const COLOR: Record<Coverage, { bg: string; text: string; border: string }> = {
  full:   { bg: "#FFB800", text: "#000", border: "#FFB800" },
  county: { bg: "#3d2e00", text: "#FFB800", border: "#4a3800" },
  none:   { bg: "#161616", text: "#333", border: "#1a1a1a" },
};

const LABEL: Record<Coverage, string> = {
  full: "Statewide roll",
  county: "County coverage",
  none: "Coming soon",
};

export default function CoverageMap() {
  const [hovered, setHovered] = useState<(typeof STATES)[0] | null>(null);
  const isMobile = useIsMobile();

  return (
    <section style={{ padding: isMobile ? "56px 0" : "80px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px" }}>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, ...mono }}>// Coverage</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 260px", gap: isMobile ? 24 : 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: "#fff", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Active in 15 states. Expanding quarterly.</h2>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.7, marginBottom: 28, ...mono }}>Seven states with full statewide rolls. Active county adapters in eight more. Cross-state JOIN refreshes monthly.</p>

            {/* State grid */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {STATES.map((s) => {
                const c = COLOR[s.coverage];
                const isHov = hovered?.abbr === s.abbr;
                return (
                  <div
                    key={s.abbr}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: isMobile ? 32 : 38, height: isMobile ? 28 : 32, background: c.bg, color: c.text,
                      border: `1px solid ${isHov ? "#FFB800" : c.border}`,
                      borderRadius: 3, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 9, fontWeight: 600,
                      cursor: "default", transition: "all 0.12s",
                      transform: isHov ? "scale(1.15)" : "scale(1)",
                      zIndex: isHov ? 10 : 1, position: "relative",
                      ...mono,
                    }}
                  >
                    {s.abbr}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              {(["full", "county", "none"] as Coverage[]).map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#555", ...mono }}>
                  <div style={{ width: 10, height: 10, background: COLOR[c].bg, border: `1px solid ${COLOR[c].border}`, borderRadius: 2 }} />
                  {LABEL[c]}
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {hovered && (
              <div style={{ marginTop: 16, padding: "10px 14px", background: "#111", border: "1px solid #1e1e1e", borderRadius: 3, fontSize: 11, ...mono }}>
                <span style={{ color: "#FFB800" }}>{hovered.name}</span>
                <span style={{ color: "#444", margin: "0 8px" }}>·</span>
                <span style={{ color: hovered.coverage === "full" ? "#FFB800" : hovered.coverage === "county" ? "#a07800" : "#333" }}>
                  {LABEL[hovered.coverage]}
                </span>
              </div>
            )}
          </div>

          {/* Stats sidebar */}
          <div style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : undefined, flexDirection: "column", gap: 12 }}>
            {[
              { n: "15", l: "States covered" },
              { n: "39", l: "Production adapters" },
              { n: "30M+", l: "Parcels in coverage" },
            ].map(({ n, l }) => (
              <div key={l} style={{ border: "1px solid #1a1a1a", borderRadius: 4, padding: isMobile ? "14px 12px" : "20px 20px 16px", background: "#0d0d0d" }}>
                <div style={{ fontSize: isMobile ? 22 : 32, fontWeight: 700, color: "#FFB800", ...mono }}>{n}</div>
                <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, ...mono }}>{l}</div>
              </div>
            ))}
            <a href="/homestead-exemption-audit/#coverage-h" style={{ fontSize: 11, color: "#FFB800", textDecoration: "none", padding: "12px 0", ...mono }}>
              See full coverage breakdown →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
