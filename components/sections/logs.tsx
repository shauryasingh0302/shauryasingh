"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/zippystarter/container";
import { blogPosts } from "@/lib/portfolio-data";
import Link from "next/link";

export function Logs() {
  return (
    <Container
      id="blog"
      className="py-24 border-t border-border max-w-7xl mx-auto"
    >
      <motion.h2
        className="text-4xl font-display mb-12 uppercase"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Achievements & Experience
      </motion.h2>

      <div className="grid gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="#" className="group">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] items-baseline justify-between mb-2">
                <h3 className="text-2xl font-display group-hover:text-primary transition-colors text-balance">
                  {post.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {post.date}{" // "}{post.readTime}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">
                {post.excerpt}
              </p>
              <div className="h-[1px] w-full bg-border group-hover:bg-primary/50 transition-colors"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
