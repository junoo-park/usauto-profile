import Link from "next/link";

const concepts = [
  {
    key: "A",
    href: "/concept-a",
    className: "direction-card-a",
    label: "PRIVATE ADVISORY LOUNGE",
    title: "한 사람의 책임을 깊이 있게 보여주는 시안",
    description: "기존 C안의 대표 소개 구조와 절제된 블랙·무광 골드 분위기를 최종 A안으로 옮겼습니다.",
    colors: ["#0E0D0C", "#A68A5C", "#F0ECE3"],
  },
  {
    key: "B",
    href: "/concept-b",
    className: "direction-card-b",
    label: "BLUE DEALER DESK",
    title: "밝고 빠르게 조건을 비교하는 시안",
    description: "같은 상담 구조를 유지하면서 화이트·코발트 블루와 얇은 경계선으로 더 선명하고 친근하게 구성했습니다.",
    colors: ["#FFFFFF", "#2448E8", "#EEF4FF"],
  },
] as const;

export default function Home() {
  return (
    <main className="concept-hub">
      <header className="hub-header">
        <p>US AUTO · DESIGN DIRECTIONS</p>
        <span>2 CONCEPTS / 2026</span>
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
