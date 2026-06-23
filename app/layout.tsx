import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI 看世足｜台灣球迷的世足賽前數據懶人包",
    template: "%s｜AI 看世足"
  },
  description: "整理台灣運彩倍率、世界盃歷史戰績、晉級條件與模型預估比分，提供台灣球迷白話賽前分析。",
  openGraph: {
    title: "AI 看世足",
    description: "台灣球迷的世足賽前數據懶人包。",
    type: "website",
    locale: "zh_TW"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body id="top">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
