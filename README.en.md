# AI-Powered Cloud Portfolio — Frontend

[日本語](./README.md) | English

A Japanese cloud resume built with React, TypeScript, Tailwind CSS, and Vite. It is delivered through Amazon S3 and CloudFront and integrates both a visitor counter and an Amazon Bedrock-powered RAG assistant.

**Demo:** https://dyp8879eswsdu.cloudfront.net/

## System architecture

[![AI-Powered Cloud Portfolio architecture](docs/architecture/AI-Powered-Cloud-Portfolio.png)](docs/architecture/AI-Powered-Cloud-Portfolio.html)

Click the image to open the interactive Archify diagram. This repository owns the `Portfolio UI` shown in the architecture.

## Frontend responsibilities

- Component-based resume UI built with React 18 and TypeScript
- Vite development server and production build
- Responsive layouts with Tailwind CSS
- Type-safe visitor counter using `GET /count`
- Japanese RAG chat UI using `POST /ask`
- Answer, citation, loading, timeout, and API error states
- Automated checks with ESLint, TypeScript, and Vitest

## Runtime flow

```text
Browser → CloudFront → Amazon S3 → React / TypeScript UI
                                  ├─ GET /count → API Gateway → Lambda → DynamoDB
                                  └─ POST /ask  → API Gateway → Lambda → Bedrock Knowledge Base
```

## Project structure

```text
src/App.tsx                     Overall page composition
src/components/RagChatbot.tsx  Resume RAG chat UI
src/components/VisitorCounter.tsx
                                Visitor-count display
src/services/ragApi.ts          Type-safe POST /ask client
src/services/visitorCounter.ts  Type-safe GET /count client
src/components/sections/        Profile, Skills, Projects, and other sections
src/data/                       Portfolio content
```

## Local development

```powershell
npm install
npm run dev
```

## Quality checks

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

## Technology

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS
- Vitest / Testing Library
- Amazon S3 / CloudFront
- Amazon API Gateway
- GitHub Actions

## Security principles

- Do not place AWS credentials, Knowledge Base IDs, model ARNs, or system prompts in browser code
- Validate API responses at runtime before rendering them
- Keep the RAG interaction single-turn and do not persist questions or answers in the frontend
- Display only public source titles and sections

## Related repositories

- [rag-practice](https://github.com/LUOLIFAN-CHUO/rag-practice) — RAG API, knowledge content, and Amazon Bedrock infrastructure
- [cloud-resume-backend](https://github.com/LUOLIFAN-CHUO/cloud-resume-backend) — visitor-counter API

## Architecture artifacts

- [Interactive HTML](docs/architecture/AI-Powered-Cloud-Portfolio.html)
- [Archify source specification](docs/architecture/AI-Powered-Cloud-Portfolio.architecture.json)
- [PNG preview](docs/architecture/AI-Powered-Cloud-Portfolio.png)
