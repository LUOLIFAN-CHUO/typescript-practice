import { useEffect, useState } from 'react';
import GoToTopButton from './components/ui/GotoTop';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Navbar } from './components/sections/Navbar';
import { Profile } from './components/sections/Profile';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem('portfolio-theme');
  if (savedTheme) return savedTheme === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function App() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-[#07111f] dark:text-slate-100">
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-60 dark:opacity-30" />
      <div className="pointer-events-none fixed -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-300/30 blur-[120px] dark:bg-blue-500/15" />
      <div className="pointer-events-none fixed -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-teal-300/25 blur-[130px] dark:bg-teal-400/10" />

      <Navbar dark={dark} setDark={setDark} />

      <main id="main-content" className="relative z-10">
        <About />
        <Profile />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <GoToTopButton />
    </div>
  );
}

export default App;
