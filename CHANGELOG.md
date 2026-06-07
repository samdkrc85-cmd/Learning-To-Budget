# Changelog

All notable changes to Learning To Budget are recorded here.

---

## Current — Budget Builder Redesign
**Tag:** *(unreleased — latest on master)*

- Rebuilt Budget Builder as a one-card-at-a-time experience
- Replaced +/− buttons with a slider for each category guess
- Slider max is randomised per question so the position doesn't give away the answer
- Reveal screen shows a side-by-side bar comparison of guess vs real amount
- Scoring changed from points to stars: ⭐⭐⭐ Spot on / ⭐⭐ Close / ⭐ Keep practising (based on % difference from real amount)
- Results screen shows star breakdown per category and overall rank mascot
- Removed Aiden at University scenario (too similar to Chloe the Student)
- Renamed Priya & Son to Sarah & Noah

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
