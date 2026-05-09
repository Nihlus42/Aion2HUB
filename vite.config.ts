import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    TanStackRouterVite(),
    tanstackStart({
      customViteReactPlugin: true,
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    ...(mode === "production" ? [cloudflare()] : []),
  ],
}));