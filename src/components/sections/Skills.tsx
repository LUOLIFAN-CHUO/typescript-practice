import { useState } from 'react';
import { Code2, Layers3 } from 'lucide-react';
import { learningRecords, skillCategories, type SkillCategoryId } from '@/data/skills';
import { assetUrl } from '@/lib/utils';
import { ImageDialog } from '@/components/ui/ImageDialog';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategoryId>('cloud');
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);
  const activeCategory = skillCategories.find((category) => category.id === activeTab) ?? skillCategories[0];

  return (
    <section id="skills" className="section-shell">
      <SectionHeading eyebrow="Skills" title="技術スタックと学習記録" description="クラウドを中心に、バックエンドとフロントエンドを横断して学習しています。" />

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="スキルカテゴリー">
        {skillCategories.map((category) => (
          <button key={category.id} type="button" role="tab" aria-selected={activeTab === category.id} onClick={() => setActiveTab(category.id)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${activeTab === category.id ? 'bg-slate-950 text-white shadow-lg dark:bg-teal-300 dark:text-slate-950' : 'border border-slate-300 bg-white/50 text-slate-600 hover:border-blue-400 dark:border-white/15 dark:bg-white/5 dark:text-slate-300'}`}>
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {activeCategory.items.map((skill, index) => (
          <article key={skill.title} className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-100 font-black text-blue-700 dark:bg-teal-300/10 dark:text-teal-300">{index === 0 ? <Layers3 className="h-5 w-5" /> : <Code2 className="h-5 w-5" />}</div>
              <span className="tag">{skill.level}</span>
            </div>
            <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">{skill.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{skill.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-black text-slate-950 dark:text-white">paiza 学習記録</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300">PythonとSQLを中心に、アルゴリズム問題を通じて実践的なコーディング力を継続して強化しています。</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {learningRecords.map((record) => (
            <button key={record.title} type="button" onClick={() => setExpandedImage({ src: record.image, alt: record.title })} className="group glass-card overflow-hidden p-3 text-left">
              <img src={assetUrl(record.image)} alt={`${record.title} 学習記録`} className="h-40 w-full rounded-2xl object-cover object-top transition duration-300 group-hover:scale-[1.02]" />
              <span className="block px-2 pb-2 pt-4 font-bold text-slate-800 dark:text-slate-100">{record.title}</span>
            </button>
          ))}
        </div>
      </div>
      {expandedImage && <ImageDialog src={expandedImage.src} alt={expandedImage.alt} onClose={() => setExpandedImage(null)} />}
    </section>
  );
}
