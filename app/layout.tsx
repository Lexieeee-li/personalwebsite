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
      default: "李子园 · 产品设计作品集",
      template: "%s · 李子园",
    },
    description: "李子园的产品设计作品集，聚焦产品策略、用户研究、交互设计与系统化解决方案。",
    openGraph: {
      title: "李子园 · Product Design Portfolio",
      description: "产品策略、用户研究、交互设计与系统化解决方案。",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "李子园 · 产品设计作品集" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "李子园 · Product Design Portfolio",
      description: "产品策略、用户研究、交互设计与系统化解决方案。",
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
