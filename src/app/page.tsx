import Link from "next/link";

const concepts = [
  {
    key: "A",
    href: "/concept-a",
    className: "direction-card-a",
    label: "PRIVATE SHOWROOM",
    title: "상담을 공간처럼 느끼는 시안",
    description: "기존 B안의 블랙 우드와 화이트 마블 분위기를 A안으로 그대로 옮겼습니다.",
    colors: ["#151412", "#4A3025", "#EFEDE7"],
  },
  {
    key: "B",
    href: "/concept-b",
    className: "direction-card-b",
    label: "MIDNIGHT LEDGER",
    title: "기준과 과정을 정교하게 보여주는 시안",
    description: "깊은 블랙 위에 무광 골드의 선과 번호만 남긴 절제된 프라이빗 컨설팅 무드입니다.",
    colors: ["#0B0B0A", "#9A8054", "#ECE8DF"],
  },
  {
    key: "C",
    href: "/concept-c",
    className: "direction-card-c",
    label: "PRIVATE ADVISORY LOUNGE",
    title: "두 시안의 장점을 자연스럽게 합친 시안",
    description: "B안의 깊은 블랙과 무광 골드를 기준으로 A안의 대표 소개와 부드러운 라운드를 결합했습니다.",
    colors: ["#0E0D0C", "#A68A5C", "#F0ECE3"],
  },
] as const;

export default function Home() {
  return (
    <main className="concept-hub">
      <header className="hub-header">
        <p>US AUTO · DESIGN DIRECTIONS</p>
        <span>3 CONCEPTS / 2026</span>
      </header>

      <section className="hub-intro" aria-labelledby="hub-title">
        <p>시안 선택</p>
        <h1 id="hub-title">같은 사람, 다른 첫인상.</h1>
        <span>각 시안을 열어 데스크톱과 모바일에서 직접 비교해보세요.</span>
      </section>

      <section className="direction-grid" aria-label="디자인 시안 목록">
        {concepts.map((concept) => (
          <Link
            className={`direction-card ${concept.className}`}
            href={concept.href}
            key={concept.key}
          >
            <div className="direction-topline">
              <span>{concept.key}</span>
              <p>{concept.label}</p>
            </div>
            <div className="direction-copy">
              <h2>{concept.title}</h2>
              <p>{concept.description}</p>
            </div>
            <div className="direction-footer">
              <div className="palette" aria-label={`${concept.key}안 색상 팔레트`}>
                {concept.colors.map((color) => (
                  <i key={color} style={{ backgroundColor: color }} title={color} />
                ))}
              </div>
              <span>시안 보기 →</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
