import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/**/*.{test,spec}.ts",
      "scripts/**/*.{test,spec}.{ts,js,mjs}",
    ],
    environmentMatchGlobs: [["scripts/**/*", "node"]],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts", "scripts/**/*.{ts,js,mjs}"],
      exclude: ["src/**/*.tsx"],
    },
  },
});
