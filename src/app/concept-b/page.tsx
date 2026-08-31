import type { Metadata } from "next";

import { OnePageSite } from "@/components/one-page-site";

export const metadata: Metadata = {
  title: "시안 B · Midnight Ledger | US AUTO",
  description: "절제된 블랙과 무광 골드로 구성한 US AUTO 셀렉티브 컨설팅 시안입니다.",
};

export default function ConceptBPage() {
  return <OnePageSite concept="b" />;
}
