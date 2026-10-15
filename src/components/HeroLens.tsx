import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

type Props = { image: string; first: string; last: string; role: [string, string]; skills: string[] };

function Stage({ image, first, last, role, skills, lens }: Props & { lens?: boolean }) {
  return (
    <div className="stage absolute inset-0 overflow-hidden" style={{ background: lens ? "var(--color-accent)" : "var(--color-paper)" }}>
      {/* arch behind the portrait */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-t-full"
        style={{
          bottom: "calc(var(--strip) + var(--band))",
          width: "calc(var(--ph) * 0.66)",
          height: "calc(var(--ph) * 0.9)",
          background: lens ? "var(--color-paper)" : "var(--color-accent)",
        }}
      />
      {/* role */}
      <p
        className="display giant absolute inset-x-0 text-center text-ink"
        style={{ top: "max(5.4rem, 12svh)", letterSpacing: "-0.03em" }}
      >
        <span className="block xl:inline">{role[0]}</span> <span className="block xl:inline">{role[1]}</span>
      </p>
      {/* portrait */}
      <img
        src={image}
        alt=""
        draggable={false}
        className="absolute left-1/2 -translate-x-1/2 select-none"
        style={{ bottom: "calc(var(--strip) + var(--band))", height: "var(--ph)", width: "auto", maxWidth: "none" }}
      />
      {/* name strip */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-center overflow-hidden",
          lens ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
        style={{ height: "var(--strip)" }}
      >
        <p className="display whitespace-nowrap" style={{ fontSize: "var(--fs)", lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 800 }}>
          {first}
          <span className="serif ml-[0.12em] align-baseline normal-case text-accent">{last}</span>
        </p>
      </div>
      {/* stack list */}
      <ul
        className="mono absolute left-5 grid grid-cols-1 gap-x-5 gap-y-1 text-[0.7rem] sm:grid-cols-2 sm:gap-y-1.5 md:left-10 xl:grid-cols-1 xl:text-[0.72rem]"
        style={{ bottom: "calc(var(--strip) + 1.1rem)" }}
      >
        {skills.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="opacity-50">0{i + 1}</span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroLens(props: Props) {
  const root = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const layer = lens.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0, ty = 0, x = 0, y = 0, r = 0, tr = 0, inside = false, raf = 0, init = false;

    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
      inside = true;
    };
    const leave = () => (inside = false);

    const tick = (t: number) => {
      const b = el.getBoundingClientRect();
      const base = Math.min(b.width, b.height);
      if (!inside) {
        // idle drift keeps the page alive on touch + before the pointer arrives
        tx = b.width * (0.5 + 0.3 * Math.sin(t / 2100));
        ty = b.height * (0.46 + 0.22 * Math.sin(t / 1500 + 1.3));
        tr = reduced ? 0 : base * 0.2;
      } else {
        tr = base * 0.27;
      }
      if (!init) {
        x = tx;
        y = ty;
        init = true;
      }
      x += (tx - x) * 0.11;
      y += (ty - y) * 0.11;
      r += (tr - r) * 0.08;
      layer.style.setProperty("--x", `${x}px`);
      layer.style.setProperty("--y", `${y}px`);
      layer.style.setProperty("--r", `${Math.max(0, r)}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={root} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden" data-cursor>
      <div role="img" aria-label={`${props.first} ${props.last} — ${props.role.join(" ")}`} className="absolute inset-0">
        <Stage {...props} />
        <div ref={lens} className="lens-layer absolute inset-0" aria-hidden>
          <Stage {...props} lens />
        </div>
      </div>
    </div>
  );
}
