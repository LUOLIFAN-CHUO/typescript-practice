import { about } from "../../data/about";

export function About({ dark }: { dark: boolean }) {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className={`${dark ? "bg-white/10" : "bg-gray-200/70"} p-8 rounded-2xl backdrop-blur-xl shadow-xl space-y-4`}>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{about.name}</h2>
        <p className={`text-xl ${dark ? "text-blue-400" : "text-blue-600"}`}>{about.title}</p>
        <p className={`text-base ${dark ? "text-gray-100" : "text-gray-800"}`}>{about.description}</p>
      </div>
      <img src={`${import.meta.env.BASE_URL}${about.image.replace(/^\//, '')}`} alt="Developer illustration" className="w-80 mx-auto hidden md:block" />
    </section>
  );
}
