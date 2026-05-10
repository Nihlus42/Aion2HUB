import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      customViteReactPlugin: true,
      server: { entry: "server" },
    }),
    nitro({
      preset: "vercel",
    }),
    react(),
    tailwindcss(),
  ],
}));
