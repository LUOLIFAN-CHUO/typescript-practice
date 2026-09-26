# AI-Powered Cloud Portfolio — Frontend

<<<<<<< HEAD
日本語 | [English](./README.en.md)
=======
AWS上に構築した、求職活動向けの AI 搭載ポートフォリオサイトのフロントエンドです。

This repository contains the frontend of an AI-powered cloud portfolio for job applications.
>>>>>>> 4116a8f (docs: add portfolio architecture diagram)

React、TypeScript、Tailwind CSS、Vite で構築した日本語のクラウド履歴書です。Amazon S3 と CloudFront から配信し、訪問者カウンター、Amazon Bedrock ベースの RAG アシスタント、IT Trends ページを統合しています。

**Demo:** https://dyp8879eswsdu.cloudfront.net/

## システム全体像

[![AI-Powered Cloud Portfolio アーキテクチャ](docs/architecture/AI-Powered-Cloud-Portfolio.png)](docs/architecture/AI-Powered-Cloud-Portfolio.html)

画像をクリックすると、Archify で生成したインタラクティブ版を開けます。このリポジトリは図の `Portfolio UI` を担当します。

## フロントエンドの役割

- React 18 と TypeScript によるコンポーネントベースの履歴書 UI
- Vite による開発サーバーと production build
- Tailwind CSS によるレスポンシブな画面設計
- `GET /count` を利用する型安全な訪問者カウンター
- `POST /ask` を利用する日本語 RAG チャット UI
- 回答、出典、読み込み、タイムアウト、API エラーの表示
- Hacker News・Zenn・Qiita の記事を Gemini で日中英に要約する IT Trends ページ
- ESLint、TypeScript、Vitest による自動検証
- AWS CloudFront + S3 による HTTPS 配信
- API Gateway + Lambda + DynamoDB による訪問者カウンター
- GitHub Actions による CI/CD

<<<<<<< HEAD
## 実行時フロー

```text
Browser → CloudFront → Amazon S3 → React / TypeScript UI
                                  ├─ GET /count → API Gateway → Lambda → DynamoDB
                                  ├─ POST /ask  → API Gateway → Lambda → Bedrock Knowledge Base
                                  └─ IT Trends  → 公開読み取り専用の S3 JSON
```

## 主な構成

```text
src/App.tsx                     ページ全体の構成
src/components/RagChatbot.tsx  履歴書 RAG チャット UI
src/components/VisitorCounter.tsx
                                訪問者カウンター表示
src/services/ragApi.ts          POST /ask の型安全な API クライアント
src/services/visitorCounter.ts  GET /count の型安全な API クライアント
src/components/sections/        Profile、Skills、Projects などの各セクション
src/data/                       表示コンテンツ
```

## ローカル開発
=======
---

## Architecture / アーキテクチャ

The portfolio frontend is served through CloudFront and S3. The React application calls three independent capabilities: visitor counting, AI resume Q&A, and the IT Trends feed.

求職者向け作品集は CloudFront と S3 で配信されます。React アプリケーションは、訪問者カウンター、AI 履歴書 Q&A、IT Trends の 3 つの機能 API / データソースを利用します。

See the [interactive system architecture diagram](docs/architecture/portfolio-architecture.html) for the complete high-level view.

```text
Browser
   ↓
CloudFront + S3 React Portfolio
   ├── Visitor API → Lambda → DynamoDB
   ├── Resume Q&A API → Lambda → Amazon Bedrock RAG
   └── IT Trends page → S3 news.json
```

The diagram intentionally focuses on runtime components and trust boundaries. CI/CD, CloudWatch details, CORS, caching, and error handling are documented as supporting notes rather than additional connection lines.

この図では実行時コンポーネントと信頼境界を中心に示し、CI/CD、CloudWatch、CORS、キャッシュ、エラー処理などの補足情報はカードにまとめています。
>>>>>>> 4116a8f (docs: add portfolio architecture diagram)

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

RAG API の URL は `VITE_RAG_API_URL`、トレンドデータの URL は `VITE_TRENDS_DATA_URL` で変更できます。未設定の場合は本番 URL を使用します。

## IT Trends

履歴書の「最近のIT業界トレンドを見る」から、3 日ごとに更新される IT Trends ページを開けます。記事は情報源・カテゴリーで絞り込みでき、要約表示を日本語・中国語・英語に切り替えられます。

## 品質チェック

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

## 技術スタック

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS
- Vitest / Testing Library
- Amazon S3 / CloudFront
- Amazon API Gateway
- GitHub Actions
- Amazon Bedrock RAG

## セキュリティ方針

- AWS 認証情報、Knowledge Base ID、モデル ARN、システムプロンプトをブラウザへ配置しない
- API レスポンスを実行時に検証し、不正なレスポンスを UI に展開しない
- RAG は単一ターンで、質問や回答をフロントエンドに永続化しない
- 公開用のタイトルとセクションだけを出典として表示する

## 関連リポジトリ

- [rag-practice](https://github.com/LUOLIFAN-CHUO/rag-practice) — RAG API、ナレッジ、Amazon Bedrock インフラ
- [cloud-resume-backend](https://github.com/LUOLIFAN-CHUO/cloud-resume-backend) — 訪問者カウンター API

## アーキテクチャ成果物

- [インタラクティブ HTML](docs/architecture/AI-Powered-Cloud-Portfolio.html)
- [Archify ソース仕様](docs/architecture/AI-Powered-Cloud-Portfolio.architecture.json)
- [PNG プレビュー](docs/architecture/AI-Powered-Cloud-Portfolio.png)
