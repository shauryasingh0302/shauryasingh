/**
 * Stamps public/resume.pdf with the document title browsers should display.
 *
 * Why this is needed: /resume rewrites to the PDF, so the URL a viewer sees is
 * "/resume" — and Chrome's PDF viewer derives its toolbar label from the URL,
 * not from Content-Disposition. Left alone it reads "resume". Embedding a
 * /Title plus the /DisplayDocTitle viewer preference overrides that.
 *
 * Runs from `prebuild` and `predev`, and is idempotent — a PDF that already
 * carries the right title is left untouched, so builds don't churn the binary.
 * That means updating the resume is just: drop a new public/resume.pdf in.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { RESUME_PATH, RESUME_TITLE } from "./resume.mjs";

if (!existsSync(RESUME_PATH)) {
  // Fail loudly at build rather than shipping a /resume that 404s.
  throw new Error(`No resume PDF found at ${RESUME_PATH}.`);
}

const pdf = await PDFDocument.load(readFileSync(RESUME_PATH), {
  updateMetadata: false, // don't stamp pdf-lib's own Producer/ModDate
});

if (pdf.getTitle() === RESUME_TITLE) {
  console.log(`resume: title already "${RESUME_TITLE}", skipping`);
} else {
  // showInWindowTitleBar sets /DisplayDocTitle, which is what actually tells a
  // viewer to prefer this title over a name derived from the URL.
  pdf.setTitle(RESUME_TITLE, { showInWindowTitleBar: true });
  writeFileSync(RESUME_PATH, await pdf.save());
  console.log(`resume: stamped title "${RESUME_TITLE}"`);
}
