import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d0c",
        }}
      >
        <svg width="108" height="108" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C7 6 4 10 4 14a8 8 0 0016 0c0-4-3-8-8-12z"
            stroke="#f0a53d"
            strokeWidth={1.4}
          />
          <path d="M12 5v15" stroke="#f0a53d" strokeWidth={1} />
        </svg>
      </div>
    ),
    { ...size },
  );
}
