import { BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import { contact, type ContactIcon } from '@/data/contact';
import { site } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

const icons: Record<ContactIcon, typeof Mail> = {
  mail: Mail,
  github: Github,
  article: BookOpen,
  linkedin: Linkedin,
};

export function Contact() {
  return (
    <footer id="contact" className="relative z-10 border-t border-slate-200/70 dark:border-white/10">
      <div className="section-shell">
        <SectionHeading eyebrow="Get in touch" title="一緒に話しましょう" description="クラウドインフラ、開発、自動化について学び続けています。お気軽にご連絡ください。" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contact.map((item) => {
            const Icon = icons[item.icon];
            return (
              <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} className="glass-card group p-5 transition hover:-translate-y-1 hover:border-blue-300 dark:hover:border-teal-300/40">
                <Icon className="h-6 w-6 text-blue-600 transition group-hover:text-teal-500 dark:text-teal-300" />
                <span className="mt-5 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.label}</span>
                <span className="mt-1 block break-all font-bold text-slate-800 dark:text-slate-100">{item.value}</span>
              </a>
            );
          })}
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-slate-200 pt-7 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Built with React, TypeScript & AWS.</p>
        </div>
      </div>
    </footer>
  );
}
