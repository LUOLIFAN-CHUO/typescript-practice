export interface Project {
  id: string;
  title: string;
  eyebrow: string;
  category: 'ai' | 'cloud';
  featured: boolean;
  visual?: 'resident' | 'cloud';
  coverImage?: { src: string; alt: string };
  gallery?: { src: string; alt: string; caption: string }[];
  description: string;
  stack: string[];
  role: string;
  overview: string;
  features: { title: string; description: string }[];
  decisions: { title: string; description: string }[];
  publicationNote?: string;
  journeyId?: string;
  liveLink?: string;
  articleLink?: string;
  repositoryLink?: string;
}

export const projects: Project[] = [
  {
    id: 'resident-portal',
    title: 'Resident Portal',
    eyebrow: 'AI application · Full stack',
    category: 'ai',
    featured: true,
    visual: 'resident',
    description: 'ビルのマニュアルを、質問できるサービスへ。根拠を確認できる AI 回答と、管理者の問い合わせ対応をつなぐ入居者ポータルです。',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Claude', 'Vercel'],
    role: '個人開発 · SALT2 Bootcamp',
    overview: '入居者がビルの利用ルールや設備について知りたいとき、マニュアルのどこを読めばよいか分からない。自分の言葉で質問し、回答の根拠まで確認できる入口と、管理会社が情報を維持・更新する画面を実装しました。',
    features: [
      { title: '回答と原文を、一緒に確認', description: 'AI の回答に資料名、ページ番号、引用を添えます。根拠ページの画像も開けるため、元の記載に戻って確認できます。' },
      { title: '緊急・安全関連の相談を分流', description: '回答を生成する前に質問の緊急度を判定。緊急時や危険な設備操作に関わる相談では、回答の代わりに連絡先へ案内します。' },
      { title: '管理する人の業務までつなぐ', description: '資料の取り込みと公開、FAQ・お知らせ・連絡先の管理、問い合わせ対応記録と月次集計を管理画面にまとめています。' },
    ],
    decisions: [
      { title: '資料の規模に合わせた全文参照', description: '対象のマニュアルが数十ページに収まるため、ベクトル検索ではなく、公開中の資料全文をモデルに渡して根拠ページを選ぶ構成を採用しました。' },
      { title: '判定と回答を分ける', description: '緊急度の判定と回答生成を別の処理に分け、危険な質問を通常の回答フローに進めないようにしています。モデルの構造化出力は Zod で検証します。' },
      { title: '質問に含まれる情報への配慮', description: '電話番号やメールアドレスなどの一部情報を、モデルへの送信前と記録前に伏せる処理を設けています。' },
    ],
    publicationNote: '資料・個人情報の保護のため、公開できる機能概要と概念図に限定して紹介しています。操作用リンクや原資料は公開していません。',
    journeyId: 'salt2',
  },
  {
    id: 'cloud-resume',
    title: 'Cloud Resume Challenge',
    eyebrow: 'Serverless portfolio on AWS',
    category: 'cloud',
    featured: true,
    visual: 'cloud',
    description: 'AWS 上で公開するクラウド履歴書。訪問者カウンターと、履歴書の知識に基づいて答える AI アシスタントを統合しています。',
    stack: ['React', 'TypeScript', 'AWS', 'Python', 'Terraform', 'GitHub Actions'],
    role: '個人開発',
    gallery: [{ src: '/images/cloud-portfolio-architecture.png', alt: 'CloudFront、S3、RAG API、Bedrock、訪問者カウンターのシステム構成図', caption: '静的配信・AI 問答・訪問者カウンターの全体構成。クリックで拡大できます。' }],
    overview: 'この Web 履歴書そのものを、クラウド開発の実践の場にしています。静的サイトの配信から API、データ保存、履歴書の知識に基づく AI 問答までを AWS 上でつなぎました。',
    features: [
      { title: 'クラウドから配信する履歴書', description: 'React と TypeScript の画面を S3 と CloudFront から配信。レスポンシブな履歴書とプロジェクト紹介を届けます。' },
      { title: '訪問者数を原子的に更新', description: 'API Gateway、Python Lambda、DynamoDB を使い、同時アクセスでも更新が競合しない訪問者カウンターを実装しています。' },
      { title: '履歴書の内容を AI に質問', description: 'Amazon Bedrock Knowledge Bases と Nova Lite を利用し、公開用の履歴書資料に基づく日本語の回答と出典を返します。' },
    ],
    decisions: [
      { title: '機能ごとに API と Lambda を分離', description: '訪問者カウンターと AI 問答をそれぞれ独立した経路にし、役割と権限を分けています。' },
      { title: '構築と検証を再現できるように', description: 'Terraform でインフラを定義。フロントエンドとバックエンドのテスト、GitHub Actions によるビルド・デプロイを組み合わせています。' },
    ],
    liveLink: 'https://dyp8879eswsdu.cloudfront.net/',
    articleLink: 'https://qiita.com/Rikihann',
    repositoryLink: 'https://github.com/LUOLIFAN-CHUO/typescript-practice',
  },
];

export const projectCategories = [
  { id: 'all', label: 'すべて' },
  { id: 'ai', label: 'AI アプリケーション' },
  { id: 'cloud', label: 'クラウド' },
] as const;

export const projectHref = (id: string) => `#/projects/${id}`;
