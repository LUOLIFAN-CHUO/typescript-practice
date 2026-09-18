import { useState } from 'react';
import { Building2, Expand, MapPin } from 'lucide-react';
import { experience } from '@/data/experience';
import { assetUrl } from '@/lib/utils';
import { ImageDialog } from '@/components/ui/ImageDialog';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Experience() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <section id="experience" className="section-shell">
      <SectionHeading eyebrow="Experience" title="実践から学んだこと" description="技術を知識で終わらせず、実際の環境で構築して理解することを大切にしています。" />
      {experience.map((item) => (
        <article key={item.organization} className="glass-card grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <button type="button" className="group relative min-h-72 overflow-hidden text-left" onClick={() => setExpandedImage(item.image)} aria-label="AWS Japan インターンシップ写真を拡大する">
            <img src={assetUrl(item.image)} alt="AWS Japan インターンシップ参加者" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg"><Expand className="h-5 w-5" /></span>
          </button>
          <div className="p-7 sm:p-10">
            <span className="tag">{item.category}</span>
            <h3 className="mt-6 text-3xl font-black text-slate-950 dark:text-white">{item.organization}</h3>
            <p className="mt-2 text-lg font-bold text-blue-600 dark:text-teal-300">{item.role}</p>
            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{item.description}</p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" /> AWS Japan</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> 東京</span>
            </div>
          </div>
        </article>
      ))}
      {expandedImage && <ImageDialog src={expandedImage} alt="AWS Japan インターンシップ参加者" onClose={() => setExpandedImage(null)} />}
    </section>
  );
}
