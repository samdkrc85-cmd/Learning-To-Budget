import React, { useState, useEffect, useRef } from "react";
import { ALL_QUIZ_ITEMS, QUIZ_COUNT } from "../data/quizItems.js";
import { shuffle, fmtExact } from "../utils/index.js";
import { ProgressBar, Pill, BackBtn } from "./shared/index.jsx";

// Rank tiers shown on the results screen.
const RANKS = [
  {
    minPct: 100,
    mascot: "🦁", title: "Money Lion!",
    bg: "#fef9c3", border: "#fbbf24", titleColor: "#92400e",
    praise: "A perfect score — absolutely incredible! You know the cost of everything. Your parents should be very impressed!",
  },
  {
    minPct: 80,
    mascot: "🦊", title: "Savvy Fox!",
    bg: "#dcfce7", border: "#4ade80", titleColor: "#166534",
    praise: "Really brilliant! You got most of them right and clearly have a great idea of how much things cost in real life.",
  },
  {
    minPct: 60,
    mascot: "🦉", title: "Wise Owl!",
    bg: "#dbeafe", border: "#60a5fa", titleColor: "#1e40af",
    praise: "Good effort — you know more than most people your age! A couple slipped past you but overall that is really impressive.",
  },
  {
    minPct: 40,
    mascot: "🐢", title: "Steady Tortoise!",
    bg: "#ede9fe", border: "#a78bfa", titleColor: "#5b21b6",
    praise: "Not bad at all for a first go! Prices can be really surprising. Have a look at the facts and try again — you will do even better!",
  },
  {
    minPct: 0,
    mascot: "🐣", title: "Hatching Chick!",
    bg: "#fee2e2", border: "#f87171", titleColor: "#991b1b",
    praise: "Prices are trickier than they look, aren't they! Everyone has to start somewhere. Read the facts after each answer and have another go!",
  },
];

function getRank(pct) {
  return RANKS.find((r) => pct >= r.minPct);
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
// Separated so the animated counter can use its own useEffect cleanly.
function ResultsScreen({ score, total, pct, rank, onRestart, onBack }) {
  const [displayed, setDisplayed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (score === 0) return;
    const duration = 1000;
    const steps = 30;
    const increment = score / steps;
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayed(score);
        clearInterval(intervalRef.current);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(intervalRef.current);
  }, [score]);

  return (
    <div className="page" style={{ padding: "32px var(--page-pad)" }}>
      <BackBtn onClick={onBack} />
      <div className="card" style={{ padding: "28px 24px", marginTop: 20, textAlign: "center" }}>
        <div
          style={{
            background: rank.bg,
            border: `2px solid ${rank.border}`,
            borderRadius: "var(--radius-lg)",
            padding: "18px 16px",
            marginBottom: 20,
            display: "inline-block",
            minWidth: 200,
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 8 }}>{rank.mascot}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: rank.titleColor }}>{rank.title}</div>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          {displayed} / {total}
        </h2>
        <div style={{ marginBottom: 16 }}>
          <ProgressBar
            value={displayed}
            max={total}
            color={pct >= 70 ? "var(--green)" : pct >= 40 ? "#d97706" : "var(--red)"}
          />
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          {rank.praise}
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" onClick={onRestart} style={{ background: "var(--purple)" }}>
            Play again
          </button>
          <button className="btn-secondary" onClick={onBack} style={{ flex: 1 }}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PriceQuiz({ onBack }) {
  // Shuffle the full pool, take QUIZ_COUNT, then shuffle each question's options.
  // The initialiser runs only once — not on every render.
  const [questions] = useState(() =>
    shuffle(ALL_QUIZ_ITEMS)
      .slice(0, QUIZ_COUNT)
      .map((q) => ({ ...q, options: shuffle(q.options) }))
  );

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const isCorrect = selected === q.amount;

  function pick(val) {
    if (selected !== null) return;
    setSelected(val);
    if (val === q.amount) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIdx(0);
    setScore(0);
    setDone(false);
    setSelected(null);
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const rank = getRank(pct);
    return <ResultsScreen score={score} total={questions.length} pct={pct} rank={rank} onRestart={restart} onBack={onBack} />;
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  const livePct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const liveMascot = getRank(livePct).mascot;

  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{
            background: "#fee2e2",
            color: "var(--red)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            padding: "6px 14px",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          ✕ Quit
        </button>
        <Pill color="var(--purple-bg)" textColor="var(--purple)">
          {liveMascot} {score} correct
        </Pill>
      </div>

      <ProgressBar value={idx} max={questions.length} color="var(--purple)" />
      <div style={{ textAlign: "right", fontSize: 12, color: "var(--subtle)", fontWeight: 600, marginTop: 5, marginBottom: 20 }}>
        Question {idx + 1} of {questions.length}
      </div>

      <div className="card" style={{ padding: "24px 20px", marginBottom: 14, textAlign: "center" }}>
        <Pill color="var(--purple-bg)" textColor="var(--purple)">{q.category}</Pill>
        <div style={{ fontSize: 50, margin: "16px 0 12px" }}>{q.emoji}</div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>
          {q.question}
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {q.options.map((opt) => {
          let cls = "option-btn";
          if (selected !== null) {
            if (opt === q.amount) cls += " correct";
            else if (opt === selected) cls += " wrong";
            else cls += " faded";
          }
          return (
            <button key={opt} className={cls} onClick={() => pick(opt)}>
              {fmtExact(opt)}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          <div
            style={{
              background: isCorrect ? "var(--green-bg)" : "var(--red-bg)",
              borderRadius: "var(--radius-md)",
              padding: "13px 18px",
              marginBottom: 10,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: isCorrect ? "var(--green)" : "var(--red)" }}>
              {isCorrect ? "✅ Correct!" : `❌ The answer is ${fmtExact(q.amount)}`}
            </span>
          </div>

          <div className="card" style={{ padding: "14px 18px", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              💡 Did you know?
            </div>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, fontWeight: 500 }}>
              {q.context}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={next}
            style={{ background: "var(--text)" }}
          >
            {idx + 1 >= questions.length ? "See results →" : "Next question →"}
          </button>
        </>
      )}
    </div>
  );
}
