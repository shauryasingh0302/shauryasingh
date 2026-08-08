import { readdirSync } from "node:fs";
import { join } from "node:path";

/** Matches shaurya_resume_05.pdf, shaurya_resume_06.pdf, ... */
const RESUME_PATTERN = /^shaurya_resume_(\d+)\.pdf$/;

export const PUBLIC_DIR = join(process.cwd(), "public");

/**
 * Finds the current resume PDF in public/ — the highest-numbered one, so
 * dropping in shaurya_resume_06.pdf takes over from 05 without touching any
 * config. Sorted numerically, not lexically, so 10 beats 9.
 *
 * @returns {{ name: string, path: string, url: string }}
 */
export function findResumePdf() {
  const matches = readdirSync(PUBLIC_DIR)
    .map((name) => ({ name, match: RESUME_PATTERN.exec(name) }))
    .filter((entry) => entry.match !== null)
    .map((entry) => ({ name: entry.name, n: Number(entry.match[1]) }))
    .sort((a, b) => a.n - b.n);

  const current = matches.at(-1);

  if (!current) {
    // Fail loudly at build rather than shipping a /resume that 404s.
    throw new Error(
      `No resume PDF found in ${PUBLIC_DIR}. Expected a file named like "shaurya_resume_05.pdf".`,
    );
  }

  return {
    name: current.name,
    path: join(PUBLIC_DIR, current.name),
    url: `/${current.name}`,
  };
}
