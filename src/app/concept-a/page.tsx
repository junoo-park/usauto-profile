import type { Metadata } from "next";

import { OnePageSite } from "@/components/one-page-site";

export const metadata: Metadata = {
  title: "시안 A · Private Advisory Lounge | US AUTO",
  description: "블랙과 무광 골드로 구성한 US AUTO 프라이빗 어드바이저리 시안입니다.",
};

export default function ConceptAPage() {
  return <OnePageSite concept="a" />;
}
