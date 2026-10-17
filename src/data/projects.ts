export interface Project {
  id: string;
  title: string;
  eyebrow: string;
  category: 'ai' | 'cloud';
  featured: boolean;
  visual?: 'resident' | 'cloud';
  coverImage?: { src: string; alt: string; caption?: string };
  gallery?: { src: string; alt: string; caption: string; portrait?: boolean }[];
  description: string;
  stack: string[];
  role: string;
  overview: string;
  interactionFlow?: { title: string; steps: string[]; description: string }[];
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
    coverImage: {
      src: '/images/resident-portal-emergency.png',
      alt: 'AI チャットがエレベーターの閉じ込めを緊急と判定し、電話窓口へ案内する実画面',
      caption: '実際の AI チャット画面。「エレベーターに閉じ込められた」という質問に、操作方法を生成せず、緊急表示と防災センターへの連絡を案内しています。物件名と電話番号のみマスクしています。クリックで拡大できます。',
    },
    gallery: [
      { src: '/images/resident-portal-questions.png', alt: 'Resident Portal の管理画面：質問履歴と対応待ちの一覧', caption: 'AI だけでは解決できない質問や緊急・安全関連の相談を、管理担当者が確認する画面。物件名・担当者名・質問本文はマスクしています。' },
      { src: '/images/resident-portal-statistics.png', alt: '月次集計画面：質問件数と自己解決率', caption: '質問件数と自己解決率を月別に表示する実画面。サンプルデータを含む開発時の画面であり、運用成果を示す数値ではありません。' },
      { src: '/images/resident-portal-mobile.png', alt: 'スマートフォンで表示した連絡先一覧', caption: '360px 幅の実際のブラウザー画面。平日・夜間休日・緊急の窓口を分け、電話へ進める構成です。物件名・テナント名・電話番号はマスクしています。', portrait: true },
    ],
    description: 'マニュアルに基づく AI チャットと、質問の緊急度判定を備えた入居者ポータル。通常の質問には根拠付きで回答し、緊急時は回答生成から連絡先の案内へ切り替えます。',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Claude', 'Vercel'],
    role: '個人開発 · SALT2 Bootcamp',
    overview: '入居者が自然な言葉で相談できる AI チャットを実装しました。最初に LLM で質問の緊急度を判定し、通常の質問だけをマニュアルに基づく回答生成へ進めます。回答には資料名・ページ番号・引用とページ画像を添え、情報が見つからない場合や緊急・安全関連の相談では連絡先へ案内します。',
    interactionFlow: [
      { title: '通常の質問：根拠付きで回答する', steps: ['質問を入力', '緊急度を判定', '資料を参照して回答', '根拠ページを確認'], description: '会話の文脈を使いながら質問に答え、回答だけでなく元資料の記載も確認できるようにします。資料に根拠がない場合は推測せず、問い合わせ先へ案内します。' },
      { title: '緊急・安全関連：回答より、連絡を優先する', steps: ['質問を入力', '緊急・安全関連と判定', '回答生成へ進めない', '連絡先を案内'], description: '閉じ込めなどの緊急の相談には操作方法を生成せず、緊急表示と該当する連絡先を表示します。判定と回答生成を分けた二段階の処理です。' },
    ],
    features: [
      { title: '回答と原文を、一緒に確認', description: 'AI の回答に資料名、ページ番号、引用を添えます。根拠ページの画像も開けるため、元の記載に戻って確認できます。' },
      { title: '緊急度に応じて AI の動きを切り替える', description: '回答を生成する前に質問の緊急度を判定。緊急時や危険な設備操作に関わる相談では、回答の代わりに連絡先へ案内します。' },
      { title: '管理する人の業務までつなぐ', description: '資料の取り込みと公開、FAQ・お知らせ・連絡先の管理、問い合わせ対応記録と月次集計を管理画面にまとめています。' },
    ],
    decisions: [
      { title: '資料の規模に合わせた全文参照', description: '対象のマニュアルが数十ページに収まるため、ベクトル検索ではなく、公開中の資料全文をモデルに渡して根拠ページを選ぶ構成を採用しました。' },
      { title: '判定と回答を分ける', description: '緊急度の判定と回答生成を別の処理に分け、危険な質問を通常の回答フローに進めないようにしています。モデルの構造化出力は Zod で検証します。' },
      { title: '質問に含まれる情報への配慮', description: '電話番号やメールアドレスなどの一部情報を、モデルへの送信前と記録前に伏せる処理を設けています。' },
    ],
    publicationNote: '実機スクリーンショットの物件名・テナント名・担当者名・電話番号・質問本文は、必要な箇所をマスクしています。操作用 URL・QR コードや原マニュアルの画像は掲載していません。',
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
