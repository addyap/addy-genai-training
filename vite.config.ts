import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8095,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
  build: {
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            // Split large leaf UI dependencies into their own cacheable chunks
            // so repeat visitors don't re-download them every time app code
            // changes. React/react-dom/react-router-dom are deliberately left
            // in the default chunk: splitting them out created a circular
            // chunk dependency (Rollup warning) that broke client-side
            // hydration in testing — clicks fell back to full page reloads
            // instead of SPA navigation. Client build only — the SSR/prerender
            // bundle is a single build-time execution, not something a browser
            // caches, so splitting it adds risk for no benefit.
            manualChunks(id) {
              if (!id.includes("node_modules")) return undefined;
              if (id.includes("@radix-ui")) return "vendor-radix";
              if (id.includes("@tanstack")) return "vendor-query";
              return undefined;
            },
          },
        },
  },
}));
