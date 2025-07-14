import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    force: true,
    // TODO: This shouldn't be needed, fix sdk build
    include: [
      "@0xsequence/trails-api",
      "@0xsequence/trails-sdk",
      "@0xsequence/hooks",
      "@0xsequence/wallet-core",
      "@0xsequence/wallet-primitives",
      "@0xsequence/wallet-wdk",
    ],
    // exclude: [
    //   "@reown/appkit",
    //   "@reown/appkit-adapter-wagmi",
    //   "@0xsequence/design-system",
    //   "@walletconnect/time",
    // ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: [
      "@0xsequence/hooks",
      "wagmi",
      "@privy-io/wagmi",
      "react",
      "react-dom",
    ], // this helps avoid duplicate React context instances
  },
  define: {
    "import.meta.env.VITE_COMMIT_SHA": JSON.stringify(
      process.env.CF_PAGES_COMMIT_SHA || process.env.VITE_COMMIT_SHA || "",
    ),
  },
})
