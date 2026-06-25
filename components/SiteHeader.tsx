import Link from "next/link";

const navItems = [
  { href: "/", label: "賽事看板" },
  { href: "/history", label: "模型戰績" },
  { href: "/groups", label: "小組晉級" },
  { href: "/teams", label: "球隊資料" },
  { href: "/admin", label: "管理後台" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="AI 看世足首頁">
        <span className="brand-mark" aria-hidden="true">
          AI
        </span>
        <span>
          <strong>AI 看世足</strong>
          <small>台灣球迷的賽前數據懶人包</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="主要導覽">
        {navItems.map((item) => (
          <Link className="nav-link" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
