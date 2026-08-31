import type { Metadata } from "next";

import { OnePageSite } from "@/components/one-page-site";

export const metadata: Metadata = {
  title: "시안 C · Private Advisory Lounge | US AUTO",
  description: "시안 B의 블랙·골드 테마와 시안 A의 대표 소개 및 부드러운 라운드를 결합한 US AUTO 시안입니다.",
};

export default function ConceptCPage() {
  return <OnePageSite concept="c" />;
}
