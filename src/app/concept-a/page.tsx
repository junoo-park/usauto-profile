import type { Metadata } from "next";

import { OnePageSite } from "@/components/one-page-site";

export const metadata: Metadata = {
  title: "시안 A · Private Showroom | US AUTO",
  description: "블랙 우드와 화이트 마블로 구성한 US AUTO 프라이빗 쇼룸 시안입니다.",
};

export default function ConceptAPage() {
  return <OnePageSite concept="a" />;
}
