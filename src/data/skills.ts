export type SkillCategoryId = 'cloud' | 'languages' | 'workflow';

export interface SkillItem {
  title: string;
  description: string;
  level: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'cloud',
    label: 'Cloud / DevOps',
    items: [
      { title: 'AWS', description: 'S3、CloudFront、API Gateway、Lambda、DynamoDBを使ったサーバーレス構成', level: '実践中' },
      { title: 'Terraform', description: 'AWSリソースをコードで定義し、変更を再現可能に管理', level: '実践中' },
      { title: 'GitHub Actions', description: 'テスト、ビルド、AWSへのデプロイを自動化', level: '実践中' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { title: 'Python', description: 'boto3を利用したLambda関数と自動テスト', level: '学習中' },
      { title: 'TypeScript', description: '型安全なReactコンポーネントとフロントエンド開発', level: '学習中' },
      { title: 'SQL', description: '基本的なCRUD、集約、テーブル設計を継続学習', level: '学習中' },
    ],
  },
  {
    id: 'workflow',
    label: 'Tools / OS',
    items: [
      { title: 'Git / GitHub', description: '履歴を意識した開発とブランチ・CI/CD運用', level: '実践中' },
      { title: 'Linux / Shell', description: 'CLIでの基本操作とデプロイ作業', level: '学習中' },
      { title: 'HTML / CSS', description: 'レスポンシブでアクセシブルな静的サイト制作', level: '実践中' },
    ],
  },
];

export const learningRecords = [
  { title: 'Python', image: '/images/python-learning.jpg' },
  { title: 'SQL', image: '/images/sql-learning.jpg' },
  { title: 'paiza スキル評価', image: '/images/paiza-level.png' },
];
