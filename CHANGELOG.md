# Changelog

All notable changes to Learning To Budget are recorded here.

---

## 2026-06-07 — Major update
**Tag:** *(latest on master)*

### Budget Builder
- Rebuilt as a paginated one-card-at-a-time experience with +/− amount pickers
- Removed Aiden at University scenario (too similar to Chloe the Student)
- Renamed Priya & Son to Sarah & Noah throughout
- Fixed `makeSurpriseOptions` generating duplicate distractors for small amounts
- Added ✕ Quit button (consistent with other activities); removed redundant Back button
- Added "How to play" intro screen explaining scoring and the Surprise Round
- Added ▲/▼ shape indicators to results diff column for colour-blind users

### Need or Want?
- Added Need or Want? activity — 10 cards, 5-second timer, 30-item pool
- All answers now require a manual "Next →" tap so explanations can be read
- Added ✕ Quit button so the activity can be exited mid-game

### Price Quiz
- Added ✕ Quit button for consistency with other activities

### Home screen
- Replaced emoji logo with a custom front-facing piggy bank SVG
- Added rotating money fact banner (15 UK-specific facts)

### 6 UI improvements (landed with v1)
- Live rank mascot updates in real time during Price Quiz and Need or Want?
- Animated score counter on all results screens
- Colour-coded category rows in Budget Builder results
- "Did you know?" context facts shown after each Price Quiz answer
- Rank mascot and praise message on Need or Want? results screen
- Consistent card/pill design system across all activities

### Accessibility
- Added `:focus-visible` keyboard focus ring (previously `outline: none` removed all focus)
- Fixed low-contrast `--subtle` text (2.2:1 → 4.1:1) across all screens
- Increased Quit/Back/Next button touch targets to 44 px minimum
- Added `aria-hidden` to decorative SVG, ARIA roles to ProgressBar, live region to countdown timer
- Respected `prefers-reduced-motion` on animated score counters

### Content
- Updated 11 quiz prices to 2024–2025 UK figures (bread, eggs, Netflix, Spotify, and others)
- Corrected 5 Home screen money facts (stamp price, education spend, food spend, train fare, games console)
- Fixed birthday present Need or Want? answer from "need" to "want"
- Clarified school trip question wording; updated Sarah & Noah subtitle to mention benefits
- Replaced legally inaccurate boiler-repair surprise in James & Emma with a rent increase

---

## v1-budget-builder
**Tag:** `v1-budget-builder`

Snapshot of the app before the Budget Builder redesign. Safe to restore with:
```
git checkout v1-budget-builder && npm run deploy && git checkout master
```

### Activities
- **Price Quiz** — 10 random questions from a pool of 60 UK-specific items. Guess the price from 4 options.
- **Budget Builder** — Allocate a household's monthly income across categories using +/− buttons, then see how close you were. Includes a Surprise Round of unexpected bills.
- **Need or Want?** — 10 cards with a 5-second timer. Tap Need or Want before time runs out. Wrong answers pause for reading.

### Budget Builder scenarios
- 🧒 The Cost of YOU — £800/month (costs of raising a child)
- 👨‍👩‍👦 The Taylor Family — £4,800/month
- 🎓 Chloe the Student — £1,200/month
- 💑 James & Emma — £4,200/month
- 👩‍👦 Sarah & Noah — £1,800/month (single parent)

### UI improvements (included in this version)
- Rotating money fact banner on the Home screen (15 UK facts)
- Live rank mascot (🦁→🐣) updates during the Price Quiz as score builds
- Animated score counter on quiz results screen
- Colour-coded category rows in Budget Builder results
- Need or Want: wrong answers require a tap to advance; correct answers auto-advance

---

## Earlier changes

### 26 new Price Quiz questions added
Expanded the question pool from 34 to 60. New categories include swimming, ice cream van, school dinner, museum (free!), football kit, LEGO, electricity bills, and more.

### GitHub Pages deployment set up
Configured Vite base path and `gh-pages` package. App published at:
https://samdkrc85-cmd.github.io/Learning-To-Budget/

### Initial release
Core app built with React and Vite. Price Quiz and Budget Builder activities. Mobile-first design, DM Sans font, teal/purple colour scheme.
