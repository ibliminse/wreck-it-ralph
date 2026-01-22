import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          borderRadius: "100px",
        }}
      >
        <span
          style={{
            fontSize: 280,
            fontWeight: 900,
            color: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          W
        </span>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
