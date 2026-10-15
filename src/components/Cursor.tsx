import { useEffect, useRef } from "react";

/** Lerped dot + ring cursor. Grows over interactive elements; absent on touch. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, s = 1, ts = 1, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      ts = t?.closest("a,button,[data-cursor]") ? 2.4 : 1;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      s += (ts - s) * 0.14;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) scale(${s})`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const base = "pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(hover:hover)_and_(pointer:fine)]:block";
  return (
    <>
      <div ref={ring} className={base} style={{ viewTransitionName: "cursor-ring" }}>
        <div className="-ml-5 -mt-5 size-10 rounded-full border-2 border-ink shadow-[0_0_0_1.5px_#fff,inset_0_0_0_1.5px_#fff]" />
      </div>
      <div ref={dot} className={base} style={{ viewTransitionName: "cursor-dot" }}>
        <div className="-ml-[4px] -mt-[4px] size-[8px] rounded-full border-[1.5px] border-white bg-ink" />
      </div>
    </>
  );
}
