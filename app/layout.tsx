import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "李子园 · 产品设计作品集",
    template: "%s · 李子园",
  },
  description: "李子园的产品设计作品集，聚焦产品策略、用户研究、交互设计与系统化解决方案。",
  openGraph: {
    title: "李子园 · Product Design Portfolio",
    description: "产品策略、用户研究、交互设计与系统化解决方案。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "李子园 · 产品设计作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "李子园 · Product Design Portfolio",
    description: "产品策略、用户研究、交互设计与系统化解决方案。",
    images: ["/og.png"],
  },
};

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
