import React from "react";

export default function Home({ onNav }) {
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
          subtitle="Try to balance the monthly budget of 3 different households"
          tags={["🧒 Cost of YOU", "👨‍👩‍👦 Family", "💑 Couple"]}
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
