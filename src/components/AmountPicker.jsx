import React, { memo } from "react";
import { fmt } from "../utils/index.js";

/**
 * AmountPicker
 * Tap-friendly +10/+50 and -10/-50 buttons for entering budget amounts.
 * Wrapped in React.memo so it only re-renders when its own value changes,
 * not when any sibling allocation changes.
 */
const AmountPicker = memo(function AmountPicker({ value, onChange }) {
  function adj(delta) {
    onChange(Math.max(0, value + delta));
  }

  const btnBase = {
    height: 44,
    padding: "0 12px",
    borderRadius: "var(--radius-sm)",
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button
        onClick={() => adj(-50)}
        style={{ ...btnBase, background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--muted)" }}
      >
        −50
      </button>
      <button
        onClick={() => adj(-10)}
        style={{ ...btnBase, background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--muted)" }}
      >
        −10
      </button>

      <div
        style={{
          flex: 1,
          background: "var(--bg)",
          borderRadius: "var(--radius-sm)",
          border: "1.5px solid var(--border)",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="mono"
          style={{ fontSize: 17, color: value > 0 ? "var(--text)" : "var(--subtle)" }}
        >
          {value > 0 ? fmt(value) : "£0"}
        </span>
      </div>

      <button
        onClick={() => adj(10)}
        style={{ ...btnBase, background: "var(--accent)", color: "white" }}
      >
        +10
      </button>
      <button
        onClick={() => adj(50)}
        style={{ ...btnBase, background: "var(--accent)", color: "white" }}
      >
        +50
      </button>
    </div>
  );
});

export default AmountPicker;
