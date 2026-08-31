"use client";

import { Headphones } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./one-page-site.module.css";

type Concept = "a" | "b";

export function MobileFloatingConsultation({ concept }: { concept: Concept }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(`home-${concept}`);

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 78);
      },
      {
        rootMargin: "-78px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [concept]);

  return (
    <a
      aria-hidden={!isVisible}
      aria-label="차량 상담 신청"
      className={`${styles.mobileFloatingCta} ${isVisible ? styles.mobileFloatingCtaVisible : ""}`}
      href={`#consultation-${concept}-mobile`}
      tabIndex={isVisible ? 0 : -1}
    >
      <Headphones aria-hidden="true" size={23} strokeWidth={1.8} />
      <span>상담</span>
    </a>
  );
}
