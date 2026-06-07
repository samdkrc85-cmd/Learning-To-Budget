# Learn to Budget

A React app for children aged 8–12 to learn about money. UK English throughout.

---

## Project structure

```
src/
  data/
    scenarios.js      — all 4 household scenarios (categories + surprises)
    quizItems.js      — pool of 35 quiz questions (10 picked at random per game)
  components/
    App.jsx           — root router; imports global CSS once
    Home.jsx          — home screen
    PriceQuiz.jsx     — price quiz mode
    BudgetBuilder.jsx — budget builder with useReducer state machine
    ScenarioPicker.jsx — household selection screen
    SurpriseRound.jsx — post-budget surprise bill screen
    AmountPicker.jsx  — tap-friendly +/- input, wrapped in React.memo
    ErrorBoundary.jsx — catches render errors, shows fallback UI
    shared/
      index.jsx       — ProgressBar, Pill, BackBtn
  utils/
    index.js          — shuffle (Fisher-Yates), fmt, fmtExact, makeSurpriseOptions
  styles/
    global.css        — design tokens (CSS variables), resets, shared classes
```

---

## Getting started

```bash
npm create vite@latest learn-to-budget -- --template react
cd learn-to-budget
# Replace the src/ folder with the contents of this project
npm install
npm run dev
```

---

## Key design decisions

**Stable category IDs**
Each category has a unique `id` field (e.g. `"food"`, `"mortgage"`). The
allocations object in BudgetBuilder uses `id` as its key, not the display
`name`. This means you can rename a category without silently breaking saved
state.

**State machine in BudgetBuilder**
The builder's four phases (`idle → build → results → surprise`) are managed
with `useReducer`. Every transition is an explicit named action, making it
easy to trace the flow and add new phases without hunting through `setState`
calls.

**Fisher-Yates shuffle**
`shuffle()` in utils uses the Fisher-Yates algorithm, which gives a
statistically uniform result. The common `sort(() => Math.random() - 0.5)`
pattern is biased depending on the JS engine's sort implementation.

**React.memo on AmountPicker**
Each category card contains an `AmountPicker`. Without `memo`, tapping +10
on one category would re-render all four visible pickers. With `memo`, only
the one whose `value` changed re-renders.

**Global CSS imported once**
`global.css` is imported in `App.jsx` and processed by Vite's CSS pipeline.
The previous approach injected a `<style>` tag as a JSX child, which
re-evaluated it on every state change.

---

## Adding content

**New quiz question** — add an object to `ALL_QUIZ_ITEMS` in `src/data/quizItems.js`.
Give it a unique `id`. It will automatically enter the random pool.

**New scenario** — add an object to `SCENARIOS` in `src/data/scenarios.js`.
Ensure every category has a unique `id` within that scenario, and include
a `surprises` array with at least one item.
