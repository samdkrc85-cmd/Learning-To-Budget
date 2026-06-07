import React, { useState } from "react";
import "../styles/global.css";   // imported once here — never injected per-render

import ErrorBoundary from "./ErrorBoundary.jsx";
import Home from "./Home.jsx";
import PriceQuiz from "./PriceQuiz.jsx";
import BudgetBuilder from "./BudgetBuilder.jsx";

/**
 * App
 * Top-level router. Keeps a single `screen` state and renders the
 * matching component. All navigation callbacks are defined here so
 * child components only need an `onBack` or `onNav` prop — they never
 * import from each other.
 */
export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <ErrorBoundary>
      {screen === "home"   && <Home onNav={setScreen} />}
      {screen === "quiz"   && <PriceQuiz onBack={() => setScreen("home")} />}
      {screen === "budget" && <BudgetBuilder onBack={() => setScreen("home")} />}
    </ErrorBoundary>
  );
}
