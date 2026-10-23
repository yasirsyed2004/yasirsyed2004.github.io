import { ImageResponse } from "next/og";
import { profile, seo } from "@/data/profile";

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#08090b",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(76,141,255,0.30) 0%, rgba(8,9,11,0) 55%)",
          color: "#eef1f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#4c8dff",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9aa4b2",
            }}
          >
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4 }}>
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#9aa4b2",
              maxWidth: 900,
            }}
          >
            {profile.positioning}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1d222b",
            paddingTop: 28,
            fontSize: 24,
            color: "#6c7684",
          }}
        >
          <div>{profile.title}</div>
          <div style={{ color: "#4c8dff" }}>{profile.availability}</div>
        </div>
      </div>
    ),
    size,
  );
}
