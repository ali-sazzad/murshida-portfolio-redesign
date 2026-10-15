import { useEffect, useRef } from "react";

type Item = { title: string; image: string };

/** Drag / swipe horizontal rail with inertia. */
export default function Rail({ items }: { items: Item[] }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!;
    let down = false, sx = 0, sl = 0, v = 0, last = 0, raf = 0;
    const glide = () => {
      if (Math.abs(v) < 0.2) return;
      el.scrollLeft -= v;
      v *= 0.94;
      raf = requestAnimationFrame(glide);
    };
    const pd = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // native touch scroll handles it
      down = true;
      sx = e.clientX;
      sl = el.scrollLeft;
      last = e.clientX;
      v = 0;
      cancelAnimationFrame(raf);
      el.setPointerCapture(e.pointerId);
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      v = e.clientX - last;
      last = e.clientX;
      el.scrollLeft = sl - (e.clientX - sx);
    };
    const pu = () => {
      if (!down) return;
      down = false;
      raf = requestAnimationFrame(glide);
    };
    el.addEventListener("pointerdown", pd);
    el.addEventListener("pointermove", pm);
    el.addEventListener("pointerup", pu);
    el.addEventListener("pointercancel", pu);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", pd);
      el.removeEventListener("pointermove", pm);
      el.removeEventListener("pointerup", pu);
      el.removeEventListener("pointercancel", pu);
    };
  }, []);

  return (
    <div
      ref={box}
      data-lenis-prevent-wheel
      data-cursor
      className="flex cursor-grab gap-4 overflow-x-auto px-5 pb-4 active:cursor-grabbing md:gap-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((it, i) => (
        <figure key={i} className="group w-[74vw] shrink-0 select-none sm:w-[46vw] md:w-[30vw] lg:w-[24vw]">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-ink/15 bg-paper-2">
            <img
              src={it.image}
              alt=""
              draggable={false}
              loading="lazy"
              className="aspect-[12/7] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
            />
            <span className="mono absolute top-3 left-3 rounded-full bg-ink px-2.5 py-1 text-paper">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <figcaption className="mt-4 pr-4 text-[0.98rem] leading-snug font-semibold tracking-tight">
            {it.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
