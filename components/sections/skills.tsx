"use client";

import { motion } from "framer-motion";
import { Code2, Database, Cpu, Terminal } from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import { skills } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <Container
      id="skills"
      component="section"
      wrapperClassName="py-24 bg-secondary/20 border-t border-border"
      className="mx-auto max-w-7xl flex-1"
    >
      <div className="grid md:grid-cols-12 gap-12">
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl font-display tracking-tighter mb-6">
            TECH_STACK
          </h2>
          <p className="text-muted-foreground mb-8">
            My preferred weapons of choice for building digital products.
            Always learning, always evolving.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Code2 className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">CLEAN_CODE</span>
            </div>
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Database className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">SCALABLE_DB</span>
            </div>
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Cpu className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">GEN_AI</span>
            </div>
            <div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
              <Terminal className="h-8 w-8 mb-2 text-primary" />
              <span className="font-mono text-xs">RAG_PIPELINES</span>
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              className="space-y-4"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-display border-b border-primary/30 pb-2 inline-block">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2.5">
                {skillGroup.items.map((skill, sIdx) => (
                  <motion.li
                    key={sIdx}
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.1 + sIdx * 0.06, ease: "easeOut" }}
                  >
                    {/* Brand icon */}
                    <span className="flex-shrink-0 size-5 flex items-center justify-center">
                      {skill.customSvg ? (
                        /* Pinecone custom SVG */
                        <svg width="18" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 group-hover:opacity-100 transition-opacity">
                          <path d="M50 8 L62 32 L75 28 L63 50 L78 48 L58 72 L65 70 L50 92 L35 70 L42 72 L22 48 L37 50 L25 28 L38 32 Z" fill="currentColor" className="text-muted-foreground group-hover:text-foreground transition-colors" />
                          <rect x="44" y="88" width="12" height="10" rx="3" fill="currentColor" className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </svg>
                      ) : (
                        <img
                          src={`https://cdn.simpleicons.org/${skill.icon}`}
                          alt={skill.name}
                          width={18}
                          height={18}
                          className={`object-contain opacity-70 group-hover:opacity-100 transition-opacity ${
                            skill.invertDark ? "dark:invert" : ""
                          }`}
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
