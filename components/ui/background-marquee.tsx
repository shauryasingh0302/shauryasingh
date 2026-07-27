import { cn } from "@/lib/utils";

export function BackgroundMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center gap-8 opacity-10 dark:opacity-10",
        className
      )}
    >
      <div className="flex w-max animate-marquee font-display text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter">
        <span className="px-8">CONTACT • CONNECT • COLLABORATE • CONTACT • CONNECT • COLLABORATE • CONTACT • CONNECT • COLLABORATE •</span>
      </div>
      <div className="flex w-max animate-marquee-reverse font-display text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter ml-[-50%]">
        <span className="px-8">CONTACT • CONNECT • COLLABORATE • CONTACT • CONNECT • COLLABORATE • CONTACT • CONNECT • COLLABORATE •</span>
      </div>
    </div>
  );
}
