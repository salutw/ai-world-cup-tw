import type { Metadata } from "next";
import { AdminConsole } from "@/components/AdminConsole";
import { matches } from "@/lib/data";

export const metadata: Metadata = {
  title: "管理後台",
  description: "AI 看世足資料維護、台灣運彩倍率輸入與模型更新流程。"
};

export default function AdminPage() {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span className="eyebrow">Admin</span>
        <h1>管理後台</h1>
        <p>先建立倍率更新與模型發布流程，之後可接帳號權限、資料庫與排程。</p>
      </div>
      <AdminConsole matches={matches} />
    </main>
  );
}
