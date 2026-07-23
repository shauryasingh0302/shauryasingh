"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/zippystarter/container";

export function Contact() {
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  return (
    <Container id="contact" className="py-24 bg-card border-t border-border">
      <motion.div
        className="max-w-2xl justify-self-center"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display mb-4">INITIATE_CONTACT</h2>
          <p className="text-muted-foreground">
            Have a project in mind, an internship opening, or a role to
            discuss? Send a signal.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const json: Record<string, string> = {};
            data.forEach((value, key) => { json[key] = value.toString(); });
            json._captcha = "false";
            json._template = "table";
            try {
              const res = await fetch("https://formsubmit.co/ajax/shauryasingh0302@icloud.com", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(json),
              });
              const result = await res.json();
              if (result.success) {
                form.reset();
                setToast({ visible: true, message: "Your message has been communicated." });
              } else {
                setToast({ visible: true, message: "Failed to send. Please try again." });
              }
            } catch {
              setToast({ visible: true, message: "Failed to send. Please try again." });
            } finally {
              setTimeout(() => setToast({ visible: false, message: "" }), 4000);
            }
          }}
          className="grid gap-6"
        >
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-mono text-muted-foreground"
              >
                NAME
              </label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-mono text-muted-foreground"
              >
                EMAIL
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-xs font-mono text-muted-foreground"
            >
              MESSAGE
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter your message..."
              className="min-h-[150px]"
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            SEND TRANSMISSION
          </Button>
        </form>
        {/* Toast */}
        {toast.visible && (
          <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-card border border-border shadow-lg px-6 py-4 flex items-center gap-3 text-sm">
              <svg
                className="size-5 text-primary shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-mono text-foreground">{toast.message}</span>
            </div>
          </div>
        )}
      </motion.div>
    </Container>
  );
}
