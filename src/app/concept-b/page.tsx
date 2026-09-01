import type { Metadata } from "next";

import { OnePageSite } from "@/components/one-page-site";

export const metadata: Metadata = {
  title: "시안 B · Blue Car Buying Desk | US AUTO",
  description: "US AUTO 공식 블루와 화이트를 기반으로 구성한 밝고 신뢰감 있는 차량 구매 상담 시안입니다.",
};

export default function ConceptBPage() {
  return <OnePageSite concept="b" />;
}
