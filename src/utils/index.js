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
  const mults = shuffle([0.3, 0.55, 1.6, 2.4]);
  const opts = new Set([amount]);

  for (const m of mults) {
    if (opts.size >= 4) break;
    const v = Math.max(50, Math.round((amount * m) / 50) * 50);
    if (v !== amount) opts.add(v);
  }

  let attempts = 0;
  while (opts.size < 4 && attempts < 20) {
    const v = Math.max(50, Math.round((amount * (0.4 + Math.random() * 2)) / 50) * 50);
    opts.add(v);
    attempts++;
  }

  return shuffle([...opts].slice(0, 4));
}
