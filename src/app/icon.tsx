import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon — uses the BuildFest HACK logo as a 32×32 icon.
 * Next.js serves this at /icon automatically.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#0d1117",
          border: "1px solid #1f2937",
          color: "#10b981",
          fontWeight: 900,
          fontSize: "14px",
          fontFamily: "monospace",
        }}
      >
        BF
      </div>
    ),
    { ...size },
  );
}
