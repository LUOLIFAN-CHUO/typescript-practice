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
