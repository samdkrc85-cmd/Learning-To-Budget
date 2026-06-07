import React, { useState, useMemo } from "react";
import { fmt, makeSurpriseOptions } from "../utils/index.js";

export default function SurpriseRound({ scenario, budgetRemaining, onDone, onHome }) {
  // Pick one random surprise at mount time, never again.
  const [surprise] = useState(() => {
    const idx = Math.floor(Math.random() * scenario.surprises.length);
    return scenario.surprises[idx];
  });

  // Generate options once, keyed to the surprise item.
  const options = useMemo(() => makeSurpriseOptions(surprise.amount), [surprise]);

  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const isCorrect = selected === surprise.amount;
  const potAfter = budgetRemaining - surprise.amount;
  const survived = potAfter >= 0;

  function pick(val) {
    if (selected !== null) return;
    setSelected(val);
  }

  // ── Finished screen ─────────────────────────────────────────────────────────
  if (finished) {
    return (
      <div className="page">
        <div
          style={{
            background: survived ? "var(--green-bg)" : "var(--red-bg)",
            borderRadius: "var(--radius-lg)",
            padding: 20,
            marginBottom: 20,
            textAlign: "center",
            border: `1.5px solid ${survived ? "var(--green)" : "var(--red)"}`,
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 10 }}>{survived ? "😮‍💨" : "😬"}</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: survived ? "var(--green)" : "var(--red)", marginBottom: 6 }}>
            {survived ? "You covered it!" : "You ran out of money!"}
          </h2>
          <p style={{ fontSize: 14, color: survived ? "var(--green)" : "var(--red)", fontWeight: 500 }}>
            {survived
              ? `You had ${fmt(potAfter)} left after the surprise bill.`
              : `You ended up ${fmt(Math.abs(potAfter))} short.`}
          </p>
        </div>

        {/* Breakdown */}
        <div className="card" style={{ overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "13px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Money left after budget</span>
            <span
              className="mono"
              style={{ fontSize: 14, color: budgetRemaining >= 0 ? "var(--green)" : "var(--red)" }}
            >
              {budgetRemaining < 0 ? `−${fmt(Math.abs(budgetRemaining))}` : fmt(budgetRemaining)}
            </span>
          </div>
          <div style={{ padding: "13px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{surprise.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{surprise.name}</span>
              </div>
              <span className="mono" style={{ fontSize: 13, color: "var(--red)" }}>
                −{fmt(surprise.amount)}
              </span>
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: potAfter < 0 ? "var(--red)" : "var(--muted)", fontWeight: 500 }}>
              Remaining: {potAfter < 0 ? `−${fmt(Math.abs(potAfter))}` : fmt(potAfter)}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "var(--amber-bg)",
            borderRadius: "var(--radius-md)",
            padding: "14px 18px",
            marginBottom: 20,
            border: "1.5px solid #fcd34d",
          }}
        >
          <p style={{ fontSize: 13, color: "var(--amber)", fontWeight: 600, lineHeight: 1.5 }}>
            💡 This is why saving every month really matters — unexpected bills can arrive at any time, and you need money set aside to cover them.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" onClick={onDone} style={{ flex: 1 }}>Try another</button>
          <button className="btn-secondary" onClick={onHome} style={{ flex: 1 }}>Home</button>
        </div>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ background: "var(--amber-bg)", borderRadius: "var(--radius-sm)", padding: "6px 14px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--amber)" }}>⚡ SURPRISE ROUND</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>Money left</div>
          <div className="mono" style={{ fontSize: 16, color: budgetRemaining < 0 ? "var(--red)" : "var(--green)" }}>
            {budgetRemaining < 0 ? `−${fmt(Math.abs(budgetRemaining))}` : fmt(budgetRemaining)}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "22px 20px", marginBottom: 14 }}>
        <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, marginBottom: 16, lineHeight: 1.5 }}>
          Oh no — something unexpected has happened! Have a guess before finding out the answer.
        </p>
        <div style={{ fontSize: 44, marginBottom: 12 }}>{surprise.emoji}</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{surprise.name}</h2>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{surprise.description}</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginTop: 16 }}>
          How much do you think it costs?
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {options.map((opt) => {
          let cls = "option-btn";
          if (selected !== null) {
            if (opt === surprise.amount) cls += " correct";
            else if (opt === selected) cls += " wrong";
            else cls += " faded";
          }
          return (
            <button key={opt} className={cls} onClick={() => pick(opt)}>
              {fmt(opt)}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          style={{
            background: isCorrect ? "var(--green-bg)" : "var(--red-bg)",
            borderRadius: "var(--radius-md)",
            padding: "13px 18px",
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: isCorrect ? "var(--green)" : "var(--red)", marginBottom: 10 }}>
            {isCorrect ? "✅ Correct!" : `❌ It costs ${fmt(surprise.amount)}`}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, lineHeight: 1.5 }}>
            This comes off your remaining money. You had <strong>{fmt(budgetRemaining)}</strong>.
            After this bill you will have{" "}
            <strong style={{ color: potAfter < 0 ? "var(--red)" : "inherit" }}>
              {potAfter < 0 ? `−${fmt(Math.abs(potAfter))}` : fmt(potAfter)}
            </strong>.
          </div>
          <button
            className="btn-primary"
            onClick={() => setFinished(true)}
            style={{ background: "var(--text)" }}
          >
            See how you got on →
          </button>
        </div>
      )}
    </div>
  );
}
