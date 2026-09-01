"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";

import styles from "./one-page-site.module.css";

const purchaseMethods = [
  { title: "리스" },
  { title: "장기렌트" },
  { title: "할부" },
  { title: "일시불" },
] as const;

const comparisonRows = [
  {
    label: "명의",
    cells: ["리스사", "렌트사", "내 명의", "내 명의"],
  },
  {
    label: "번호판",
    cells: ["일반 번호판", "하 · 허 · 호", "일반 번호판", "일반 번호판"],
  },
  {
    label: "보험",
    cells: ["직접 가입", "렌트료 포함", "직접 가입", "직접 가입"],
  },
  {
    label: "이용 조건",
    cells: ["기간 · 거리 약정", "기간 · 거리 약정", "상환 기간 약정", "제한 없음"],
  },
  {
    label: "금융 심사",
    cells: ["금융사 심사", "렌트사 심사", "대출 심사", "별도 대출 없음"],
  },
  {
    label: "계약 만기",
    cells: ["반납 · 연장 · 인수", "반납 · 연장 · 인수", "상환 후 계속 보유", "즉시 소유"],
  },
] as const;

type PurchaseComparisonProps = {
  sectionSuffix: string;
};

export function PurchaseComparison({ sectionSuffix }: PurchaseComparisonProps) {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const currentMethod = purchaseMethods[selectedMethod];

  return (
    <section
      className={styles.comparison}
      id={`comparison-${sectionSuffix}`}
      aria-labelledby={`comparison-title-${sectionSuffix}`}
    >
      <div className={styles.comparisonInner}>
        <header className={styles.comparisonHeading}>
          <h2 id={`comparison-title-${sectionSuffix}`}>차량 구매 방식 비교</h2>
          <span>리스, 장기렌트, 할부, 일시불의 차이를 항목별로 확인해 보세요.</span>
        </header>

        <div className={styles.comparisonDesktop}>
          <div className={styles.comparisonBoard} tabIndex={0}>
            <table className={styles.comparisonMatrix}>
              <caption className={styles.visuallyHidden}>
                리스, 장기렌트, 할부, 일시불 구매 방식 비교
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <strong>비교 항목</strong>
                  </th>
                  {purchaseMethods.map((method) => (
                    <th key={method.title} scope="col">
                      <strong>{method.title}</strong>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">
                      {row.label}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td key={`${row.label}-${purchaseMethods[index].title}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.comparisonMobile}>
          <div className={styles.comparisonMethodSelector} role="group" aria-label="구매 방식 선택">
            {purchaseMethods.map((method, index) => (
              <button
                aria-pressed={selectedMethod === index}
                className={selectedMethod === index ? styles.comparisonMethodActive : undefined}
                key={method.title}
                onClick={() => setSelectedMethod(index)}
                type="button"
              >
                {method.title}
              </button>
            ))}
          </div>

          <div className={styles.comparisonMobileDetail} aria-live="polite">
            <p className={styles.comparisonMobileSelected}>{currentMethod.title}</p>

            <dl className={styles.comparisonMobileList}>
              {comparisonRows.map((row) => {
                const cell = row.cells[selectedMethod];
                return (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{cell}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        <p className={styles.comparisonNotice}>
          실제 조건과 비용은 차종, 금융사, 심사 결과, 계약 상품 및 세무 기준에 따라 달라질 수 있습니다.
        </p>
        <div className={styles.comparisonActions}>
          <a
            className={`${styles.comparisonCta} ${styles.comparisonCtaMobile}`}
            href={`#consultation-${sectionSuffix}-mobile`}
          >
            내 조건으로 상담 받기
            <ArrowDown aria-hidden="true" size={17} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}
