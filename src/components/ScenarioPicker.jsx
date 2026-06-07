import React from "react";
import { SCENARIOS } from "../data/scenarios.js";
import { fmt } from "../utils/index.js";
import { BackBtn, Pill } from "./shared/index.jsx";

export default function ScenarioPicker({ onSelect, onBack }) {
  return (
    <div className="page">
      <BackBtn onClick={onBack} />
      <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 16, marginBottom: 4 }}>
        Choose a household
      </h2>
      <p style={{ color: "var(--muted)", fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
        You'll try to split their monthly income across everything they need to pay for.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            style={{
              background: s.isHighlighted ? "#fef9c3" : "var(--card)",
              border: s.isHighlighted ? "2px solid #fbbf24" : "1.5px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              textAlign: "left",
              boxShadow: "0 1px 3px rgba(0,0,0,.05)",
            }}
          >
            <div style={{ fontSize: 34, flexShrink: 0, marginTop: 2 }}>{s.emoji}</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{s.title}</div>
                {s.isHighlighted && (
                  <Pill color="#fbbf24" textColor="#78350f">That's you!</Pill>
                )}
              </div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2, lineHeight: 1.4 }}>
                {s.subtitle}
              </div>
              <div style={{ marginTop: 8 }}>
                <Pill
                  color={s.isHighlighted ? "#fde68a" : "var(--accent-bg)"}
                  textColor={s.isHighlighted ? "#92400e" : "var(--accent)"}
                >
                  {s.incomeLabel}
                </Pill>
              </div>
            </div>
            <div style={{ marginLeft: "auto", color: "var(--subtle)", fontSize: 20, flexShrink: 0 }}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}
