import React, { useReducer, useMemo, useCallback } from "react";
import { fmt } from "../utils/index.js";
import { ProgressBar, Pill, BackBtn } from "./shared/index.jsx";
import AmountPicker from "./AmountPicker.jsx";
import ScenarioPicker from "./ScenarioPicker.jsx";
import SurpriseRound from "./SurpriseRound.jsx";

// ─── STATE MACHINE ────────────────────────────────────────────────────────────
// The builder has four distinct phases. Using useReducer with explicit actions
// makes every transition visible and testable, rather than hiding them in
// scattered setState calls.
//
//   idle → build → results → surprise → idle

const INITIAL_STATE = {
  phase: "idle",      // "idle" | "build" | "results" | "surprise"
  scenario: null,
  allocs: {},         // { [category.id]: number }
  page: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_SCENARIO":
      return {
        ...INITIAL_STATE,
        phase: "build",
        scenario: action.scenario,
        allocs: Object.fromEntries(action.scenario.categories.map((c) => [c.id, 0])),
      };
    case "SET_ALLOC":
      return {
        ...state,
        allocs: { ...state.allocs, [action.id]: Math.max(0, action.value) },
      };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "PREV_PAGE":
      return { ...state, page: Math.max(0, state.page - 1) };
    case "GO_RESULTS":
      return { ...state, phase: "results" };
    case "GO_BUILD":
      return { ...state, phase: "build" };
    case "GO_SURPRISE":
      return { ...state, phase: "surprise" };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

// ─── CATEGORY COLOURS ────────────────────────────────────────────────────────
// Stable colour map keyed by category id. Used as a left border on result rows.
const CATEGORY_COLOURS = {
  // Child scenario
  food:           "#f97316",
  uniform:        "#8b5cf6",
  school_dinners: "#06b6d4",
  clubs:          "#10b981",
  trips:          "#f59e0b",
  gifts:          "#ec4899",
  books:          "#6366f1",
  toiletries:     "#14b8a6",
  pocket_money:   "#eab308",
  entertainment:  "#a855f7",
  dentist:        "#ef4444",
  housing_share:  "#64748b",
  // Family scenario
  mortgage:       "#64748b",
  energy:         "#f59e0b",
  council_tax:    "#6366f1",
  car:            "#0ea5e9",
  dog:            "#a16207",
  internet:       "#06b6d4",
  phones:         "#8b5cf6",
  eating_out:     "#f97316",
  savings:        "#10b981",
  holiday:        "#22d3ee",
  // Student / couple shared
  rent:           "#64748b",
  transport:      "#0ea5e9",
  social:         "#a855f7",
  clothes:        "#ec4899",
  subs:           "#6366f1",
  laundry:        "#14b8a6",
  gym:            "#10b981",
  car_ins:        "#0ea5e9",
  hobbies:        "#f97316",
  holidays:       "#22d3ee",
  // Uni student
  halls:          "#64748b",
  printing:       "#6366f1",
  sports:         "#10b981",
  // Single parent
  childcare:      "#ec4899",
  council_tax_sp: "#6366f1",
  household:      "#14b8a6",
};

function getCategoryColour(id) {
  return CATEGORY_COLOURS[id] || "#94a3b8";
}

// ─── PAGE SIZE ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 4;

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BudgetBuilder({ onBack }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { phase, scenario, allocs, page } = state;

  // Paginate categories. Memoised — only recalculates when the scenario changes,
  // not on every allocation tap.
  const pages = useMemo(() => {
    if (!scenario) return [];
    const result = [];
    for (let i = 0; i < scenario.categories.length; i += PAGE_SIZE) {
      result.push(scenario.categories.slice(i, i + PAGE_SIZE));
    }
    return result;
  }, [scenario]);

  const currentCats = pages[page] || [];
  const isLastPage = page >= pages.length - 1;

  const total = useMemo(
    () => Object.values(allocs).reduce((a, b) => a + b, 0),
    [allocs]
  );
  const remaining = scenario ? scenario.income - total : 0;

  // useCallback so the reference is stable across renders and AmountPicker
  // (which is wrapped in React.memo) doesn't re-render unnecessarily.
  const handleAllocChange = useCallback((id, value) => {
    dispatch({ type: "SET_ALLOC", id, value });
  }, []);

  // ── Idle: show scenario picker ─────────────────────────────────────────────
  if (phase === "idle") {
    return (
      <ScenarioPicker
        onBack={onBack}
        onSelect={(s) => dispatch({ type: "START_SCENARIO", scenario: s })}
      />
    );
  }

  // ── Surprise round ─────────────────────────────────────────────────────────
  if (phase === "surprise") {
    return (
      <SurpriseRound
        scenario={scenario}
        budgetRemaining={remaining}
        onDone={() => dispatch({ type: "RESET" })}
        onHome={onBack}
      />
    );
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase === "results") {
    const results = scenario.categories.map((c) => {
      const yours = allocs[c.id] || 0;
      const diff = yours - c.amount;
      const pts = diff === 0 ? 3 : Math.abs(diff) <= 50 ? 1 : 0;
      return { ...c, yours, diff, pts };
    });
    const score = results.reduce((a, r) => a + r.pts, 0);
    const max = scenario.categories.length * 3;
    const pct = score / max;

    return (
      <div className="page">
        <BackBtn onClick={() => dispatch({ type: "GO_BUILD" })} label="← Edit budget" />
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: "16px 0 4px" }}>
          Your budget vs the real one
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>
          See how close your guesses were.
        </p>

        <div className="card" style={{ overflow: "hidden", marginBottom: 16 }}>
          {results.map((r, i) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 18px",
                borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none",
                borderLeft: `4px solid ${getCategoryColour(r.id)}`,
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{r.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>
                  Real: <strong>{fmt(r.amount)}</strong> · You put: {fmt(r.yours)}
                </div>
              </div>
              <span
                className="mono"
                style={{
                  fontSize: 12,
                  color: r.pts === 3 ? "var(--green)" : r.pts === 1 ? "var(--amber)" : "var(--red)",
                  flexShrink: 0,
                }}
              >
                {r.diff === 0 ? "✓ spot on" : r.diff > 0 ? `▲ +£${r.diff}` : `▼ −£${Math.abs(r.diff)}`}
              </span>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "22px 20px", textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 42, marginBottom: 10 }}>
            {pct >= 0.7 ? "🏆" : pct >= 0.4 ? "🥈" : "📚"}
          </div>
          <div className="mono" style={{ fontSize: 26, color: "var(--accent)", marginBottom: 6 }}>
            {score} / {max} points
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>
            {pct >= 0.7
              ? "Brilliant — you really understand the cost of living!"
              : pct >= 0.4
              ? "A good effort — closer than most people!"
              : "Have a look at the real amounts above!"}
          </p>
        </div>

        <div
          style={{
            background: "var(--amber-bg)",
            borderRadius: "var(--radius-md)",
            padding: "14px 18px",
            marginBottom: 16,
            border: "1.5px solid #fcd34d",
          }}
        >
          <p style={{ fontSize: 13, color: "var(--amber)", fontWeight: 700, marginBottom: 4 }}>
            ⚡ Ready for the Surprise Round?
          </p>
          <p style={{ fontSize: 13, color: "var(--amber)", fontWeight: 500, lineHeight: 1.4 }}>
            You had{" "}
            <strong>{remaining >= 0 ? fmt(remaining) : `−${fmt(Math.abs(remaining))}`}</strong>{" "}
            left over. Now an unexpected bill is about to arrive — can your budget handle it?
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn-primary"
            onClick={() => dispatch({ type: "GO_SURPRISE" })}
            style={{ flex: 2, background: "#d97706" }}
          >
            ⚡ Surprise Round →
          </button>
          <button
            className="btn-secondary"
            onClick={() => dispatch({ type: "RESET" })}
            style={{ flex: 1 }}
          >
            Switch
          </button>
        </div>
      </div>
    );
  }

  // ── Build phase ────────────────────────────────────────────────────────────
  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button
          onClick={() => dispatch({ type: "RESET" })}
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
        <Pill color="var(--accent-bg)" textColor="var(--accent)">
          Page {page + 1} of {pages.length}
        </Pill>
      </div>

      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>{scenario.title}</h2>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
          Split their {fmt(scenario.income)} monthly income across all their costs.
        </p>
      </div>

      {/* Income / remaining banner */}
      <div
        className="card"
        style={{
          padding: "13px 17px",
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Monthly income</div>
          <div className="mono" style={{ fontSize: 20 }}>{fmt(scenario.income)}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Left to spend</div>
          <div
            className="mono"
            style={{ fontSize: 20, color: remaining < 0 ? "var(--red)" : "var(--green)" }}
          >
            {remaining < 0 ? `−${fmt(Math.abs(remaining))}` : fmt(remaining)}
          </div>
        </div>
      </div>

      <ProgressBar value={total} max={scenario.income} color={remaining < 0 ? "var(--red)" : "var(--accent)"} />

      {/* Category cards */}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {currentCats.map((c) => (
          <div key={c.id} className="card" style={{ padding: "15px 17px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1, maxWidth: 200, lineHeight: 1.35 }}>
                    {c.tip}
                  </div>
                </div>
              </div>
              <Pill
                color={c.type === "saving" ? "var(--blue-bg)" : c.type === "fixed" ? "var(--purple-bg)" : "var(--amber-bg)"}
                textColor={c.type === "saving" ? "var(--blue)" : c.type === "fixed" ? "var(--purple)" : "var(--amber)"}
              >
                {c.type === "saving" ? "saving" : c.type === "fixed" ? "fixed" : "varies"}
              </Pill>
            </div>
            <AmountPicker
              value={allocs[c.id] || 0}
              onChange={(v) => handleAllocChange(c.id, v)}
            />
          </div>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={() =>
          isLastPage
            ? dispatch({ type: "GO_RESULTS" })
            : dispatch({ type: "NEXT_PAGE" })
        }
      >
        {isLastPage ? "See results →" : "Next →"}
      </button>
    </div>
  );
}
