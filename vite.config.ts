import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".",
  publicDir: "assets",
  build: {
    outDir: "dist",
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
