/**
 * UTILITIES
 */

/**
 * Fisher-Yates shuffle — statistically uniform, unlike sort(() => Math.random() - 0.5).
 * Returns a new array; never mutates the original.
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Format a number as pounds, rounding to the nearest whole pound.
 * e.g. 1200 → "£1,200", 0.50 → "50p"
 */
export function fmt(n) {
  if (n >= 1) {
    return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  return `${(n * 100).toFixed(0)}p`;
}

/**
 * Format preserving pence where genuinely needed (e.g. quiz answer of £1.55).
 * Use fmt() everywhere else.
 */
export function fmtExact(n) {
  if (n < 1) return `${(n * 100).toFixed(0)}p`;
  const hasP = n % 1 !== 0;
  return "£" + n.toLocaleString("en-GB", {
    minimumFractionDigits: hasP ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Generate 4 plausible multiple-choice options for a surprise bill,
 * given the correct answer. Always includes the correct amount.
 * Rounds to the nearest £50 to keep options clean.
 */
export function makeSurpriseOptions(amount) {
  // Step and floor scale with the answer so small amounts get tight distractors
  // and large amounts get round-number ones.
  const step = amount < 50 ? 5 : amount < 100 ? 10 : 50;
  const floor = step;

  function snap(v) {
    return Math.max(floor, Math.round(v / step) * step);
  }

  // Multipliers are spread wide enough that snap() produces distinct values
  // even for small answers (e.g. £20 → £10, £30, £40, £50).
  const mults = shuffle([0.4, 0.7, 1.5, 2.5]);
  const opts = new Set([amount]);

  for (const m of mults) {
    if (opts.size >= 4) break;
    const v = snap(amount * m);
    if (v !== amount) opts.add(v);
  }

  // Fallback: nudge by fixed offsets relative to the step to guarantee variety.
  const nudges = shuffle([-3, -2, -1, 2, 3, 4].map((n) => snap(amount + n * step)));
  for (const v of nudges) {
    if (opts.size >= 4) break;
    if (v !== amount && v > 0) opts.add(v);
  }

  return shuffle([...opts].slice(0, 4));
}
