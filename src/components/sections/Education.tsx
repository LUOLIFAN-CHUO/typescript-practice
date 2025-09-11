import { education, EducationItem } from "../../data/education";

export function Education({ dark }: { dark: boolean }) {
  return (
    <section id="education" className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Education</h2>
      <div className="space-y-6">
        {education.map((item: EducationItem) => (
          <div
            key={item.school}
            className={`group relative p-6 rounded-2xl shadow-md border border-transparent hover:border-purple-400 transition-all duration-300
              ${dark ? "bg-white/10 hover:bg-white/20" : "bg-white hover:bg-gray-100"}`}
          >
            <div className="flex items-center gap-4 mb-2">
              <img src={new URL(item.image, import.meta.env.BASE_URL).href} width="48" height="48" className="rounded-full" alt={`${item.school} logo`} />
              <div>
                <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{item.school}</h3>
                <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-800"}`}>{item.degree}, {item.duration}</p>
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
