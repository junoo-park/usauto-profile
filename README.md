# US AUTO PB 소개 페이지

자동차 판매 담당자를 소개하고 상담으로 연결하는 한 장짜리 웹사이트 프로젝트입니다.

브랜드와 담당자 정보는 `src/content/site.ts`에서 관리하며, 페이지 구조는
`src/app/page.tsx`에서 시작합니다.

## 기술 구성

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 디자인 시안

- `/` — 세 시안 비교 화면
- `/concept-a` — 크림·버건디·차콜의 Warm Editorial 시안
- `/concept-b` — 블랙 우드·화이트 마블의 Private Showroom 시안
- `/concept-c` — 블랙·골드의 Private Advisory Lounge 시안

두 시안의 공통 콘텐츠는 `src/content/site.ts`에서 관리합니다.

## 참고 사이트

- [나비드](https://www.navid2020.com/)
- [렌트모빌링크](https://xn--sm2b84a1ts0i5y3ayed.com/)
- [신차아울렛](https://newcaroutlet.co.kr/#contact)

참고 사이트의 콘텐츠나 디자인을 그대로 복제하지 않고, 담당자 신뢰·서비스 범위·진행 과정·후기·상담 CTA라는 정보 흐름만 참고합니다.

첨부 명함 원본은 `public/reference/usauto-business-card.png`에 보관했습니다.

## 명령어

```bash
npm run dev
npm run lint
npm run build
```
