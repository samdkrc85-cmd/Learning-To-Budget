import React, { useState } from "react";

const MONEY_FACTS = [
  "The average UK child gets about £8.50 pocket money a week — that's £442 a year!",
  "A Nintendo Switch costs around £260. If you saved £5 a week, you'd have enough in about a year.",
  "It costs roughly £166,000 to raise a child from birth to age 18 in the UK.",
  "A typical UK primary school costs around £4 million a year to run — paid for by taxes!",
  "The UK's most expensive house ever sold for over £200 million. That's enough to buy 800,000 school dinners!",
  "If you saved just £1 a day from age 10, you'd have over £25,000 by the time you're 80 — thanks to interest!",
  "The average UK family spends around £63 a week on food — that's over £3,000 a year.",
  "A return train ticket from London to Edinburgh can cost over £200 if you book last minute — but as little as £30 if you book weeks ahead.",
  "Around 1 in 3 UK adults have less than £500 in savings. That's why learning about money early matters so much!",
  "The UK government spends about £11,000 per pupil on education each year — so your schooling is a big investment!",
  "If a UK household left the TV on standby all year, it would cost about £16 extra on their electricity bill.",
  "The average UK adult spends around £1,000 a year on takeaways and eating out.",
  "A first-class stamp now costs 85p. In 1971, it cost just 3p — that's the effect of inflation!",
  "Around 4.2 million children in the UK live in poverty. Budgeting and saving can help break that cycle.",
  "The most popular UK supermarket is Tesco, which serves about 27 million shoppers every week.",
];

function getRandomFact() {
  return MONEY_FACTS[Math.floor(Math.random() * MONEY_FACTS.length)];
}

export default function Home({ onNav }) {
  const [fact] = useState(getRandomFact);
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
      {/* Header */}
      <div style={{ padding: "48px 24px 32px", textAlign: "center" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            background: "linear-gradient(135deg, #1e1b4b, #0f766e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            margin: "0 auto 20px",
          }}
        >
          💷
        </div>
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
          <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>
            💡 Did you know?
          </div>
          <p style={{ fontSize: 13, color: "#78350f", fontWeight: 500, lineHeight: 1.55, margin: 0 }}>
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
          tags={["🧒 Cost of YOU", "👨‍👩‍👦 Family", "🎓 Student", "👩‍👦 Single parent"]}
          tagBg="#ccfbf1"
          tagColor="#0f766e"
        />

      </div>
    </div>
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
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500, marginTop: 2 }}>
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
