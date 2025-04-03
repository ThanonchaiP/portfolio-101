"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="py-8">
      <h3 className="mb-10 text-center text-2xl text-slate-100">Projects</h3>

      <motion.div
        className="mx-auto flex max-w-[740px] flex-wrap justify-center gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="w-[320px] overflow-hidden rounded-lg border border-slate-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex h-full flex-col">
              <Image
                src={project.image}
                alt="preview"
                width={320}
                height={150}
                className="h-[150]"
              />

              <div className="flex flex-col gap-2 p-4">
                <h1 className="text-slate-200">{project.title}</h1>
                <p className="text-sm text-slate-400">{project.description}</p>

                <motion.div
                  className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {project.stack.map((stack, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-slate-500 px-2 py-0.5"
                    >
                      {stack}
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className="flex grow items-end gap-4 px-4 pb-4 text-sm text-slate-300">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-slate-200"
                  >
                    <Icon icon="ant-design:github-filled" />
                    GitHub
                  </Link>
                )}
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-slate-200"
                  >
                    <Icon icon="mdi:web" />
                    Demo
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: "Anime Election",
    description:
      "Election66 Thai PBS Clone is a replication of the Thai PBS election results platform, designed to simulate real-time vote counting, candidate information, and election statistics. Built with Next.js, TypeScript, and Tailwind CSS.",
    image: "/image/projects/election.png",
    github: "https://election-frontend.vercel.app/",
    demo: "https://election-frontend.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Portfolio",
    description:
      "A modern and responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS to showcase my skills, projects, and professional experience as a Frontend Developer.",
    image: "/image/projects/portfolio.png",
    demo: "https://election-frontend.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];
