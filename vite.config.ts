import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    test: {
      // 👋 add the line below to add jsdom to vite
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/__tests__/setup.ts",
    },
    base: "https://jonandrewdavis.github.io/super-device-world-public/",
    define: {
      "process.env": {
        SUPABASE_URL: env.SUPABASE_URL,
        SUPABASE_KEY: env.SUPABASE_KEY,
        SUPABASE_PW: env.SUPABASE_PW,
      },
    },
  };
});
