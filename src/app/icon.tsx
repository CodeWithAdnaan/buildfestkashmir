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
          overflow: "hidden",
          background: "#0d1117",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="http://localhost:3000/logo.png"
          width={32}
          height={32}
          alt="BuildFest logo"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
    ),
    { ...size },
  );
}
