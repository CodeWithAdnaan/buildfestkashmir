import { siteConfig } from "@/lib/constants/site";

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0d0c",
        backgroundImage:
          "radial-gradient(circle at 80% 10%, rgba(240,165,61,0.28), transparent 55%), radial-gradient(circle at 5% 85%, rgba(47,110,86,0.35), transparent 55%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C7 6 4 10 4 14a8 8 0 0016 0c0-4-3-8-8-12z"
            stroke="#f0a53d"
            strokeWidth={1.5}
          />
          <path d="M12 5v15" stroke="#f0a53d" strokeWidth={1.1} />
        </svg>
        <span style={{ fontSize: 30, color: "#f6f5f2", fontWeight: 600 }}>
          {siteConfig.name}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span
          style={{
            fontSize: 62,
            fontWeight: 600,
            color: "#f6f5f2",
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {siteConfig.tagline}
        </span>
        <span style={{ fontSize: 24, color: "#a3a8a5", maxWidth: 820 }}>
          {siteConfig.description}
        </span>
      </div>

      <div style={{ display: "flex", gap: 10, fontSize: 18, color: "#6b716e" }}>
        <span>{siteConfig.location}</span>
      </div>
    </div>
  );
}
