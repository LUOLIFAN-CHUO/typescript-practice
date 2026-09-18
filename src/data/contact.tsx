export type ContactIcon = 'mail' | 'github' | 'article' | 'linkedin';

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: ContactIcon;
  external?: boolean;
}

export const contact: ContactItem[] = [
  { label: 'Email', value: 'a72228937@gmail.com', href: 'mailto:a72228937@gmail.com', icon: 'mail' },
  { label: 'GitHub', value: 'LUOLIFAN-CHUO', href: 'https://github.com/LUOLIFAN-CHUO', icon: 'github', external: true },
  { label: 'Qiita', value: 'Rikihann', href: 'https://qiita.com/Rikihann', icon: 'article', external: true },
  { label: 'LinkedIn', value: 'Lifan Luo', href: 'https://www.linkedin.com/in/lifan-luo-1b3637411/', icon: 'linkedin', external: true },
];
