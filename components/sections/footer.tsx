import { Container } from "@/components/zippystarter/container";
import Link from "next/link";

export function Footer() {
  return (
    <Container
      component="footer"
      className="py-8 border-t border-border bg-background text-center max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs font-mono text-muted-foreground">
          © 2025 SHAURYA SINGH. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 text-xs font-mono text-muted-foreground">
          <Link
            href="https://github.com/shauryasingh0302"
            className="hover:text-primary transition-colors"
          >
            GITHUB
          </Link>
          <Link
            href="https://linkedin.com/in/shauryasingh0302"
            className="hover:text-primary transition-colors"
          >
            LINKEDIN
          </Link>
          <Link
            href="mailto:shauryasingh0302@icloud.com"
            className="hover:text-primary transition-colors"
          >
            EMAIL
          </Link>
        </div>
      </div>
    </Container>
  );
}
