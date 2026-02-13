import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Joris Strakeljahn — Developer, Indie Hacker & Freelancer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 100px",
          background: "linear-gradient(135deg, #0c0c0d 0%, #111113 50%, #1a1a1e 100%)",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#c47a3a",
            borderRadius: 2,
            marginBottom: 32,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#c47a3a",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            marginBottom: 20,
          }}
        >
          indie hacker · freelancer · student
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ededef",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Joris Strakeljahn
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#a0a0ab",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Building products, tools, and experiences that people actually use.
        </div>

        {/* Bottom: Logo + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
            paddingTop: 40,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#c47a3a",
              fontFamily: "monospace",
            }}
          >
            &lt;/&gt;
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#858592",
              fontFamily: "monospace",
            }}
          >
            jorisstrakeljahn.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
