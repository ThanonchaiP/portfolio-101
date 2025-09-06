"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function WorkExperience() {
  return (
    <div className="py-8">
      <h3 className="mb-10 text-center text-2xl text-slate-100">
        Work Experience
      </h3>

      <div className="mx-auto flex max-w-[744px] flex-col gap-6">
        {workExperience.map((experience, index) => (
          <motion.div
            key={experience.id}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-md shadow-slate-900/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200 md:text-base">
              <div className="flex items-center gap-2">
                <Icon
                  icon="solar:code-linear"
                  className="pb-[2px] text-orange-400"
                  fontSize={20}
                />
                <h4>{experience.title},</h4>
                <h4>{experience.company}</h4>
              </div>
              <p className="text-slate-400">{experience.date}</p>
            </div>
            <div className="ml-2 border-l border-slate-500 pl-11">
              {experience.subtitle && (
                <p className="mb-2 ml-[-26px] text-xs text-slate-400">
                  {experience.subtitle}
                </p>
              )}

              <ul className="nth-[1]:pt-2 list-disc text-xs text-slate-200 marker:text-slate-500 md:text-sm">
                {experience.responsibilities.map((responsibility, idx) => (
                  <motion.li
                    key={idx}
                    className="my-[6px]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    {responsibility}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="ml-[-26px] mt-4 flex flex-wrap gap-2 text-xs text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {experience.stack.map((stack, idx) => (
                  <span
                    key={idx}
                    className="rounded border border-slate-500 px-2 py-0.5"
                  >
                    {stack}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const workExperience = [
  {
    id: 4,
    title: "Frontend Developer",
    company: "FutureSkill",
    date: "June 2025 - Present",
    responsibilities: [
      "Responsible for developing an e-Learning platform using React and Next.js.",
    ],
    stack: ["React.js", "Next.js", "TypeScript"],
  },
  {
    id: 1,
    title: "Frontend Developer",
    company: "Security Pitch",
    date: "April 2023 - June 2025",
    responsibilities: [
      "Develop and maintained scalable web applications using React.js and Next.js.",
      "Develop and maintain core features to enhance functionality and user experience.",
      "Develop interactive data visualization dashboards.",
      "Optimized application performance by reducing unnecessary re-renders.",
      "Implement authentication and authorization systems using JWT and role-based access control.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Docker",
      "Material UI",
      "Ant Design",
      "React Query",
      "Zustand",
    ],
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "FASTFIT SOGOOD",
    date: "May 2022 - Dec 2022",
    responsibilities: [
      `Build a web application "KICKPASS" using React.js.`,
      "Continually develop features for React & TypeScript web application.",
      "Fix issues related to design perfection and responsive layouts.",
      "Optimized application performance by reducing unnecessary re-renders.",
      "Collaborated with team to effectively resolve dependencies.",
    ],
    stack: ["React.js", "TypeScript", "Zustand"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Riseplus Technology",
    date: "Dec 2021 - Mar 2022",
    subtitle: "(Co-operative Internship)",
    responsibilities: [
      `Get the requirement from client, Design user interface and build web applications using Angular.`,
      "Collaborated with cross-functional teams in an Agile/Scrum environment, using Jira for task management.",
    ],
    stack: ["Angular", "TypeScript"],
  },
];
