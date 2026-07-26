import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@react-workshop/ui/styles.css",
        replacement: resolve(__dirname, "../../packages/ui/src/styles.css")
      },
      {
        find: "@react-workshop/ui/button",
        replacement: resolve(__dirname, "../../packages/ui/src/button/button.tsx")
      },
      {
        find: "@react-workshop/ui/card",
        replacement: resolve(__dirname, "../../packages/ui/src/card/card.tsx")
      },
      {
        find: "@react-workshop/ui/input",
        replacement: resolve(__dirname, "../../packages/ui/src/input/input.tsx")
      },
      {
        find: "@react-workshop/ui/utils",
        replacement: resolve(__dirname, "../../packages/ui/src/utils.ts")
      },
      {
        find: "@react-workshop/http-client",
        replacement: resolve(__dirname, "../../packages/http-client/src/index.ts")
      }
    ]
  }
});
