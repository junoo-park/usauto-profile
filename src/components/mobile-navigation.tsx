"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import styles from "./one-page-site.module.css";

type MobileNavigationProps = {
  concept: "a" | "b" | "c";
};

export function MobileNavigation({ concept }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const links = [
    { href: `#home-${concept}`, label: "홈" },
    { href: `#trust-${concept}`, label: "US AUTO" },
    { href: `#comparison-${concept}`, label: "구매 비교" },
    { href: `#status-${concept}`, label: "상담 현황" },
    { href: `#consultation-${concept}-mobile`, label: "상담 신청" },
  ];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.mobileMenu}>
      <button
        aria-controls={`mobile-menu-${concept}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setIsOpen((current) => !current)}
        ref={menuButtonRef}
        type="button"
      >
        {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>

      <div
        aria-hidden={!isOpen}
        className={styles.mobileMenuPanel}
        data-open={isOpen}
        id={`mobile-menu-${concept}`}
        ref={menuPanelRef}
      >
        <div className={styles.mobileMenuHeading}>
          <p>US AUTO</p>
          <span>필요한 메뉴를 선택해주세요.</span>
        </div>
        <nav aria-label={`${concept.toUpperCase()}안 모바일 메뉴`}>
          {links.map((link, index) => (
            <a
              data-consultation={index === links.length - 1 || undefined}
              href={link.href}
              key={link.href}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{link.label}</strong>
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} />
            </a>
          ))}
        </nav>
        <div className={styles.mobileMenuFooter}>
          <span>PRIVATE CONSULTING DESK</span>
          <p>차량 선택부터 출고까지 김용욱 대표가 직접 함께합니다.</p>
        </div>
      </div>
    </div>
  );
}
