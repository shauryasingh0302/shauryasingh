import { Container } from "@/components/zippystarter/container";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Footer() {
  return (
    <Container
      component="footer"
      className="py-8 border-t border-border bg-background text-center max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs font-mono text-muted-foreground">
          © 2026 SHAURYA SINGH. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 text-xs font-mono text-muted-foreground">
          <MagneticButton strength={0.2}>
            <Link
              href="https://github.com/shauryasingh0302"
              className="hover:text-primary transition-colors block py-2"
            >
              GITHUB
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="https://linkedin.com/in/shauryasingh0302"
              className="hover:text-primary transition-colors block py-2"
            >
              LINKEDIN
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="mailto:shauryasingh0302@icloud.com"
              className="hover:text-primary transition-colors block py-2"
            >
              EMAIL
            </Link>
          </MagneticButton>
        </div>
      </div>
    </Container>
  );
}
