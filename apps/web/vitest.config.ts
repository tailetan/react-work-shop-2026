import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      passWithNoTests: true,
      setupFiles: ["src/test/setup.ts"],
      restoreMocks: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "src/main.tsx",
          "src/app/app.tsx",
          "src/test/**",
          "src/types/**",
          "src/**/*.test.{ts,tsx}",
          "src/**/*.d.ts"
        ],
        thresholds: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70
        }
      }
    }
  })
);
