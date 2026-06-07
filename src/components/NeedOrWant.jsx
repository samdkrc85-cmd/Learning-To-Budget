import React, { useState, useEffect, useRef } from "react";
import { ALL_NOW_ITEMS, GAME_COUNT } from "../data/needOrWantItems.js";
import { shuffle } from "../utils/index.js";
import { ProgressBar, Pill, BackBtn } from "./shared/index.jsx";

const TIMER_SECONDS = 5;

const RANKS = [
  { minPct: 100, mascot: "🦁", title: "Money Lion!",       bg: "#fef9c3", border: "#fbbf24", titleColor: "#92400e",
    praise: "Perfect — you know exactly what you need and what you just want. Incredible!" },
  { minPct: 80,  mascot: "🦊", title: "Savvy Fox!",        bg: "#dcfce7", border: "#4ade80", titleColor: "#166534",
    praise: "Really well done! You got nearly all of them right — you clearly think carefully about money." },
  { minPct: 60,  mascot: "🦉", title: "Wise Owl!",         bg: "#dbeafe", border: "#60a5fa", titleColor: "#1e40af",
    praise: "Good effort! The tricky ones are genuinely hard — keep practising and you will ace it!" },
  { minPct: 40,  mascot: "🐢", title: "Steady Tortoise!",  bg: "#ede9fe", border: "#a78bfa", titleColor: "#5b21b6",
    praise: "Not bad for a first go! Read the explanations and try again — they really help." },
  { minPct: 0,   mascot: "🐣", title: "Hatching Chick!",   bg: "#fee2e2", border: "#f87171", titleColor: "#991b1b",
    praise: "Everyone starts somewhere! Read the clues after each answer and have another go." },
];

function getRank(pct) {
  return RANKS.find((r) => pct >= r.minPct);
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
function ResultsScreen({ score, total, onRestart, onBack }) {
  const [displayed, setDisplayed] = useState(0);
  const intervalRef = useRef(null);
  const pct = Math.round((score / total) * 100);
  const rank = getRank(pct);

  useEffect(() => {
    if (score === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(score);
      return;
    }
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
    }, 1000 / steps);
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
          <button className="btn-primary" onClick={onRestart} style={{ background: "#9333ea" }}>
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function NeedOrWant({ onBack }) {
  const [items] = useState(() => shuffle(ALL_NOW_ITEMS).slice(0, GAME_COUNT));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);   // "need" | "want" | "timeout"
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef(null);

  const item = items[idx];
  const isCorrect = picked === item?.answer;
  const livePct = items.length > 0 ? Math.round((score / items.length) * 100) : 0;
  const liveMascot = getRank(livePct).mascot;

  // Start / reset countdown whenever we move to a new card
  useEffect(() => {
    if (done || picked !== null) return;
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPicked("timeout");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, done]);

  // Stop the timer when an answer is picked; player taps Next to continue
  useEffect(() => {
    if (picked === null) return;
    clearInterval(timerRef.current);
  }, [picked]);

  function advance() {
    if (idx + 1 >= items.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  }

  function handlePick(choice) {
    if (picked !== null) return;
    clearInterval(timerRef.current);
    setPicked(choice);
    if (choice === item.answer) setScore((s) => s + 1);
  }

  function restart() {
    setIdx(0);
    setScore(0);
    setDone(false);
    setPicked(null);
  }

  if (done) {
    return <ResultsScreen score={score} total={items.length} onRestart={restart} onBack={onBack} />;
  }

  const answered = picked !== null;
  const timedOut = picked === "timeout";

  // Timer colour: green → amber → red as time runs out
  const timerColor = timeLeft >= 4 ? "var(--green)" : timeLeft >= 2 ? "#d97706" : "var(--red)";

  return (
    <div className="page">
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{
            background: "#fee2e2",
            color: "var(--red)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            padding: "10px 14px",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          ✕ Quit
        </button>
        <Pill color="#f3e8ff" textColor="#9333ea">
          {liveMascot} {score} correct
        </Pill>
      </div>

      <ProgressBar value={idx} max={items.length} color="#9333ea" />
      <div style={{ textAlign: "right", fontSize: 13, color: "var(--muted)", fontWeight: 600, marginTop: 5, marginBottom: 20 }}>
        Card {idx + 1} of {items.length}
      </div>

      {/* Item card */}
      <div
        className="card"
        style={{
          padding: "28px 20px 24px",
          marginBottom: 16,
          textAlign: "center",
          border: answered
            ? `2px solid ${isCorrect ? "var(--green)" : "var(--red)"}`
            : "1.5px solid var(--border)",
          transition: "border-color 0.2s",
        }}
      >
        {/* Tricky badge — shown before answer only */}
        {item.tricky && !answered && (
          <div style={{ marginBottom: 10 }}>
            <Pill color="#fef9c3" textColor="#92400e">🤔 Tricky one!</Pill>
          </div>
        )}

        <div style={{ fontSize: 64, marginBottom: 14, lineHeight: 1 }}>{item.emoji}</div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", lineHeight: 1.35, marginBottom: 20 }}>
          {item.question}
        </h2>

        {/* Timer ring — hidden once answered */}
        {!answered && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
            <div
              aria-live="polite"
              aria-label={`${timeLeft} seconds remaining`}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `3px solid ${timerColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
                color: timerColor,
                transition: "border-color 0.3s, color 0.3s",
              }}
            >
              {timeLeft}
            </div>
            <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>seconds left</span>
          </div>
        )}

        {/* Feedback after answer */}
        {answered && (
          <div
            style={{
              background: timedOut ? "var(--amber-bg)" : isCorrect ? "var(--green-bg)" : "var(--red-bg)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              marginBottom: 0,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: timedOut ? "var(--amber)" : isCorrect ? "var(--green)" : "var(--red)", marginBottom: 6 }}>
              {timedOut ? "⏰ Too slow!" : isCorrect ? "✅ Correct!" : `❌ It's a ${item.answer}!`}
            </div>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.55, fontWeight: 500, marginBottom: 12 }}>
              {item.explanation}
            </p>
            <button
              onClick={advance}
              style={{
                width: "100%",
                background: isCorrect ? "var(--green)" : timedOut ? "var(--amber)" : "var(--red)",
                color: "white",
                borderRadius: "var(--radius-sm)",
                padding: "14px 0",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {idx + 1 >= items.length ? "See results →" : "Next →"}
            </button>
          </div>
        )}
      </div>

      {/* Need / Want buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <button
          onClick={() => handlePick("need")}
          disabled={answered}
          style={{
            background: answered && item.answer === "need" ? "var(--green-bg)" : answered ? "var(--bg)" : "#dcfce7",
            border: `2px solid ${answered && item.answer === "need" ? "var(--green)" : answered ? "var(--border)" : "#4ade80"}`,
            borderRadius: "var(--radius-md)",
            padding: "18px 8px",
            fontWeight: 800,
            fontSize: 16,
            color: answered && item.answer === "need" ? "var(--green)" : answered ? "var(--subtle)" : "#15803d",
            transition: "all 0.15s",
            cursor: answered ? "default" : "pointer",
          }}
        >
          ✅ Need
        </button>
        <button
          onClick={() => handlePick("want")}
          disabled={answered}
          style={{
            background: answered && item.answer === "want" ? "var(--red-bg)" : answered ? "var(--bg)" : "#fee2e2",
            border: `2px solid ${answered && item.answer === "want" ? "var(--red)" : answered ? "var(--border)" : "#f87171"}`,
            borderRadius: "var(--radius-md)",
            padding: "18px 8px",
            fontWeight: 800,
            fontSize: 16,
            color: answered && item.answer === "want" ? "var(--red)" : answered ? "var(--subtle)" : "#991b1b",
            transition: "all 0.15s",
            cursor: answered ? "default" : "pointer",
          }}
        >
          ❌ Want
        </button>
      </div>
    </div>
  );
}
