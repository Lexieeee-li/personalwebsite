import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: {
      default: "个人作品集 · Strategy & Design",
      template: "%s · 个人作品集",
    },
    description: "一个以策略、体验与叙事为线索的个人作品集网站。",
    openGraph: {
      title: "Selected Work — 2026",
      description: "Portfolio / Strategy / Design",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Selected Work — 2026" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Selected Work — 2026",
      description: "Portfolio / Strategy / Design",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
