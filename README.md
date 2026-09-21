# AI-Powered Cloud Portfolio — Frontend

日本語 | [English](./README.en.md)

React、TypeScript、Tailwind CSS、Vite で構築した日本語のクラウド履歴書です。Amazon S3 と CloudFront から配信し、訪問者カウンターと Amazon Bedrock ベースの RAG アシスタントを統合しています。

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
- ESLint、TypeScript、Vitest による自動検証

## 実行時フロー

```text
Browser → CloudFront → Amazon S3 → React / TypeScript UI
                                  ├─ GET /count → API Gateway → Lambda → DynamoDB
                                  └─ POST /ask  → API Gateway → Lambda → Bedrock Knowledge Base
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

```powershell
npm install
npm run dev
```

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
