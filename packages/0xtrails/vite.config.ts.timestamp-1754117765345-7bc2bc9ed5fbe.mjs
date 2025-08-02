// vite.config.ts
import react from "file:///home/mota/Sandbox/sequence/anypay/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@5.4.19_@types+node@22.17.0_lightningcss@1.30.1_/node_modules/@vitejs/plugin-react/dist/index.js"
import tailwindcss from "file:///home/mota/Sandbox/sequence/anypay/node_modules/.pnpm/@tailwindcss+vite@4.1.11_vite@5.4.19_@types+node@22.17.0_lightningcss@1.30.1_/node_modules/@tailwindcss/vite/dist/index.mjs"
import { defineConfig } from "file:///home/mota/Sandbox/sequence/anypay/node_modules/.pnpm/vite@5.4.19_@types+node@22.17.0_lightningcss@1.30.1/node_modules/vite/dist/node/index.js"
import cssInjectedByJsPlugin from "file:///home/mota/Sandbox/sequence/anypay/node_modules/.pnpm/vite-plugin-css-injected-by-js@3.5.2_vite@5.4.19_@types+node@22.17.0_lightningcss@1.30.1_/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js"
var vite_config_default = defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    // inject CSS automatically
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
        preserveModules: false,
        // Disable preserveModules to avoid virtual module issues
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tb3RhL1NhbmRib3gvc2VxdWVuY2UvYW55cGF5L3BhY2thZ2VzLzB4dHJhaWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tb3RhL1NhbmRib3gvc2VxdWVuY2UvYW55cGF5L3BhY2thZ2VzLzB4dHJhaWxzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21vdGEvU2FuZGJveC9zZXF1ZW5jZS9hbnlwYXkvcGFja2FnZXMvMHh0cmFpbHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IGNzc0luamVjdGVkQnlKc1BsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tY3NzLWluamVjdGVkLWJ5LWpzXCJcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksIC8vIGluamVjdCBDU1MgYXV0b21hdGljYWxseVxuICAgIHRhaWx3aW5kY3NzKCksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogXCIuL3NyYy9pbmRleC50c1wiLFxuICAgICAgICBcIndpZGdldC9pbmRleFwiOiBcIi4vc3JjL3dpZGdldC9pbmRleC50c3hcIixcbiAgICAgIH0sXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwicmVhY3RcIixcbiAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICBcInJlYWN0LWRvbVwiLFxuICAgICAgICBcIkAweHNlcXVlbmNlL2Rlc2lnbi1zeXN0ZW1cIixcbiAgICAgICAgXCJ3YWdtaVwiLFxuICAgICAgICBcInZpZW1cIixcbiAgICAgICAgXCJAMHhzZXF1ZW5jZS90cmFpbHMtYXBpXCIsXG4gICAgICAgIFwiQDB4c2VxdWVuY2Uvd2FsbGV0LWNvcmVcIixcbiAgICAgICAgXCJAMHhzZXF1ZW5jZS93YWxsZXQtcHJpbWl0aXZlc1wiLFxuICAgICAgICBcIkAweHNlcXVlbmNlL3dhbGxldC13ZGtcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgcHJlc2VydmVNb2R1bGVzOiBmYWxzZSwgLy8gRGlzYWJsZSBwcmVzZXJ2ZU1vZHVsZXMgdG8gYXZvaWQgdmlydHVhbCBtb2R1bGUgaXNzdWVzXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJbbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3V0RGlyOiBcImRpc3Qvd2lkZ2V0XCIsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG5cbiAgICAvLyBOZWVkZWQgZm9yIHRhaWx3aW5kY3NzIFwic3BhY2UteS1cIiBjbGFzc2VzIHRvIHdvcmtcbiAgICAvLyBTZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83OTQxNjAzOC8xNDM5MTY4XG4gICAgY3NzTWluaWZ5OiBcImxpZ2h0bmluZ2Nzc1wiLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBmb3JjZTogdHJ1ZSxcbiAgICAvLyBUT0RPOiBUaGlzIHNob3VsZG4ndCBiZSBuZWVkZWQsIGZpeCBzZGsgYnVpbGRcbiAgICBpbmNsdWRlOiBbXG4gICAgICBcIkAweHNlcXVlbmNlL3RyYWlscy1hcGlcIixcbiAgICAgIFwiQDB4c2VxdWVuY2Uvd2FsbGV0LWNvcmVcIixcbiAgICAgIFwiQDB4c2VxdWVuY2Uvd2FsbGV0LXByaW1pdGl2ZXNcIixcbiAgICAgIFwiQDB4c2VxdWVuY2Uvd2FsbGV0LXdka1wiLFxuICAgIF0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxPQUFPLFdBQVc7QUFDaFcsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTywyQkFBMkI7QUFFbEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sc0JBQXNCO0FBQUE7QUFBQSxJQUN0QixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04saUJBQWlCO0FBQUE7QUFBQSxRQUNqQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQTtBQUFBO0FBQUEsSUFJYixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osT0FBTztBQUFBO0FBQUEsSUFFUCxTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
