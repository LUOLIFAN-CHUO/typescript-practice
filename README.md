# WEB Resume

AWS上に構築したWeb履歴書のフロントエンドです。

既存のHTML/CSSベースのWeb履歴書を、
React・TypeScript・Tailwind CSS・Viteを使用した
コンポーネントベースの構成へ移行しました。

AWSのサーバーレスサービスとGitHub Actionsを組み合わせ、
開発・テスト・ビルド・デプロイまでを自動化しています。

## Demo

🌐 https://dyp8879eswsdu.cloudfront.net/

---

## Features

- React + TypeScriptによるWeb履歴書
- Tailwind CSSによるUI構築
- AWS CloudFront + S3によるHTTPS配信
- API Gateway + Lambda + DynamoDBによる訪問者カウンター
- GitHub ActionsによるCI/CD
- ESLintによるコード品質チェック
- TypeScriptによる型チェック
- 自動テスト
- Viteによるビルド
- Amazon Bedrock RAG による履歴書 AI Chatbot

---

## Architecture

```text
                    ┌──────────────┐
                    │    Browser   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  CloudFront  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │      S3      │
                    │   React App  │
                    └──────────────┘


Browser
   │
   │ GET /count
   ▼
┌──────────────┐
│ API Gateway  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Lambda    │
│    Python    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  DynamoDB    │
│ Visitor Count│
└──────────────┘

---

## AI Chatbot

画面右下の「AI に質問」から、候補者のスキル、プロジェクト、経験、勤務可能時間を日本語で質問できます。回答は履歴書の RAG API を根拠に生成され、参照元も表示されます。

RAG API の URL は `VITE_RAG_API_URL` で変更できます。未設定の場合は現在の本番 API を使用します。
