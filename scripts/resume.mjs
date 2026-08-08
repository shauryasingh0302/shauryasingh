import { join } from "node:path";

/**
 * Single source of truth for the resume. Updating the resume means replacing
 * public/resume.pdf and nothing else — the route, the download name and the
 * embedded PDF title all read from here.
 */
export const RESUME_TITLE = "Shaurya Singh - Resume";

/** Public URL of the raw file, and the rewrite target for /resume. */
export const RESUME_URL = "/resume.pdf";

/** Name the browser uses when the viewer saves or downloads the file. */
export const RESUME_DOWNLOAD_NAME = `${RESUME_TITLE}.pdf`;

export const RESUME_PATH = join(process.cwd(), "public", "resume.pdf");
