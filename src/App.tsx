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
import { RagChatbot } from './components/RagChatbot';
import { journeyExperiences } from './data/journey';
import { JourneyDetailPage } from './pages/JourneyDetailPage';
import { TrendsPage } from './pages/TrendsPage';
import { JourneyTimeline } from './components/sections/JourneyTimeline';
import { projects, projectHref } from './data/projects';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem('portfolio-theme');
  if (savedTheme) return savedTheme === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function App() {
  const [dark, setDark] = useState(getInitialTheme);
  const [route, setRoute] = useState(window.location.hash);
  const showingTrends = route === '#/trends';
  const showingProjects = route === '#/projects';
  const project = projects.find((item) => route === projectHref(item.id));
  const journeyItem = journeyExperiences.find((item) => route === `#/journey/${item.id}`);
  const notFound = route.startsWith('#/') && !showingTrends && !showingProjects && !project && !journeyItem;
  const pageTitle = project?.title ?? journeyItem?.title ?? (showingProjects ? 'プロジェクト' : showingTrends ? 'ITトレンド' : notFound ? 'ページが見つかりません' : 'Web・クラウド・AI ポートフォリオ');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    document.title = `${pageTitle} | ラ・リキハン`;
    if (route.startsWith('#/')) {
      window.scrollTo(0, 0);
      document.getElementById('main-content')?.focus({ preventScroll: true });
    } else if (route) {
      document.getElementById(route.slice(1))?.scrollIntoView({ block: 'start' });
    }
  }, [route, pageTitle]);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-[#07111f] dark:text-slate-100">
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-60 dark:opacity-30" />
      <div className="pointer-events-none fixed -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-blue-300/30 blur-[120px] dark:bg-blue-500/15" />
      <div className="pointer-events-none fixed -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-teal-300/25 blur-[130px] dark:bg-teal-400/10" />

      <Navbar dark={dark} setDark={setDark} />

      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        {project ? (
          <ProjectDetailPage key={project.id} project={project} />
        ) : showingProjects ? (
          <ProjectsPage />
        ) : journeyItem ? (
          <JourneyDetailPage item={journeyItem} />
        ) : showingTrends ? (
          <TrendsPage />
        ) : notFound ? (
          <section className="section-shell min-h-[70vh]"><p className="eyebrow">404</p><h1 className="section-title">ページが見つかりません</h1><p className="section-copy">リンク先をご確認ください。</p><a href="#/projects" className="project-back mt-6">プロジェクト一覧へ戻る</a></section>
        ) : (
          <>
            <About />
            <Projects />
            <section className="section-shell !pt-0" aria-label="履歴タイムライン"><JourneyTimeline /></section>
            <Profile />
            <Experience />
            <Education />
            <Skills />
            <Contact />
          </>
        )}
      </main>

      <GoToTopButton />
      <RagChatbot />
    </div>
  );
}

export default App;
