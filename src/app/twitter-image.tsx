import { ImageResponse } from "next/og";
import { OgImageContent } from "@/components/og/og-content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
