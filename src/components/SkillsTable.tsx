import { useEffect, useMemo, useState } from "react";

type Skill = { title: string; icon: string };

const GROUP: Record<string, string> = {
  HTML: "Languages",
  CSS: "Languages",
  JavaScript: "Languages",
  TypeScript: "Languages",
  Python: "Languages",
  PHP: "Languages",
  Astro: "Frameworks",
  React: "Frameworks",
  Next: "Frameworks",
  Bootstrap: "Frameworks",
  MongoDB: "Data",
  PostgreSQL: "Data",
  Supabase: "Data",
  "Git/GitHub": "Tooling",
};

const CLUSTERS = ["Languages", "Frameworks", "Data", "Tooling"] as const;
const R_ATOM = 54;
const RING: Record<string, number> = { Languages: 88, Frameworks: 70, Data: 58, Tooling: 0 };
const COLORS: Record<string, { light: string; base: string; dark: string }> = {
  Languages: { light: "#ffb199", base: "#ff5a36", dark: "#b52a0c" },
  Frameworks: { light: "#a5c8ff", base: "#3b82f6", dark: "#1a4aa8" },
  Data: { light: "#9af0cf", base: "#10b981", dark: "#087050" },
  Tooling: { light: "#e0b8ff", base: "#a855f7", dark: "#6a22b0" },
};
// cluster centres: wide (2x2) and narrow (single column)
const WIDE = {
  vb: "0 0 1000 860",
  c: [
    [250, 215],
    [750, 215],
    [250, 640],
    [750, 640],
  ],
};
const NARROW = {
  vb: "0 0 400 1480",
  c: [
    [200, 200],
    [200, 620],
    [200, 1010],
    [200, 1320],
  ],
};

/** Skills drawn as atom clusters: each group is a fused molecule of overlapping atoms. */
export default function SkillsTable({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const set = () => setNarrow(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (hold) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % skills.length), 2400);
    return () => clearInterval(id);
  }, [hold, skills.length]);

  const layout = narrow ? NARROW : WIDE;

  const atoms = useMemo(() => {
    const out: { skill: Skill; idx: number; x: number; y: number }[] = [];
    CLUSTERS.forEach((name, ci) => {
      const [cx, cy] = layout.c[ci];
      const members = skills.map((sk, idx) => ({ sk, idx })).filter((m) => GROUP[m.sk.title] === name);
      members.forEach((m, k) => {
        if (members.length === 1) {
          out.push({ skill: m.sk, idx: m.idx, x: cx, y: cy });
          return;
        }
        const a = (k / members.length) * Math.PI * 2 - Math.PI / 2;
        out.push({
          skill: m.sk,
          idx: m.idx,
          x: cx + Math.cos(a) * RING[name],
          y: cy + Math.sin(a) * RING[name],
        });
      });
    });
    return out;
  }, [skills, layout]);

  const cur = skills[active];

  return (
    <div>
      {/* readout */}
      <div className="relative overflow-hidden rounded-[2rem] border border-ink/80 bg-ink p-6 text-paper md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-dashed border-paper/25 md:size-96" />
        <div className="relative grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mono mb-4 flex flex-wrap items-center gap-3 opacity-70">
              <span>
                No. {String(active + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-paper/40 px-3 py-0.5">{GROUP[cur.title]}</span>
            </p>
            <div key={cur.title} className="animate-[rise_.7s_var(--ease-expo)_both]">
              <span className="display block text-[clamp(2.4rem,8vw,6.5rem)] break-words">{cur.title}</span>
            </div>
          </div>
          <div className="flex md:col-span-4 md:justify-end">
            <div className="grid size-28 place-items-center rounded-full bg-paper md:size-40">
              <img
                key={cur.title}
                src={cur.icon}
                alt=""
                className="max-h-[52%] max-w-[56%] object-contain animate-[pop_.6s_var(--ease-expo)_both]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* atom clusters */}
      <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-ink/80 bg-white p-2 md:p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        />
        <svg
          viewBox={layout.vb}
          className="relative mx-auto block h-auto w-full max-w-[1000px] select-none"
          role="group"
          aria-label="Skills grouped as atom clusters"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
        >
          <defs>
            {CLUSTERS.map((name) => {
              const c = COLORS[name];
              return (
                <g key={name}>
                  <radialGradient id={`s-${name}`} cx="35%" cy="28%" r="85%">
                    <stop offset="0" stopColor={c.light} />
                    <stop offset="0.5" stopColor={c.base} />
                    <stop offset="1" stopColor={c.dark} />
                  </radialGradient>
                  <radialGradient id={`h-${name}`}>
                    <stop offset="0" stopColor={c.base} stopOpacity="0.28" />
                    <stop offset="1" stopColor={c.base} stopOpacity="0" />
                  </radialGradient>
                </g>
              );
            })}
          </defs>

          {/* halos, orbits, bonds, labels */}
          {CLUSTERS.map((name, ci) => {
            const [cx, cy] = layout.c[ci];
            const col = COLORS[name];
            const reach = RING[name] + R_ATOM;
            const members = atoms.filter((a) => GROUP[a.skill.title] === name);
            return (
              <g key={name}>
                <circle cx={cx} cy={cy} r={reach + 70} fill={`url(#h-${name})`} />
                {[0, 60, 120].map((deg, k) => (
                  <g key={deg} transform={`rotate(${deg} ${cx} ${cy})`}>
                    <g
                      className="orb"
                      style={{
                        transformOrigin: `${cx}px ${cy}px`,
                        animation: `spin ${16 + ci * 4 + k * 5}s linear infinite${k % 2 ? " reverse" : ""}`,
                      }}
                    >
                      <ellipse
                        cx={cx}
                        cy={cy}
                        rx={reach + 34}
                        ry={(reach + 34) * 0.36}
                        fill="none"
                        stroke={col.base}
                        strokeOpacity="0.55"
                        strokeWidth="1.5"
                      />
                      <circle cx={cx + reach + 34} cy={cy} r="6" fill={col.dark} />
                    </g>
                  </g>
                ))}
                {members.length > 1 &&
                  members.map((m, k) => {
                    const n = members[(k + 1) % members.length];
                    return (
                      <g key={m.skill.title} stroke={col.dark} strokeOpacity="0.55" strokeLinecap="round">
                        <line x1={m.x} y1={m.y} x2={n.x} y2={n.y} strokeWidth="8" />
                        <line x1={m.x} y1={m.y} x2={cx} y2={cy} strokeWidth="4" strokeOpacity="0.35" />
                      </g>
                    );
                  })}
                <text
                  x={cx}
                  y={cy + reach + 66}
                  textAnchor="middle"
                  className="mono"
                  style={{ fontSize: 14, letterSpacing: "0.2em", fontWeight: 700 }}
                  fill={col.dark}
                >
                  {name.toUpperCase()} · {String(members.length).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          {/* core nuclei */}
          {CLUSTERS.map((name, ci) => {
            if (RING[name] === 0) return null;
            const [cx, cy] = layout.c[ci];
            return <circle key={name} cx={cx} cy={cy} r="14" fill={COLORS[name].dark} />;
          })}

          {/* fused atoms */}
          {atoms.map((a, n) => {
            const on = a.idx === active;
            const g = GROUP[a.skill.title];
            const col = COLORS[g];
            return (
              <g key={a.skill.title} transform={`translate(${a.x} ${a.y})`}>
                <g className="atom" style={{ animation: `bob ${6 + (n % 5)}s ease-in-out ${-n * 0.8}s infinite` }}>
                  <g
                    tabIndex={0}
                    role="button"
                    aria-label={a.skill.title}
                    style={{
                      cursor: "pointer",
                      outline: "none",
                      transform: on ? "scale(1.14)" : "scale(1)",
                      transition: "transform .5s var(--ease-expo)",
                    }}
                    onMouseEnter={() => setActive(a.idx)}
                    onFocus={() => {
                      setHold(true);
                      setActive(a.idx);
                    }}
                    onClick={() => {
                      setHold(true);
                      setActive(a.idx);
                    }}
                  >
                    <circle
                      r={R_ATOM}
                      fill={`url(#s-${g})`}
                      stroke={on ? "#000" : col.dark}
                      strokeWidth={on ? 3 : 1.6}
                      style={{ filter: `drop-shadow(0 10px 12px ${col.dark}66)` }}
                    />
                    <ellipse cx="-16" cy="-26" rx="16" ry="9" fill="#fff" fillOpacity="0.45" transform="rotate(-30 -16 -26)" />
                    <circle cy="-10" r="21" fill="#fff" stroke={col.dark} strokeWidth="1.2" />
                    <image
                      href={a.skill.icon}
                      x="-14"
                      y="-24"
                      width="28"
                      height="28"
                      preserveAspectRatio="xMidYMid meet"
                    />
                    <text
                      y="35"
                      textAnchor="middle"
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.02em",
                        fontWeight: 700,
                        paintOrder: "stroke",
                        stroke: "rgba(0,0,0,0.45)",
                        strokeWidth: 3,
                        strokeLinejoin: "round",
                      }}
                      fill="#fff"
                    >
                      {a.skill.title.toUpperCase()}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mono mt-4 text-center opacity-60">Hover or tap an atom · fused atoms share a group</p>
    </div>
  );
}
