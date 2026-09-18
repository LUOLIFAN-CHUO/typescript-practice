import { useState } from 'react';
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react';
import { navigation, site } from '@/data/site';

interface NavbarProps {
  dark: boolean;
  setDark: (value: boolean) => void;
}

export function Navbar({ dark, setDark }: NavbarProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/75">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="メインナビゲーション">
        <a href="#about" className="group flex items-center gap-3 font-black tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-400 text-sm text-white shadow-lg shadow-blue-500/20">LR</span>
          <span className="hidden sm:block">{site.name}<span className="text-blue-600 dark:text-teal-300">.</span></span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-teal-300">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <a href={site.github} target="_blank" rel="noreferrer" className="hidden rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-teal-300 sm:block" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hidden rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-teal-300 sm:block" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <button type="button" onClick={() => setDark(!dark)} className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10" aria-label={dark ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}>
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button type="button" onClick={() => setMobileNavOpen((open) => !open)} className="rounded-xl p-2 text-slate-700 lg:hidden dark:text-slate-200" aria-expanded={mobileNavOpen} aria-controls="mobile-menu" aria-label="メニューを開閉する">
            {mobileNavOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileNavOpen && (
        <div id="mobile-menu" className="border-t border-slate-200/70 bg-white/95 px-5 py-5 lg:hidden dark:border-white/10 dark:bg-[#07111f]/95">
          <div className="mx-auto grid max-w-6xl gap-1">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)} className="rounded-xl px-4 py-3 font-medium hover:bg-blue-50 dark:hover:bg-white/10">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
