import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WRECKIT vs RALPH - AI Coding Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo area */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "40px" }}>
          {/* WRECKIT logo */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            W
          </div>
          <div style={{ fontSize: "48px", color: "#71717a" }}>vs</div>
          {/* RALPH logo */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            R
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#f59e0b" }}>WRECKIT</span>
          <span style={{ color: "#71717a", margin: "0 16px" }}>&</span>
          <span style={{ color: "#8b5cf6" }}>RALPH</span>
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: "32px", color: "#a1a1aa" }}>
          The AI Coding Agent Ecosystem
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "24px",
            color: "#52525b",
          }}
        >
          wreckitlore.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
