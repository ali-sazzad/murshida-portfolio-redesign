import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH / SITE_URL are set by the GitHub Pages workflow; Vercel builds at the root.
export default defineConfig({
  site: process.env.SITE_URL || "https://murshidap-portfolio.vercel.app",
  base: process.env.BASE_PATH || "/",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
