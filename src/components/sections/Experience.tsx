import { experience, ExperienceItem } from "../../data/experience";

export function Experience({ dark }: { dark: boolean }) {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Experience</h2>
      <div className="space-y-6">
        {experience.map((item: ExperienceItem) => (
          <div
            key={item.company}
            className={`group relative p-6 rounded-2xl shadow-md border border-transparent hover:border-emerald-400 transition-all duration-300
              ${dark ? "bg-white/10 hover:bg-white/20" : "bg-gray-100 hover:bg-white"}`}
          >
            <div className="flex items-center gap-4 mb-2">
              <img src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`} width="48" height="48" className="rounded-full" alt={`${item.company} logo`} />
              <div>
                <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{item.company}</h3>
                <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-800"}`}>{item.role}, {item.duration}</p>
              </div>
            </div>
            <p className={`text-sm mt-2 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out ${dark ? "text-gray-300" : "text-gray-900"}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
