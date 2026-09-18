# Cloud Resume Challenge — Frontend

ラ・リキハンのクラウドエンジニア向けポートフォリオです。既存のHTML/CSSサイトを、React・TypeScript・Tailwind CSS・Viteを使った型安全なコンポーネント構成へ移行しています。

## Architecture

```text
Browser → CloudFront → S3 (dist/)
   └──── GET /count → API Gateway → Lambda → DynamoDB
```

バックエンドの訪問者カウンターは既存のAPIをそのまま利用します。API URLは `VITE_VISITOR_API_URL` で上書きできます。

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Content structure

- `src/data/`: 履歴書、スキル、プロジェクト、連絡先のデータ
- `src/components/sections/`: ページの各セクション
- `src/components/ui/`: 再利用可能なUI
- `src/services/visitorCounter.ts`: 既存の訪問者カウンターAPI連携
- `public/images/`: ポートフォリオ画像

## Deployment

`main` ブランチへのpushでGitHub Actionsが検証とビルドを行い、`dist/` のみをS3へ同期してCloudFrontキャッシュを更新します。

必要なGitHub Actions Secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
