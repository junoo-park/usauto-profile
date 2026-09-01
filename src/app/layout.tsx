import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "US AUTO | 김용욱 대표 자동차 구매 상담",
  description:
    "차는 같아도 사는 방법에 따라 가격은 달라집니다. 일시불, 할부, 장기렌트, 리스 조건과 차량 할인까지 한 번에 비교해드립니다.",
  applicationName: "US AUTO",
  authors: [{ name: "김용욱" }],
  creator: "US AUTO",
  publisher: "US AUTO",
  keywords: [
    "US AUTO",
    "유에스오토",
    "김용욱",
    "신차 상담",
    "자동차 할부",
    "장기렌트",
    "자동차 리스",
    "중고차 매각",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "US AUTO",
    title: "US AUTO | 김용욱 대표 자동차 구매 상담",
    description:
      "일시불·할부·장기렌트·리스 조건과 차량 할인까지 한 번에 비교해 가장 합리적인 구매 방법을 안내합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "US AUTO | 김용욱 대표 자동차 구매 상담",
    description:
      "일시불·할부·장기렌트·리스 조건과 차량 할인까지 한 번에 비교해드립니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={notoSansKr.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
