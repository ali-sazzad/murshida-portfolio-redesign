import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

type Skill = { title: string; icon: string };

const SYMBOLS: Record<string, string> = {
  HTML: "Ht",
  CSS: "Cs",
  JavaScript: "Js",
  Astro: "As",
  React: "Re",
  "Git/GitHub": "Gh",
  MongoDB: "Mo",
  PostgreSQL: "Pg",
  Bootstrap: "Bs",
  Supabase: "Su",
  Next: "Nx",
  Python: "Py",
  PHP: "Ph",
  TypeScript: "Ts",
};

/** Skills laid out like a periodic table, with a live "specimen" readout. */
export default function SkillsTable({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  // gentle auto-cycle until the visitor interacts
  useEffect(() => {
    if (hold) return;
    const id = setInterval(() => setActive((a) => (a + 1) % skills.length), 2200);
    return () => clearInterval(id);
  }, [hold, skills.length]);

  const cur = skills[active];

  return (
    <div>
      {/* specimen readout */}
      <div className="grid gap-6 border-y border-ink/80 py-8 md:grid-cols-12 md:items-center md:gap-10 md:py-10">
        <div className="md:col-span-8">
          <p className="mono mb-3 opacity-60">
            No. {String(active + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}
          </p>
          <div key={active} className="flex items-baseline gap-4 animate-[rise_.7s_var(--ease-expo)_both]">
            <span className="serif text-[clamp(3rem,9vw,8rem)] leading-none text-accent">{SYMBOLS[cur.title]}</span>
            <span className="display text-[clamp(1.8rem,5.4vw,4.6rem)]">{cur.title}</span>
          </div>
        </div>
        <div className="hidden justify-end md:col-span-4 md:flex">
          <div className="grid size-32 place-items-center rounded-full bg-accent">
            <img
              key={active}
              src={cur.icon}
              alt=""
              className="max-h-[48%] max-w-[52%] object-contain animate-[pop_.6s_var(--ease-expo)_both]"
            />
          </div>
        </div>
      </div>

      {/* the table */}
      <ul
        className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-7"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
      >
        {skills.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} data-reveal style={{ ["--d" as any]: `${(i % 7) * 0.05}s` }}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => {
                  setHold(true);
                  setActive(i);
                }}
                onClick={() => {
                  setHold(true);
                  setActive(i);
                }}
                aria-label={s.title}
                className={cn(
                  "relative flex aspect-[4/5] w-full flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-500 ease-[var(--ease-expo)] md:p-4",
                  on
                    ? "-translate-y-1.5 scale-[1.04] border-ink bg-ink text-paper shadow-[0_22px_40px_-22px_rgba(18,16,14,0.7)]"
                    : "border-ink/25 bg-paper hover:border-ink/70",
                )}
              >
                <span className="mono text-[0.62rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("serif text-[clamp(1.8rem,3.4vw,3rem)] leading-none", on && "text-accent")}>
                  {SYMBOLS[s.title]}
                </span>
                <span className="text-[0.78rem] leading-tight font-bold tracking-tight md:text-sm">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
