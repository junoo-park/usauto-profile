import Image from "next/image";
import { type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarClock,
  Eye,
  FileText,
  HandCoins,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { ConceptSwitcher } from "@/components/concept-switcher";
import { ConsultationForm } from "@/components/consultation-form";
import { MobileFloatingConsultation } from "@/components/mobile-floating-consultation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { PurchaseComparison } from "@/components/purchase-comparison";
import { siteContent } from "@/content/site";

import styles from "./one-page-site.module.css";

type Concept = "a" | "b";

type OnePageSiteProps = {
  concept: Concept;
};

const trustItems = [
  {
    title: "조건 비교",
    description: "구매·렌트·리스 조건을 한자리에서 비교합니다.",
    icon: ShieldCheck,
  },
  {
    title: "투명한 안내",
    description: "차량가와 금융 조건, 부대비용을 빠짐없이 설명합니다.",
    icon: Eye,
  },
  {
    title: "빠른 출고 일정",
    description: "재고와 생산 일정을 빠르게 확인해 가능한 출고 시점을 안내합니다.",
    icon: CalendarClock,
  },
  {
    title: "최대 지원",
    description: "차량 할인과 금융 조건을 확인해 가능한 혜택을 최대한 안내합니다.",
    icon: HandCoins,
  },
] as const;

const activityItems = [
  {
    name: "김○현",
    vehicle: "GV80",
    type: "장기렌트",
    status: "계약완료",
    tone: "complete",
    time: "16:42",
  },
  {
    name: "박○수",
    vehicle: "BMW 5시리즈",
    type: "리스",
    status: "상담중",
    tone: "progress",
    time: "15:18",
  },
  {
    name: "이○민",
    vehicle: "카니발 하이리무진",
    type: "할부",
    status: "견적발송",
    tone: "quote",
    time: "14:03",
  },
  {
    name: "정○영",
    vehicle: "테슬라 Model Y",
    type: "일시불",
    status: "계약완료",
    tone: "complete",
    time: "12:46",
  },
  {
    name: "한○준",
    vehicle: "아우디 A6",
    type: "리스",
    status: "출고확인",
    tone: "delivery",
    time: "11:20",
  },
  {
    name: "최○주",
    vehicle: "팰리세이드",
    type: "중고차 매각",
    status: "상담접수",
    tone: "progress",
    time: "10:05",
  },
] as const;

const financialPartners = [
  { name: "현대캐피탈", logo: "/finance-logos/hyundai-capital.svg", width: "96%", height: "60%" },
  { name: "하나캐피탈", logo: "/finance-logos/hana-capital.svg", width: "88%", height: "72%" },
  { name: "KB캐피탈", logo: "/finance-logos/kb-capital.svg", width: "88%", height: "72%" },
  { name: "우리금융캐피탈", logo: "/finance-logos/woori-financial-capital.svg", width: "94%", height: "58%" },
  { name: "우리카드", logo: "/finance-logos/woori-card.svg", width: "82%", height: "72%" },
  { name: "JB우리캐피탈", logo: "/finance-logos/jb-woori-capital.svg", width: "96%", height: "58%" },
  { name: "신한카드", logo: "/finance-logos/shinhan-card.svg", width: "88%", height: "72%" },
  { name: "BNK캐피탈", logo: "/finance-logos/bnk-capital.svg", width: "96%", height: "58%" },
  { name: "오릭스캐피탈", logo: "/finance-logos/orix.gif", width: "76%", height: "88%", blend: true },
  { name: "롯데캐피탈", logo: "/finance-logos/lotte-capital.png", width: "84%", height: "82%" },
  { name: "롯데렌터카", logo: "/finance-logos/lotte-rent-a-car.png", width: "88%", height: "80%" },
  { name: "iM캐피탈", logo: "/finance-logos/im-capital.png", width: "94%", height: "62%" },
  { name: "NH캐피탈", logo: "/finance-logos/nh-capital.svg", width: "96%", height: "58%" },
  { name: "MG캐피탈", logo: "/finance-logos/mg-capital.svg", width: "82%", height: "82%" },
  { name: "메리츠캐피탈", logo: "/finance-logos/meritz-capital.png", width: "65%", height: "96%" },
  { name: "삼성카드", logo: "/finance-logos/samsung-card.jpg", width: "88%", height: "72%", blend: true },
  { name: "산은캐피탈", logo: "/finance-logos/kdb-capital.gif", width: "92%", height: "68%", blend: true },
] as const;

const reviewItems = [
  {
    title: "구매방식 비교",
    quote: "무조건 렌트나 리스를 권하지 않는 게 가장 좋았습니다.",
    body: "처음에는 장기렌트만 생각하고 문의했는데 일시불, 할부, 렌트, 리스를 전부 비교해주시더라고요. 각각 어떤 장단점이 있는지 설명해주시고 제 상황에서는 어떤 방법이 더 유리한지도 알려주셔서 결정하기 쉬웠습니다. 특정 상품을 권한다는 느낌보다 제 조건에 맞는 구매 방법을 같이 찾아준다는 느낌이라 만족했습니다.",
  },
  {
    title: "빠른 상담 & 출고",
    quote: "문의부터 차량 출고까지 계속 챙겨주셔서 편했어요.",
    body: "차량 구매가 처음이라 모르는 게 많아서 질문을 많이 드렸는데 답변도 빠르고 이해하기 쉽게 설명해주셨어요. 계약 후에도 차량 배정이나 출고 일정을 계속 알려주시고 필요한 부분을 먼저 챙겨주셔서 신경 쓸 일이 거의 없었습니다. 다음 차량 바꿀 때도 다시 연락드릴 것 같아요.",
  },
  {
    title: "투명한 견적",
    quote: "월 납입료만 저렴하게 보여주는 견적이 아니라 좋았습니다.",
    body: null,
  },
] as const;

const copy = {
  a: {
    eyebrow: "US AUTO · PRIVATE ADVISORY",
    title: (
      <>
        차는 같아도, 사는 방법에 따라
        <br />
        <strong>가격은 달라집니다.</strong>
      </>
    ),
    description: (
      <>
        <strong>일시불 · 할부 · 장기렌트 · 리스</strong>
        <span>
          차량 할인부터 금융 조건까지 한 번에 비교해
          <br />
          고객님께 가장 합리적인 구매 방법을 찾아드립니다.
        </span>
      </>
    ),
    trustEyebrow: "THE US AUTO STANDARD",
    trustTitle: "좋은 조건과 책임 있는 상담을\n한 사람의 이름으로 이어갑니다.",
    activityEyebrow: "PRIVATE CONSULTING DESK",
    activityTitle: "최근 상담과 계약 현황",
  },
  b: {
    eyebrow: "US AUTO · SMART CAR CONSULTING",
    title: (
      <>
        차는 같아도, 사는 방법에 따라
        <br />
        <strong>가격은 달라집니다.</strong>
      </>
    ),
    description: (
      <>
        <strong>일시불 · 할부 · 장기렌트 · 리스</strong>
        <span>
          차량 할인부터 금융 조건까지 한 번에 비교해
          <br />
          고객님께 가장 합리적인 구매 방법을 찾아드립니다.
        </span>
      </>
    ),
    trustEyebrow: "US AUTO SERVICE STANDARD",
    trustTitle: "복잡한 조건은 간결하게,\n차량 상담은 끝까지 책임 있게.",
    activityEyebrow: "REAL-TIME CONSULTING",
    activityTitle: "최근 상담과 계약 현황",
  },
} as const;

function AdvisorHeroCard({
  concept,
  title,
  titleId,
}: {
  concept: Concept;
  title: ReactNode;
  titleId: string;
}) {
  return (
    <section className={styles.advisorHeroCard} aria-labelledby={titleId}>
      <div className={styles.advisorHeroVisual}>
        <div className={styles.advisorHeroPortrait}>
          <Image
            alt="김용욱 US AUTO 대표"
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 64px), (max-width: 960px) 280px, 330px"
            src="/media/advisor-kim-young-wook.jpg"
          />
        </div>
        <div className={styles.advisorHeroNameplate}>
          <strong>{siteContent.advisor}</strong>
          <span>US AUTO 대표</span>
        </div>
      </div>

      <div className={styles.advisorHeroContent}>
        <p className={styles.advisorHeroEyebrow}>
          {concept === "b" ? "US AUTO · CAR BUYING DESK" : "US AUTO · 김용욱 대표"}
        </p>
        <h1 id={titleId}>{title}</h1>
        <p className={styles.advisorHeroDescription}>
          {concept === "b"
            ? "차량 할인부터 금융 조건까지 한 번에 비교해 가장 합리적인 구매 방법을 안내합니다."
            : "일시불 · 할부 · 장기렌트 · 리스를 한 번에 비교해드립니다."}
        </p>

        <div className={styles.advisorHeroActions}>
          <a
            className={`${styles.heroCta} ${styles.desktopConsultationLink}`}
            href={`#consultation-${concept}-desktop`}
          >
            상담 신청
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
          <a
            className={`${styles.heroCta} ${styles.mobileConsultationLink}`}
            href={`#consultation-${concept}-mobile`}
          >
            상담 신청
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}

function NaverBlogIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40">
      <rect height="40" rx="11" width="40" />
      <path d="M10.5 10.5h7.1l4.8 7.4v-7.4h7.1v19h-7.1l-4.8-7.4v7.4h-7.1z" />
    </svg>
  );
}

function FloatingConsultationActions({ concept }: { concept: Concept }) {
  return (
    <>
      <aside className={styles.desktopQuickActions} aria-label="빠른 상담 메뉴">
        <a href={`#consultation-${concept}-desktop`}>
          <span>실시간 상담문의</span>
          <i className={styles.quickActionInquiry}>
            <FileText aria-hidden="true" size={25} strokeWidth={1.8} />
          </i>
        </a>
        <button aria-label="카카오톡 상담 채널 링크 준비 중" disabled type="button">
          <span>카카오톡 상담</span>
          <i className={styles.quickActionKakao}>
            <MessageCircle aria-hidden="true" size={26} strokeWidth={1.8} />
          </i>
        </button>
      </aside>
      <MobileFloatingConsultation concept={concept} />
    </>
  );
}

export function OnePageSite({ concept }: OnePageSiteProps) {
  const content = copy[concept];
  const sectionSuffix = concept;

  return (
    <main
      className={`${styles.site} ${styles.conceptC} ${concept === "b" ? styles.conceptBlue : ""}`}
    >
      <ConceptSwitcher active={concept} tone={concept === "b" ? "light" : "dark"} />
      <FloatingConsultationActions concept={concept} />

      <header className={styles.header}>
        <a
          className={`${styles.wordmark} ${concept === "b" ? styles.blueWordmark : ""}`}
          href={`#home-${sectionSuffix}`}
          aria-label="US AUTO 첫 화면으로 이동"
        >
          <Image
            alt=""
            className={styles.brandMark}
            height={201}
            priority
            src="/brand/us-auto-mark.png"
            width={599}
          />
          <Image
            alt=""
            className={styles.brandWordmark}
            height={113}
            priority
            src="/brand/us-auto-wordmark.png"
            width={599}
          />
        </a>

        <nav aria-label={`${concept.toUpperCase()}안 주요 메뉴`}>
          <a href={`#home-${sectionSuffix}`}>홈</a>
          <a href={`#trust-${sectionSuffix}`}>US AUTO</a>
          <a href={`#comparison-${sectionSuffix}`}>구매 비교</a>
          <a href={`#status-${sectionSuffix}`}>상담 현황</a>
          <a href={`#consultation-${sectionSuffix}-desktop`}>상담 신청</a>
        </nav>

        <MobileNavigation concept={concept} />

        <a className={styles.headerCall} href={siteContent.phoneHref}>
          <Phone aria-hidden="true" size={16} strokeWidth={1.8} />
          <span>{siteContent.phone}</span>
        </a>
      </header>

      <section className={styles.hero} id={`home-${sectionSuffix}`} aria-labelledby={`hero-title-${sectionSuffix}`}>
        <video
          aria-hidden="true"
          autoPlay
          className={styles.heroVideo}
          loop
          muted
          playsInline
          poster="/media/hero-car-poster.jpg"
          preload="metadata"
        >
          <source src="/media/hero-car.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <AdvisorHeroCard
              concept={concept}
              title={content.title}
              titleId={`hero-title-${sectionSuffix}`}
            />
          </div>

          <ConsultationForm concept={concept} placement="desktop" />
        </div>

        <a className={styles.scrollCue} href={`#trust-${sectionSuffix}`} aria-label="다음 영역으로 이동">
          <span>SCROLL</span>
          <ArrowDown aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
      </section>

      <section className={styles.trust} id={`trust-${sectionSuffix}`} aria-labelledby={`trust-title-${sectionSuffix}`}>
        <div className={styles.trustIntro}>
          <p>{content.trustEyebrow}</p>
          <h2 id={`trust-title-${sectionSuffix}`}>
            {content.trustTitle.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>

        <ol className={styles.trustList}>
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <div className={styles.trustIcon}>
                  <Icon aria-hidden="true" size={28} strokeWidth={1.45} />
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={styles.activity} id={`status-${sectionSuffix}`} aria-labelledby={`activity-title-${sectionSuffix}`}>
        <header className={styles.activityHeading}>
          <div>
            <p>{content.activityEyebrow}</p>
            <h2 id={`activity-title-${sectionSuffix}`}>{content.activityTitle}</h2>
          </div>
          <span>
            <i aria-hidden="true" />
            오늘도 상담이 이어지고 있습니다
          </span>
        </header>

        <div className={styles.marqueeViewport}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((group) => (
              <div className={styles.marqueeGroup} aria-hidden={group === 1 ? "true" : undefined} key={group}>
                {activityItems.map((item) => (
                  <article className={styles.activityCard} key={`${group}-${item.time}-${item.name}`}>
                    <div className={styles.activityAvatar} aria-hidden="true">
                      {item.name.slice(0, 1)}
                    </div>
                    <div className={styles.activityCopy}>
                      <div>
                        <strong>{item.name}님</strong>
                        <span className={styles[`status${item.tone}`]}>{item.status}</span>
                      </div>
                      <p>
                        {item.vehicle} <i>·</i> {item.type}
                      </p>
                    </div>
                    <time>{item.time}</time>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.prototypeNote}>현재 상담 현황은 화면 구성을 위한 예시 데이터입니다.</p>
      </section>

      <PurchaseComparison sectionSuffix={sectionSuffix} />

      <section className={styles.reviews} id={`reviews-${sectionSuffix}`}>
        <div className={styles.reviewsInner}>
          <header className={styles.reviewsHeading}>
            <div>
              <p>CLIENT REVIEWS</p>
              <h2>상담 후 남겨주신 이야기</h2>
            </div>
            <span>조건 비교부터 출고까지, 상담 과정에서 느낀 경험입니다.</span>
          </header>

          <div className={styles.reviewGrid}>
            {reviewItems.map((review) => (
              <article className={styles.reviewCard} key={review.title}>
                <div className={styles.reviewTopline}>
                  <h3>{review.title}</h3>
                  <span className={styles.reviewStars} aria-label="별점 5점 만점에 5점">
                    <span aria-hidden="true">★★★★★</span>
                  </span>
                </div>
                <blockquote>“{review.quote}”</blockquote>
                {review.body ? <p>{review.body}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.financeRail}
        id={`finance-${sectionSuffix}`}
        aria-labelledby={`finance-title-${sectionSuffix}`}
      >
        <header className={styles.financeHeading}>
          <div>
            <p>FINANCE PARTNERS</p>
            <h2 id={`finance-title-${sectionSuffix}`}>함께하는 금융사</h2>
          </div>
          <span>금융사별 조건을 비교해 안내합니다.</span>
        </header>

        <div className={styles.financeViewport}>
          <div className={styles.financeTrack}>
            {[0, 1].map((group) => (
              <ul aria-hidden={group === 1 ? "true" : undefined} className={styles.financeGroup} key={group}>
                {financialPartners.map((partner) => (
                  <li key={`${group}-${partner.name}`}>
                    <span className={styles.financeLogoFrame}>
                      <Image
                        alt={partner.name}
                        className={styles.financeLogo}
                        data-blend={"blend" in partner ? partner.blend : undefined}
                        height={38}
                        loading="eager"
                        src={partner.logo}
                        style={{ height: partner.height, width: partner.width }}
                        unoptimized
                        width={132}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mobileConsultation} aria-label="모바일 차량 상담 신청">
        <ConsultationForm concept={concept} placement="mobile" />
      </section>

      <section
        className={styles.channels}
        id={`channels-${sectionSuffix}`}
        aria-labelledby={`channels-title-${sectionSuffix}`}
      >
        <div className={styles.channelsInner}>
          <p className={styles.channelsEyebrow}>US AUTO ONLINE</p>
          <h2 id={`channels-title-${sectionSuffix}`}>온라인에서도 US AUTO를 만나보세요</h2>
          <p className={styles.channelsDescription}>
            차량 비교 정보와 새로운 출고 소식을 네이버 블로그에서 전해드립니다.
          </p>

          <div className={styles.channelBadge} aria-label="네이버 블로그 채널 링크 준비 중">
            <span className={styles.channelIcon}>
              <NaverBlogIcon />
            </span>
            <span>네이버 블로그</span>
            <small>준비 중</small>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLead}>
            <Image
              alt="US AUTO"
              className={`${styles.footerBrandLogo} ${concept === "b" ? styles.blueFooterLogo : ""}`}
              height={67}
              src="/brand/us-auto-logo.png"
              width={120}
            />
            <p>차량 선택부터 금융 조건 비교, 출고까지 한 사람의 이름으로 함께합니다.</p>
          </div>

          <div className={styles.footerBusiness}>
            <div className={styles.footerBusinessName}>
              <strong>{siteContent.businessName}</strong>
              <span>대표 {siteContent.advisor}</span>
            </div>
            <dl>
              <div>
                <dt>사업자등록번호</dt>
                <dd>{siteContent.businessNumber}</dd>
              </div>
              <div>
                <dt>사업장 주소</dt>
                <dd>
                  <address>{siteContent.address}</address>
                </dd>
              </div>
              <div>
                <dt>업태 · 종목</dt>
                <dd>{siteContent.businessItems}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.footerContact}>
            <span>CONSULTATION</span>
            <a href={siteContent.phoneHref}>{siteContent.phone}</a>
            <a href={`mailto:${siteContent.email}`}>{siteContent.email}</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <small>© 2026 US AUTO. ALL RIGHTS RESERVED.</small>
          <p>금융·리스·렌트 조건은 차량 및 심사 결과에 따라 달라질 수 있습니다.</p>
        </div>
      </footer>
    </main>
  );
}
