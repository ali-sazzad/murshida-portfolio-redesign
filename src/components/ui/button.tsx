import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display text-[0.8rem] font-semibold tracking-wide whitespace-nowrap transition-colors duration-500 select-none",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-accent hover:text-ink",
        accent: "bg-accent text-ink hover:bg-ink hover:text-paper",
        outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
      },
      size: { md: "h-11 px-6", sm: "h-9 px-4" },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...p} />;
}

export function ButtonLink({ className, variant, size, ...p }: AnchorHTMLAttributes<HTMLAnchorElement> & Variants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...p} />;
}
