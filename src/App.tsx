import { useState } from 'react';
import GravitationalWaves from "./components/ui/GravitationalWaves";
import GoToTopButton from "./components/ui/GotoTop";
import { About } from "./components/sections/About";
import { Education } from "./components/sections/Education";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Navbar } from "./components/sections/Navbar";

function App() {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <main className={`min-h-screen relative overflow-hidden 
      ${dark 
        ? "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f766e] text-gray-100" 
        : "bg-gradient-to-br from-[#fafafa] via-[#e3f2fd] to-[#cfd8dc] text-gray-900"}`}
    >
    <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/worn-dots.png')] ${dark ? 'opacity-25' : 'opacity-30'} pointer-events-none`}></div>
    <GravitationalWaves dark={dark} />
    <svg className="absolute -top-32 -left-32 w-[600px] h-[600px] opacity-20 blur-3xl z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill={dark ? "#4ade80" : "#60a5fa"} d="M40.5,-65.5C51.5,-58.6,60.2,-51.5,65.6,-41.9C71.1,-32.4,73.2,-20.4,73.7,-8.3C74.2,3.8,73.1,15.9,67.4,25.4C61.6,35,51.1,41.9,40.2,48.8C29.2,55.6,18,62.4,4.4,67.6C-9.2,72.9,-24.3,76.6,-35.4,70.4C-46.5,64.3,-53.7,48.2,-60.6,33.4C-67.5,18.7,-74.2,5.2,-71.5,-6.3C-68.8,-17.9,-56.6,-27.5,-46.1,-35.9C-35.7,-44.2,-26.9,-51.2,-16.5,-59.6C-6,-68.1,5.8,-78,17.6,-78.5C29.3,-79.1,40.5,-70.5,40.5,-65.5Z" transform="translate(100 100)" />
    </svg>

    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>

    <header className="relative p-6 max-w-7xl mx-auto">
      <Navbar dark={dark} setDark={setDark}/>
    </header>

    {/* About */}

    <About dark={dark} />

    {/* Experience Section */}

    <Experience dark={dark} />

    {/* Education Section */}

    <Education dark={dark}/>

    <Skills dark={dark} activeTab={activeTab} setActiveTab={setActiveTab} />

    {/* Projects */}
    
    
    <Projects dark={dark} />


    {/* Contact Section */}
      
      <Contact />
      
    <GoToTopButton />

</main>
);}

export default App;
