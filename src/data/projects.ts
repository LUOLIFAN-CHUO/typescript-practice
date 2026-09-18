export interface Project {
  title: string;
  eyebrow: string;
  image: string;
  description: string;
  stack: string[];
  liveLink?: string;
  articleLink?: string;
}

export const projects: Project[] = [
  {
    title: 'Cloud Resume Challenge',
    eyebrow: 'Serverless portfolio on AWS',
    image: '/images/architecture.png',
    description:
      'S3とCloudFrontによる静的ホスティング、API Gateway・Lambda・DynamoDBによる訪問者カウンター、TerraformとGitHub Actionsによるテスト・デプロイを組み合わせたクラウド履歴書です。',
    stack: ['React', 'TypeScript', 'AWS', 'Python', 'Terraform', 'GitHub Actions'],
    liveLink: 'https://dyp8879eswsdu.cloudfront.net/',
    articleLink: 'https://qiita.com/Rikihann',
  },
];
