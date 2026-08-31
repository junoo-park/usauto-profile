import type { Metadata } from "next";

import { OnePageSite } from "@/components/one-page-site";

export const metadata: Metadata = {
  title: "시안 B · Blue Dealer Desk | US AUTO",
  description: "화이트와 코발트 블루로 구성한 US AUTO의 밝고 신뢰감 있는 차량 상담 시안입니다.",
};

export default function ConceptBPage() {
  return <OnePageSite concept="b" />;
}
