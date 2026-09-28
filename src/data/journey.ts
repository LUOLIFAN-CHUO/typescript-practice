export interface JourneyDeliverable {
  title: string;
  description: string;
  contribution?: string;
  technologies?: string[];
  image?: string;
  imageAlt?: string;
  links?: { label: string; url: string }[];
}

export interface JourneyExperience {
  id: 'aws' | 'salt2' | 'gci';
  type: 'experience';
  label: string;
  title: string;
  summary: string;
  date: string;
  detail: string;
  points: string[];
  deliverables?: JourneyDeliverable[];
  upcoming?: boolean;
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
        weight: 2.65,
        upcoming: true,
        events: [
          {
            id: 'salt2',
            type: 'experience',
            label: 'AI · DEVELOPMENT',
            title: 'SALT2 Bootcamp',
            summary: '約2か月のAI駆動開発。チーム開発と成果発表に取り組む。',
            date: '2026.10–11',
            detail: 'AIを活用しながら実際に手を動かして開発を学ぶ約2か月間のプログラム。約3週間のチーム開発と、計3回の発表会が予定されています。',
            points: ['AI駆動開発', '約3週間のチーム開発', '成果発表'],
            upcoming: true,
          },
          {
            id: 'gci',
            type: 'experience',
            label: '東京大学 松尾・岩澤研究室監修',
            title: 'GCI 2026 Winter',
            summary: 'データ分析・機械学習の演習から、ビジネス課題への提案へ。',
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
