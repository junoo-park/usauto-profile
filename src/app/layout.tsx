import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "US AUTO | 자동차 전문 상담 디자인 시안",
  description:
    "신차, 렌트, 리스, 일시불, 할부, 중고차 매각 상담을 위한 US AUTO 소개 사이트입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={notoSansKr.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
