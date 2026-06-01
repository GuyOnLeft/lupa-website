import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  barWidth: number;
}

const STATS: Stat[] = [
  { value: 250, suffix: "+", label: "Confirmed dual-claim cases", barWidth: 45 },
  { value: 15, suffix: "M+", label: "Parcels analyzed", barWidth: 78 },
  { value: 14, suffix: "", label: "States cross-referenced", barWidth: 28 },
  { value: 100, suffix: "%", label: "Public records — no paid sources", barWidth: 100 },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatBox({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div style={{
      padding: "32px 24px", textAlign: "center",
      borderRight: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a",
      transition: "background 0.2s", cursor: "default",
    }}
      onMouseEnter={e => (e.currentTarget.style.background = "#111")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ fontSize: 44, fontWeight: 700, color: "#FFB800", letterSpacing: "-0.02em", lineHeight: 1, display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2, fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>{count}</span>
        {stat.suffix && <span style={{ fontSize: 28 }}>{stat.suffix}</span>}
      </div>
      <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.5 }}>
        {stat.label}
      </div>
      <div style={{ height: 2, background: "#1a1a1a", marginTop: 18, borderRadius: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#FFB800", borderRadius: 1, width: active ? `${stat.barWidth}%` : "0%", transition: "width 1.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />
      </div>
    </div>
  );
}

export default function StatCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
      {STATS.map((s) => <StatBox key={s.label} stat={s} active={active} />)}
    </div>
  );
}
