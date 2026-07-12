"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d0c",
          color: "#f6f5f2",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>Something broke.</h1>
        <p style={{ marginTop: 12, color: "#a3a8a5", maxWidth: 360 }}>
          A critical error occurred. Please try reloading the page.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 24,
            padding: "11px 22px",
            borderRadius: 8,
            border: "none",
            background: "#f0a53d",
            color: "#1a1103",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
