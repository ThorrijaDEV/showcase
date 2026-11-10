import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/showcase/",
  root: ".",
  publicDir: "assets",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: false,
  },
  resolve: {
    alias: {
      "@models": path.resolve(process.cwd(), "../models"),
    },
  },
});
