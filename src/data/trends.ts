import type { TrendFeed } from '@/types/trends';

export const mockTrendFeed: TrendFeed = {
  generatedAt: '2026-09-22T08:00:00+09:00',
  items: [
    {
      id: 'zenn-serverless-small-start',
      source: 'zenn',
      title: 'AWS serverless アプリケーションを小さく始めるための設計',
      url: 'https://zenn.dev/',
      publishedAt: '2026-09-21T09:00:00+09:00',
      category: 'Cloud',
      tags: ['AWS', 'Serverless'],
      summary: {
        ja: 'Lambda とマネージドサービスを組み合わせ、構成を小さく始めて段階的に拡張する方法を紹介します。',
        zh: '文章介绍如何组合 Lambda 与托管服务，从小型架构开始并逐步扩展。',
        en: 'The article explains how to combine Lambda and managed services, starting small and scaling gradually.',
      },
    },
    {
      id: 'hn-small-model-building-blocks',
      source: 'hacker-news',
      title: 'Small models are becoming useful building blocks',
      url: 'https://news.ycombinator.com/',
      publishedAt: '2026-09-20T16:30:00Z',
      category: 'AI',
      tags: ['AI', 'LLM'],
      summary: {
        ja: '小型モデルを製品に組み込む際の速度、コスト、品質のバランスについて議論しています。',
        zh: '内容讨论了将小型模型集成到产品时，速度、成本和质量之间的平衡。',
        en: 'The discussion examines the balance between speed, cost, and quality when embedding small models into products.',
      },
    },
    {
      id: 'qiita-typescript-data-design',
      source: 'qiita',
      title: 'TypeScript プロジェクトの保守性を高めるデータ設計',
      url: 'https://qiita.com/',
      publishedAt: '2026-09-19T12:00:00+09:00',
      category: 'Web',
      tags: ['TypeScript', 'Frontend'],
      summary: {
        ja: '型定義を中心に API と UI の境界を整理し、変更範囲を小さく保つ実践例を紹介します。',
        zh: '文章通过类型定义整理 API 与 UI 的边界，展示如何缩小功能变更的影响范围。',
        en: 'The article uses type definitions to clarify API and UI boundaries and keep the impact of changes small.',
      },
    },
  ],
};
