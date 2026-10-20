export interface Project {
  id: string;
  title: string;
  eyebrow: string;
  category: 'ai' | 'cloud';
  featured: boolean;
  visual?: 'resident' | 'cloud';
  coverImage?: { src: string; alt: string; caption?: string };
  gallery?: { src: string; alt: string; caption: string; portrait?: boolean }[];
  architecture?: { src: string; description: string };
  description: string;
  stack: string[];
  role: string;
  accessNote?: string;
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
    accessNote: 'Bootcamp 参加時の開発作品です。アプリ・ソースコードは非公開です。',
    architecture: {
      src: '/architecture/resident-portal.html',
      description: '入居者の質問から緊急度判定・回答生成へ進む流れと、管理側のマニュアル取り込み・FAQ 候補生成を示しています。',
    },
    overview: '入居者が自然な言葉で相談できる AI チャットを実装しました。最初に LLM で質問の緊急度を判定し、通常の質問だけをマニュアルに基づく回答生成へ進めます。回答には資料名・ページ番号・引用とページ画像を添え、情報が見つからない場合や緊急・安全関連の相談では連絡先へ案内します。',
    interactionFlow: [
      { title: '通常の質問：根拠付きで回答する', steps: ['質問を入力', '緊急度を判定', '資料を参照して回答', '根拠ページを確認'], description: '会話の文脈を使いながら質問に答え、回答だけでなく元資料の記載も確認できるようにします。資料に根拠がない場合は推測せず、問い合わせ先へ案内します。' },
      { title: '緊急・安全関連：回答より、連絡を優先する', steps: ['質問を入力', '緊急・安全関連と判定', '回答生成へ進めない', '連絡先を案内'], description: '閉じ込めなどの緊急の相談には操作方法を生成せず、緊急表示と該当する連絡先を表示します。判定と回答生成を分けた二段階の処理です。' },
    ],
    features: [
      { title: '回答と原文を、一緒に確認', description: 'AI の回答に資料名、ページ番号、引用を添えます。根拠ページの画像も開けるため、元の記載に戻って確認できます。' },
      { title: '緊急度に応じて AI の動きを切り替える', description: '回答を生成する前に質問の緊急度を判定。緊急時や危険な設備操作に関わる相談では、回答の代わりに連絡先へ案内します。' },
      { title: '管理する人の業務までつなぐ', description: '管理画面からマニュアルをアップロードすると AI が Q&A 案を自動生成し、担当者が確認してから公開できます。FAQ・お知らせ・連絡先の管理、問い合わせ対応記録と月次集計もまとめています。' },
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
    id: 'ai-news-daily',
    title: 'AI News Daily',
    eyebrow: 'AI news automation · GCP',
    category: 'ai',
    featured: true,
    coverImage: {
      src: '/images/ai-news-daily-web.png',
      alt: 'AI News Daily の HTML 版：出典付きの日本語ニュースと企業評価額の比較グラフ',
      caption: 'Claude が日次で生成する HTML 版の実画面。2026年10月19日号では、AI 業界の動向を出典リンクやグラフとともに掲載しています。クリックで拡大できます。',
    },
    gallery: [
      {
        src: '/images/ai-news-daily-slack.png',
        alt: 'Slack の ai_news_bot が投稿した AI News Daily：日本語のニュース要約、出典リンク、Web 版への導線',
        caption: 'Slack への自動配信の実画面（2026年10月19日号）。ニュースの要約と出典リンクをまとめ、同じ投稿から Web 版も開けます。クリックで拡大できます。',
      },
    ],
    description: '自社内での情報共有に使う AI ニュース配信システム。ニュースを自動収集して毎日 Slack に配信し、GCP 上で Claude による日次の HTML ニュースページも生成しています。',
    stack: ['GCP', 'Claude', 'Slack', 'Cloud Run Jobs', 'Cloud Scheduler', 'Cloud Storage', 'Cloud Tasks'],
    role: '自社内向け開発',
    accessNote: '自社内で利用するシステムのため、アプリ・ソースコードは非公開です。',
    architecture: {
      src: '/architecture/ai-news-daily.html',
      description: 'GCP 上の日次ニュース配信・HTML 生成と、Cloud Tasks を経由する Slack スレッド問答の二つの流れを示しています。',
    },
    overview: '日々更新される AI ニュースを、情報収集から読むところまで一つの流れにまとめるために開発しました。Cloud Scheduler が毎日 07:40（JST）に Cloud Run Job を起動し、Collector・Analyst・Writer が記事の収集、分析・選定、投稿の生成を順に担当します。ニュースは Slack に配信し、HTML 生成を有効にした場合は Claude でページを生成・検証して Cloud Storage に保存。日付別の Web 版でも読めるほか、Slack スレッドからニュースについて質問できます。',
    features: [
      { title: '収集・分析・執筆をつなぐ日次バッチ', description: 'WebSearch / WebFetch でニュースを並列収集し、重複を除去。Collector から Analyst、Writer へ処理をつなぎ、選定した記事を Slack Block Kit の投稿として毎日配信します。' },
      { title: 'Claude による HTML ページの生成', description: 'HTML 生成を有効にすると、Writer の Block Kit をもとに Claude がページを生成・検証します。生成した HTML は Cloud Storage に保存し、HTML Viewer が日付別に配信します。' },
      { title: '出典までたどれるニュース要約', description: 'Slack の投稿と HTML 版に出典リンクを掲載。要約で全体像をつかんだ後、気になったニュースの元記事を確認できます。' },
      { title: 'Slack スレッドで追加質問', description: 'app_mention を受けて、QA Receiver がイベントを検証し Cloud Tasks に登録します。QA Worker がスレッド履歴を取得し、QA Agent が回答を生成して同じスレッドに返信します。' },
    ],
    decisions: [
      { title: '定時起動とバッチ処理を分離', description: 'Cloud Scheduler が起動時刻を管理し、Cloud Run Job が日次バッチを実行する構成です。記事の収集・分析・執筆も役割ごとに分けています。' },
      { title: 'Slack と Web の二つの読み方を用意', description: 'Slack ではニュースの概要を手早く確認し、Web 版では本文や図表を読む構成にしました。Slack の投稿に Web 版へのリンクを添え、続けて読めるようにしています。' },
      { title: '質問の受信と回答処理を分離', description: 'Slack からのイベントは署名を検証してからキューに登録し、event_id で重複を排除します。Cloud Tasks から Worker へは OIDC 付き POST を送り、Worker 側でも確認してから回答処理を進めます。' },
    ],
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
