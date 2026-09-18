export interface EducationItem {
  school: string;
  degree: string;
  duration: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  status: string;
}

export const education: EducationItem[] = [
  {
    school: '中央大学',
    degree: '先進理工学部 電気電子情報通信工学科',
    duration: '2030年卒業予定',
    description:
      '電気・電子・情報通信の基礎を学びながら、クラウドとソフトウェア開発の実践力を高めています。',
  },
];

export const certifications: CertificationItem[] = [
  { name: 'TOEFL iBT', status: '101' },
  { name: '基本情報技術者', status: '取得済み' },
  { name: 'AWS Certified Cloud Practitioner', status: '2026年11月受験予定' },
  { name: '応用情報技術者', status: '2026年11月受験予定' },
  { name: 'AWS Certified Solutions Architect – Associate', status: '2027年3月受験予定' },
];
