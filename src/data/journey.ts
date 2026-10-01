export interface JourneyDeliverable {
  title: string;
  description: string;
  contribution?: string;
  technologies?: string[];
  image?: string;
  imageAlt?: string;
  links?: { label: string; url: string }[];
}

export interface JourneyProgram {
  sprints: { title: string; context: string; description: string }[];
  phases: { name: string; description: string }[];
}

export interface JourneyExperience {
  id: 'aws' | 'mikke' | 'salt2' | 'gci';
  type: 'experience';
  label: string;
  title: string;
  summary: string;
  date: string;
  detail: string;
  points: string[];
  pointsHeading?: string;
  program?: JourneyProgram;
  deliverables?: JourneyDeliverable[];
  upcoming?: boolean;
  featured?: boolean;
}

export interface JourneyMilestone {
  type: 'milestone';
  title: string;
  summary: string;
}

export type JourneyEvent = JourneyExperience | JourneyMilestone;

export interface JourneyMonth {
  month: string;
  weight: number;
  upcoming?: boolean;
  events: JourneyEvent[];
}

export interface JourneyYear {
  year: string;
  months: JourneyMonth[];
}

export const journey: JourneyYear[] = [
  {
    year: '2026',
    months: [
      {
        month: '04月',
        weight: 1.1,
        events: [{ type: 'milestone', title: '中央大学 入学', summary: '先進理工学部 電気電子情報通信工学科' }],
      },
      {
        month: '08月',
        weight: 1.35,
        events: [{
          id: 'aws',
          type: 'experience',
          label: 'CLOUD · INTERNSHIP',
          title: 'AWS Japan インターンシップ',
          summary: 'AWS環境の構築実習を通して、クラウドインフラに触れる。',
          date: '2026.08',
          detail: 'トランスコスモスの研修プログラムを通じてAWS Japan本社でのインターンシップに参加。アーキテクチャ図を確認し、チュートリアルに沿ってAWS環境を構築しました。',
          points: ['アーキテクチャ図の確認', 'AWS環境の構築実習'],
        }],
      },
      {
        month: '09月',
        weight: 1.05,
        events: [{ type: 'milestone', title: '基本情報技術者', summary: '資格取得' }],
      },
      {
        month: '10月',
        weight: 3.35,
        upcoming: true,
        events: [
          {
            id: 'mikke',
            type: 'experience',
            label: 'エンジニアインターン',
            title: 'ミッケ株式会社',
            summary: 'データマーケティング領域のプロダクト開発に参画予定。',
            date: '2026.10.08〜',
            detail: '2026年10月8日からエンジニアインターンとして勤務予定。募集要項では、データマーケティングに関わる社内プロダクトやダッシュボードの設計・開発が業務として挙げられています。実際に担当した内容は開始後に更新します。',
            pointsHeading: '募集要項に記載された業務領域',
            points: ['数理モデルを用いた社内プロダクト開発', 'ダッシュボードの設計・開発', 'チームでの開発'],
            upcoming: true,
            featured: true,
          },
          {
            id: 'salt2',
            type: 'experience',
            label: 'AI · DEVELOPMENT',
            title: 'SALT2 Bootcamp',
            summary: 'AI駆動開発・チーム開発・成果発表。',
            date: '2026.10–11',
            detail: '実際の業務課題を題材に、個人でのWebアプリ開発、チーム開発、AIエージェント構築へと進む約2か月間のプログラム。各Sprintで学習から設計・実装・レビュー・発表まで取り組み、任意の発展課題ではAI開発環境の自作も扱います。',
            points: ['AI駆動開発', 'チームでの設計・実装', 'レビューと成果発表'],
            program: {
              sprints: [
                {
                  title: 'Sprint 1｜個人開発',
                  context: '不動産 · 入居者ポータル',
                  description: 'LLMのStructured Outputで曖昧な問い合わせを整理し、入居者の自己解決を支援するポータルを構築。VercelとSupabaseで公開する。',
                },
                {
                  title: 'Sprint 2｜チーム開発',
                  context: 'コンサルティング · 議事録管理',
                  description: '会議記録から決定事項・検討事項・タスクを整理するアプリをチームで開発。設計・実装・レビュー・テストを経てAWSへデプロイする。',
                },
                {
                  title: 'Sprint 3｜AIエージェント',
                  context: '総合商社 · 引合書整理',
                  description: '形式の異なる引合書類を読み取り、品目一覧へ整理するAIエージェントを構築。担当者が出力を確認できる流れも設計する。',
                },
                {
                  title: 'Sprint 4｜開発環境の自作（任意）',
                  context: 'Claude Code · 開発を支える仕組み',
                  description: '自分の開発で感じた課題をもとに、Skills・サブエージェント・Rules・Hooksなどから仕組みを選び、開発環境を自作する。',
                },
              ],
              phases: [
                { name: 'Learn', description: '題材と必要な基礎知識を学ぶ' },
                { name: 'Design', description: 'AIと対話しながら設計書を作る' },
                { name: 'Build', description: '小さな単位で実装・レビューを重ねる' },
                { name: 'Review', description: 'コードを自分で確認し、理解を深める' },
                { name: 'Presentation', description: '成果とコードを自分の言葉で伝える' },
              ],
            },
            upcoming: true,
          },
          {
            id: 'gci',
            type: 'experience',
            label: '東京大学 松尾・岩澤研究室監修',
            title: 'GCI 2026 Winter',
            summary: '松尾・岩澤研究室監修のデータ分析・事業提案。',
            date: '2026.10',
            detail: 'データサイエンスを通じてAIの基礎を学ぶ講座。Pythonによるデータ分析や機械学習の演習に取り組み、最終課題ではデータに基づく事業提案を目指します。',
            points: ['Python・データ分析', '機械学習の演習', '事業提案の最終課題'],
            upcoming: true,
          },
        ],
      },
    ],
  },
];

export const journeyExperiences = journey.flatMap((year) => year.months.flatMap((month) => month.events))
  .filter((event): event is JourneyExperience => event.type === 'experience');
