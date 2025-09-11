import React from "react";
import { ExternalLink, Github } from "lucide-react"; // adjust imports
import { projects as projectsData } from "../../data/projects"; // your projects data file

interface ProjectsProps {
  dark: boolean;
}

export function Projects({ dark }: ProjectsProps) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500 dark:text-cyan-300">
        My Projects
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <div
            key={project.title}
            className="flex flex-col rounded-2xl overflow-hidden shadow-xl border border-gray-300 dark:border-white/10 backdrop-blur-md bg-white/80 dark:bg-white/10 hover:scale-[1.02] transform transition duration-300"
          >
            <img
              src={new URL(project.image, import.meta.env.BASE_URL).href}
              alt={project.title}
              className="w-full h-48 object-cover object-top"
            />
            <div className="flex flex-col justify-start h-full p-6">
              <div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    dark ? "text-cyan-500" : "text-gray-500"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm ${
                    dark ? "text-gray-600" : "text-gray-700"
                  } mb-4`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs font-medium px-2 py-1 ${
                        dark
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-800"
                      } rounded-full`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Push buttons to bottom */}
              <div className="mt-auto flex gap-3 pt-4">
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-1.5 text-sm font-medium rounded transition"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                )}
                {project.code_repo && (
                  <a
                    href={project.code_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 text-sm font-medium rounded transition"
                  >
                    <Github size={16} /> Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
