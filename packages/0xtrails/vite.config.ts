import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // inject CSS automatically
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        "widget/index": "./src/widget/index.tsx",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "@0xsequence/design-system",
        "wagmi",
        "viem",
        "@0xsequence/trails-api",
        "@0xsequence/wallet-core",
        "@0xsequence/wallet-primitives",
        "@0xsequence/wallet-wdk",
      ],
      output: {
        preserveModules: false, // Disable preserveModules to avoid virtual module issues
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
    outDir: "dist/widget",
    emptyOutDir: true,

    // Needed for tailwindcss "space-y-" classes to work
    // See: https://stackoverflow.com/a/79416038/1439168
    cssMinify: "lightningcss",
  },
  optimizeDeps: {
    force: true,
    // TODO: This shouldn't be needed, fix sdk build
    include: [
      "@0xsequence/trails-api",
      "@0xsequence/wallet-core",
      "@0xsequence/wallet-primitives",
      "@0xsequence/wallet-wdk",
    ],
  },
})
