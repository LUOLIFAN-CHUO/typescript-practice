export interface ExperienceItem {
  organization: string;
  role: string;
  category: string;
  description: string;
  image: string;
}

export const experience: ExperienceItem[] = [
  {
    organization: 'AWS Japan',
    role: 'クラウドインフラ構築実習',
    category: 'インターンシップ',
    description:
      'トランスコスモスの研修プログラムを通じてAWS Japan本社でのインターンシップに参加。アーキテクチャ図を確認し、チュートリアルに沿ってAWS環境を構築する実習を行いました。',
    image: '/images/aws-internship.jpg',
  },
];
