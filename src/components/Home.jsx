import React, { useState, useEffect } from "react";

const MONEY_FACTS = [
  "The average UK child gets about £8.50 pocket money a week — that's £442 a year!",
  "A popular games console costs around £300–£400. If you saved £8 a week, you'd have enough in about a year.",
  "It costs roughly £166,000 to raise a child from birth to age 18 in the UK.",
  "A typical UK primary school costs around £4 million a year to run — paid for by taxes!",
  "The UK's most expensive house ever sold for over £200 million. That's enough to buy 800,000 school dinners!",
  "If you saved just £1 a day from age 10, you'd have over £25,000 by the time you're 80 — thanks to interest!",
  "The average UK family spends around £75 a week on food — that's over £3,900 a year.",
  "A return train ticket from London to Edinburgh can cost over £300 if you book last minute — but as little as £50 if you book weeks ahead.",
  "Around 1 in 3 UK adults have less than £500 in savings. That's why learning about money early matters so much!",
  "The UK government spends about £8,000 per pupil on education each year — so your schooling is a big investment!",
  "If a UK household left the TV on standby all year, it would cost about £16 extra on their electricity bill.",
  "The average UK adult spends around £1,000 a year on takeaways and eating out.",
  "A first-class stamp now costs £1.35. In 1971, it cost just 3p — that's the effect of inflation!",
  "Around 4.2 million children in the UK live in poverty. Budgeting and saving can help break that cycle.",
  "The most popular UK supermarket is Tesco, which serves about 27 million shoppers every week.",
];

function getRandomFact() {
  return MONEY_FACTS[Math.floor(Math.random() * MONEY_FACTS.length)];
}

export default function Home({ onNav }) {
  const [fact] = useState(getRandomFact);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    function onBeforeInstall(e) {
      e.preventDefault();
      setInstallPrompt(e);
    }
    function onAppInstalled() {
      setInstalled(true);
      setInstallPrompt(null);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  function handleInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then(() => setInstallPrompt(null));
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Install banner */}
      {installPrompt && !installed && (
        <div style={{ padding: "12px 20px 0" }}>
          <button
            onClick={handleInstall}
            style={{
              width: "100%",
              background: "#0f766e",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 22 }}>📲</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Add to Home Screen</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 1 }}>Install the app for quick access — works offline too</div>
            </div>
            <span style={{ opacity: 0.7, fontSize: 18 }}>›</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: `${installPrompt && !installed ? "24px" : "48px"} 24px 32px`, textAlign: "center" }}>
        <PiggyLogo />
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 8, lineHeight: 1.2 }}>
          Learn to Budget
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, fontWeight: 500, lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
          Most adults wish they'd learned about money sooner. Pick an activity to get started.
        </p>

        {/* Rotating money fact */}
        <div
          style={{
            marginTop: 20,
            background: "#fef9c3",
            border: "1.5px solid #fbbf24",
            borderRadius: 14,
            padding: "12px 16px",
            maxWidth: 320,
            margin: "20px auto 0",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: "#78350f", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>
            💡 Did you know?
          </div>
          <p style={{ fontSize: 14, color: "#78350f", fontWeight: 500, lineHeight: 1.55, margin: 0 }}>
            {fact}
          </p>
        </div>
      </div>

      {/* Activity cards */}
      <div style={{ padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}>

        <HomeCard
          onPress={() => onNav("quiz")}
          gradient="linear-gradient(120deg, #4f46e5, #7c3aed)"
          shadow="rgba(109,40,217,0.12)"
          shadowHover="rgba(109,40,217,0.2)"
          icon="🏷️"
          title="Price Quiz"
          subtitle="10 questions · see how well you know the prices of everyday things"
          tags={["🥛 Milk", "🛋️ Sofa", "🎢 Theme park", "🐱 Cat food"]}
          tagBg="#ede9fe"
          tagColor="#5b21b6"
        />

        <HomeCard
          onPress={() => onNav("budget")}
          gradient="linear-gradient(120deg, #0f766e, #0d9488)"
          shadow="rgba(15,118,110,0.12)"
          shadowHover="rgba(15,118,110,0.2)"
          icon="📊"
          title="Budget Builder"
          subtitle="Try to balance the monthly budget of different households"
          tags={["🧒 Cost of YOU", "👨‍👩‍👦 Family", "💑 Couple", "👩‍👦 Single parent"]}
          tagBg="#ccfbf1"
          tagColor="#0f766e"
        />

        <HomeCard
          onPress={() => onNav("needorwant")}
          gradient="linear-gradient(120deg, #9333ea, #db2777)"
          shadow="rgba(147,51,234,0.12)"
          shadowHover="rgba(147,51,234,0.2)"
          icon="🤔"
          title="Need or Want?"
          subtitle="10 cards · sort everyday items before the timer runs out"
          tags={["✅ Needs", "❌ Wants", "🤔 Tricky ones"]}
          tagBg="#f3e8ff"
          tagColor="#7e22ce"
        />

      </div>
    </div>
  );
}

// ─── PIGGY LOGO ───────────────────────────────────────────────────────────────
function PiggyLogo() {
  return (
    <svg
      width="100"
      height="115"
      viewBox="0 0 130 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "0 auto 12px", display: "block" }}
      aria-hidden="true"
    >
      {/* ── Ears (behind head) ── */}
      <ellipse cx="28" cy="36" rx="18" ry="22" fill="#fda4af" stroke="#fb7185" strokeWidth="2.5" />
      <ellipse cx="102" cy="36" rx="18" ry="22" fill="#fda4af" stroke="#fb7185" strokeWidth="2.5" />
      <ellipse cx="28" cy="37" rx="10" ry="14" fill="#f472b6" />
      <ellipse cx="102" cy="37" rx="10" ry="14" fill="#f472b6" />

      {/* ── Legs + trotters (behind body) ── */}
      <ellipse cx="46" cy="120" rx="13" ry="14" fill="#fda4af" stroke="#fb7185" strokeWidth="2" />
      <ellipse cx="84" cy="120" rx="13" ry="14" fill="#fda4af" stroke="#fb7185" strokeWidth="2" />
      <ellipse cx="46" cy="131" rx="13" ry="7" fill="#f472b6" stroke="#fb7185" strokeWidth="1.5" />
      <ellipse cx="84" cy="131" rx="13" ry="7" fill="#f472b6" stroke="#fb7185" strokeWidth="1.5" />

      {/* ── Body / head ── */}
      <circle cx="65" cy="72" r="52" fill="#fda4af" stroke="#fb7185" strokeWidth="2.5" />

      {/* ── Coin slot ── */}
      <rect x="47" y="21" width="36" height="7" rx="3.5" fill="#9f1239" />

      {/* ── Coin ── */}
      <circle cx="65" cy="14" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="65" y="19" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e" fontFamily="sans-serif">£</text>

      {/* ── Eyes ── */}
      <circle cx="47" cy="64" r="6" fill="#1e293b" />
      <circle cx="83" cy="64" r="6" fill="#1e293b" />
      <circle cx="49.5" cy="61.5" r="2" fill="white" />
      <circle cx="85.5" cy="61.5" r="2" fill="white" />

      {/* ── Snout ── */}
      <ellipse cx="65" cy="86" rx="22" ry="17" fill="#f472b6" stroke="#fb7185" strokeWidth="2" />
      <ellipse cx="57" cy="88" rx="5" ry="4" fill="#be185d" />
      <ellipse cx="73" cy="88" rx="5" ry="4" fill="#be185d" />

      {/* ── Smile ── */}
      <path d="M53 100 Q65 110 77 100" stroke="#be185d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* ── Rosy cheeks ── */}
      <ellipse cx="36" cy="82" rx="10" ry="7" fill="#fb7185" opacity="0.3" />
      <ellipse cx="94" cy="82" rx="10" ry="7" fill="#fb7185" opacity="0.3" />
    </svg>
  );
}

// ─── HOME CARD ────────────────────────────────────────────────────────────────
// Extracted to avoid duplicating the hover logic twice inline.
function HomeCard({ onPress, gradient, shadow, shadowHover, icon, title, subtitle, tags, tagBg, tagColor }) {
  function handleMouseEnter(e) {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = `0 8px 28px ${shadowHover}`;
  }
  function handleMouseLeave(e) {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = `0 2px 12px ${shadow}`;
  }

  return (
    <button
      onClick={onPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "#ffffff",
        border: "none",
        borderRadius: "var(--radius-lg)",
        padding: 0,
        overflow: "hidden",
        textAlign: "left",
        boxShadow: `0 2px 12px ${shadow}`,
        transition: "transform 0.12s, box-shadow 0.12s",
      }}
    >
      {/* Coloured header */}
      <div
        style={{
          background: gradient,
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            {icon}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "white" }}>{title}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.95)", fontWeight: 500, marginTop: 2 }}>
              {subtitle}
            </div>
          </div>
        </div>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 22, lineHeight: 1 }}>›</span>
      </div>

      {/* Tag row */}
      <div style={{ padding: "16px 22px 18px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                background: tagBg,
                color: tagColor,
                borderRadius: 99,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
