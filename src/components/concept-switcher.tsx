import Link from "next/link";

type ConceptSwitcherProps = {
  active: "a" | "b" | "c";
  tone?: "light" | "dark";
};

export function ConceptSwitcher({
  active,
  tone = "light",
}: ConceptSwitcherProps) {
  return (
    <nav className={`concept-switcher concept-switcher-${tone}`} aria-label="시안 전환">
      <Link className="concept-home-link" href="/">
        시안 목록
      </Link>
      <div>
        <Link aria-current={active === "a" ? "page" : undefined} href="/concept-a">
          A
        </Link>
        <Link aria-current={active === "b" ? "page" : undefined} href="/concept-b">
          B
        </Link>
        <Link aria-current={active === "c" ? "page" : undefined} href="/concept-c">
          C
        </Link>
      </div>
    </nav>
  );
}
