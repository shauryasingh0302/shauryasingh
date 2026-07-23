"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/zippystarter/container";
import { ProjectImage } from "@/components/project-image";
import { projects } from "@/lib/portfolio-data";
import Link from "next/link";

export function Projects() {
  return (
    <Container
      id="projects"
      component="section"
      wrapperClassName="py-24 border-t border-border"
      className="mx-auto max-w-7xl flex-1"
    >
      <motion.div
        className="grid justify-between items-end mb-16 gap-4"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
            SELECTED
            <br />
            WORKS
          </h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>
        <p className="text-muted-foreground max-w-sm text-left">
          A collection of full-stack, AI-integrated, and production-ready
          applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(3,auto)] gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="grid grid-rows-subgrid row-span-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card
              className="pt-0 group bg-card border-border hover:border-primary/50 transition-all duration-300 rounded-none overflow-hidden grid grid-rows-subgrid row-span-3 content-start items-start h-full"
            >
              <ProjectImage src={project.image} alt={project.title} />
              <div className="grid gap-4">
                <CardHeader className="grid gap-4">
                  <CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </div>
              <CardFooter className="flex justify-between pt-0">
                <Link
                  href={project.link}
                  className="text-sm font-display flex items-center hover:text-primary transition-colors gap-2"
                >
                  LIVE DEMO <ExternalLink className="size-3" />
                </Link>
                <Link
                  href={project.repo}
                  className="text-sm font-display flex items-center hover:text-primary transition-colors gap-2"
                >
                  CODE <Github className="size-3" />
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
