import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";// adjust imports
import { skills as skillsData } from "../../data/skills"; // your skills data file

interface SkillsProps {
  dark: boolean;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function Skills({ dark, activeTab, setActiveTab }: SkillsProps) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Skills</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["frontend", "backend", "others"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            className={`capitalize rounded-full px-4 py-2 text-sm font-medium transition ${
              dark
                ? activeTab === tab
                  ? "bg-green-400 text-gray-900"
                  : "border-gray-500 text-gray-300"
                : activeTab === tab
                ? "bg-green-400 text-white"
                : "border-gray-500 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skillsData[activeTab].map((skill) => (
          <Card
            key={skill.title}
            className={`transition transform hover:-translate-y-1 hover:shadow-xl rounded-2xl ${
              dark ? "bg-white/10" : "bg-gray-100"
            }`}
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <img
                src={`${import.meta.env.BASE_URL}${skill.image.replace(/^\//, '')}`}
                alt={skill.title}
                className="w-16 h-16 object-contain rounded-lg shadow-md"
              />
              <h3
                className={`font-semibold text-lg ${
                  dark ? "text-white" : "text-gray-800"
                }`}
              >
                {skill.title}
              </h3>
              <p
                className={`text-sm ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {skill.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
