import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "./ui/button";
import { cn } from "../lib/utils";

type Link = { href: string; label: string };
type Props = {
  links: Link[];
  resume: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  initialPath: string;
};

const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

export default function Chrome({ links, resume, email, phone, linkedin, github, initialPath }: Props) {
  const [path, setPath] = useState(norm(initialPath));
  const [menu, setMenu] = useState(false);
  const [connect, setConnect] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  // follow client-side navigations
  useEffect(() => {
    const sync = () => {
      setPath(norm(location.pathname));
      setMenu(false);
    };
    document.addEventListener("astro:page-load", sync);
    document.addEventListener("astro:after-swap", sync);
    const open = () => setConnect(true);
    addEventListener("open-connect", open);
    return () => {
      document.removeEventListener("astro:page-load", sync);
      document.removeEventListener("astro:after-swap", sync);
      removeEventListener("open-connect", open);
    };
  }, []);

  const measure = () => {
    const i = links.findIndex((l) => norm(l.href) === path);
    const el = refs.current[i];
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth, ready: true });
    else setPill((p) => ({ ...p, w: 0 }));
  };
  useLayoutEffect(measure, [path]);
  useEffect(() => {
    addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => removeEventListener("resize", measure);
  }, [path]);

  // overlays lock scrolling + Esc
  useEffect(() => {
    const lenis = (window as any).__lenis;
    const locked = menu || connect;
    if (locked) lenis?.stop();
    else lenis?.start();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setConnect(false);
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [menu, connect]);

  const rows = [
    { k: "Email", v: email, href: `mailto:${email}` },
    { k: "Phone", v: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { k: "LinkedIn", v: "murshida-p", href: linkedin },
    { k: "GitHub", v: "github.com", href: github },
  ];

  return (
    <>
      {/* top bar */}
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 md:px-10 md:pt-7"
        style={{ viewTransitionName: "chrome-top" }}
      >
        <a
          href={links[0].href}
          aria-label="Murshida P. — Home"
          className="pointer-events-auto grid size-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 hover:-rotate-12 hover:scale-105"
        >
          <span className="serif text-xl leading-none">M</span>
        </a>
        <div className="pointer-events-auto hidden items-center gap-3 xl:flex">
          <ButtonLink href={resume} target="_blank" rel="noreferrer" variant="outline">
            Get Resume
          </ButtonLink>
          <Button variant="accent" onClick={() => setConnect(true)}>
            Connect
          </Button>
        </div>
        <button
          className="pointer-events-auto flex h-11 items-center gap-3 rounded-full bg-ink px-5 font-display text-[0.8rem] font-semibold text-paper xl:hidden"
          onClick={() => setMenu(true)}
          aria-label="Open menu"
        >
          Menu
          <span className="grid gap-[3px]">
            <i className="block h-px w-4 bg-paper" />
            <i className="block h-px w-4 bg-paper" />
          </span>
        </button>
      </header>

      {/* dock */}
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 top-5 z-40 hidden justify-center xl:top-7 xl:flex"
        style={{ viewTransitionName: "chrome-dock" }}
      >
        <div className="pointer-events-auto relative flex rounded-full border border-ink/15 bg-paper/75 p-1.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <span
            aria-hidden
            className={cn(
              "absolute top-1.5 bottom-1.5 left-0 rounded-full bg-ink",
              pill.ready && "transition-[transform,width,opacity] duration-700 ease-[var(--ease-expo)]",
            )}
            style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.w ? 1 : 0 }}
          />
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-current={norm(l.href) === path ? "page" : undefined}
              className={cn(
                "relative z-10 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold tracking-wide transition-colors duration-500 xl:px-5",
                norm(l.href) === path ? "text-paper" : "text-ink/70 hover:text-ink",
              )}
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink px-5 pt-5 pb-8 text-paper transition-[clip-path] duration-[900ms] ease-[var(--ease-wipe)] xl:hidden",
          menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!menu}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setMenu(false)}
            className="h-11 rounded-full border border-paper/40 px-5 font-display text-[0.8rem] font-semibold"
          >
            Close
          </button>
        </div>
        <ul className="mt-10 flex flex-1 flex-col justify-center gap-1">
          {links.map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <a
                href={l.href}
                tabIndex={menu ? 0 : -1}
                className={cn(
                  "display block text-[clamp(2rem,10.5vw,4rem)] transition-transform duration-700 ease-[var(--ease-expo)]",
                  norm(l.href) === path ? "text-accent" : "text-paper",
                  menu ? "translate-y-0" : "translate-y-full",
                )}
                style={{ transitionDelay: menu ? `${0.25 + i * 0.05}s` : "0s" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <ButtonLink
            href={resume}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="flex-1 border-paper text-paper hover:bg-paper hover:text-ink"
          >
            Get Resume
          </ButtonLink>
          <Button
            variant="accent"
            className="flex-1"
            onClick={() => {
              setMenu(false);
              setConnect(true);
            }}
          >
            Connect
          </Button>
        </div>
      </div>

      {/* connect sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[55] overflow-y-auto bg-accent px-5 pt-5 pb-10 text-ink transition-[clip-path] duration-[950ms] ease-[var(--ease-wipe)] md:px-10",
          connect ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(100%_0_0_0)]",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Connect"
        aria-hidden={!connect}
      >
        <div className="mx-auto flex min-h-full max-w-6xl flex-col">
          <div className="flex items-center justify-between">
            <span className="mono">Connect</span>
            <button
              onClick={() => setConnect(false)}
              className="h-11 rounded-full bg-ink px-6 font-display text-[0.8rem] font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Close
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center py-14">
            <h2 className="display text-[clamp(2.8rem,10vw,9rem)]">Connect</h2>
            <ul className="mt-12 border-t border-ink/80">
              {rows.map((r, i) => (
                <li key={r.k} className="border-b border-ink/80">
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    tabIndex={connect ? 0 : -1}
                    className="group flex items-baseline justify-between gap-6 py-5 hover:translate-x-3"
                    style={{
                      opacity: connect ? 1 : 0,
                      transform: connect ? undefined : "translateY(30px)",
                      transition: `opacity .8s ${connect ? 0.35 + i * 0.07 : 0}s, transform .9s var(--ease-expo) ${connect ? 0.35 + i * 0.07 : 0}s`,
                    }}
                  >
                    <span className="mono w-24 shrink-0">{r.k}</span>
                    <span className="min-w-0 flex-1 break-words text-[clamp(1.3rem,3.6vw,2.8rem)] font-semibold tracking-tight">
                      {r.v}
                    </span>
                    <span className="text-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
