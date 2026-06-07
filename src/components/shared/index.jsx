import React from "react";

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max, color = "var(--accent)", label = "Progress" }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      style={{ background: "#e4e7ec", borderRadius: 99, height: 6, overflow: "hidden" }}
    >
      <div
        style={{
          width: pct + "%",
          height: "100%",
          background: color,
          borderRadius: 99,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

// ─── PILL ─────────────────────────────────────────────────────────────────────
export function Pill({ children, color = "#f0f2f5", textColor = "#374151" }) {
  return (
    <span
      style={{
        background: color,
        color: textColor,
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

// ─── BACK BUTTON ─────────────────────────────────────────────────────────────
export function BackBtn({ onClick, label = "← Back" }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        color: "var(--muted)",
        fontSize: 14,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "13px 0",
      }}
    >
      {label}
    </button>
  );
}
