# AI 看世足

台灣球迷白話解讀加模型預估的世界盃賽前內容網站。

正式版第一階段已改成 Next.js + TypeScript，包含可 SEO 的單場頁、資料型別、API 端點與管理後台入口。資料目前使用 `lib/data.ts` 的 seed data，之後可替換成資料庫與模型服務。

## 開發

```bash
npm install
npm run dev
```

預設網址：

```text
http://127.0.0.1:3026/
```

## 驗證

```bash
npm run typecheck
npm run build
```

## GitHub Pages 部署

`.github/workflows/deploy-pages.yml` 會在推送到 `main` 後部署，也會每天台灣時間 00:10 自動重建一次。建置時會把 `NEXT_PUBLIC_BOARD_DATE_TW` 設為台灣賽事日；晚上 18:00 後會切到隔天賽事日，首頁「今日焦點賽事」會依 `lib/data.ts` 裡每場賽事的 `matchDateTw` 自動篩選。

## 目前包含

- 首頁賽事看板與焦點賽事
- `/matches/[id]` 單場分析 SEO 頁
- `/groups` 小組晉級與最佳第三名觀察
- `/teams` 球隊資料
- `/admin` 台灣運彩倍率輸入流程
- `/api/matches` 賽事資料 API
- `/api/admin/odds` 倍率 payload 驗證 API
- 響應式正式版設計

## 後續可接

- PostgreSQL / Prisma 資料庫
- 管理者登入與權限
- 台灣運彩倍率人工輸入紀錄
- Python 模型服務
- AI 分析文生成與編輯發布流程
