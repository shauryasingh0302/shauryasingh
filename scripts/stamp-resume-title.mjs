/**
 * Stamps the current resume PDF with its own filename as the document title.
 *
 * Why this is needed: /resume rewrites to the PDF, so the URL a viewer sees is
 * "/resume" — and Chrome's PDF viewer derives its toolbar label from the URL,
 * not from Content-Disposition. Left alone it reads "resume". Embedding a
 * /Title plus the /DisplayDocTitle viewer preference overrides that, and this
 * script keeps the embedded title in sync with whatever PDF is current.
 *
 * Runs from `prebuild` and `predev`, and is idempotent — a PDF that already
 * carries the right title is left untouched, so builds don't churn the binary.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { findResumePdf } from "./resume-file.mjs";

const resume = findResumePdf();

const pdf = await PDFDocument.load(readFileSync(resume.path), {
  updateMetadata: false, // don't stamp pdf-lib's own Producer/ModDate
});

if (pdf.getTitle() === resume.name) {
  console.log(`resume: ${resume.name} title already set, skipping`);
} else {
  // showInWindowTitleBar sets /DisplayDocTitle, which is what actually tells a
  // viewer to prefer this title over a name derived from the URL.
  pdf.setTitle(resume.name, { showInWindowTitleBar: true });
  writeFileSync(resume.path, await pdf.save());
  console.log(`resume: stamped ${resume.name} with title "${resume.name}"`);
}
