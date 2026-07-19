import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(244,114,182,0.25), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1aa",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: -2,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#71717a", marginTop: 28 }}>
          <span>{siteConfig.location}</span>
          <span style={{ margin: "0 10px" }}>·</span>
          <span>{siteConfig.status}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
