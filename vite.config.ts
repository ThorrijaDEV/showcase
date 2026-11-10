import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      "@models": path.resolve(__dirname, "../models"),
    },
  },
});
