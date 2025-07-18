#!/usr/bin/env node

const fs = require("node:fs")
const path = require("node:path")

const sdkPath = path.join(__dirname, "..", "package.json")

// These must match the names in your dependency graph
const workspaceDeps = ["@0xsequence/trails-api", "@0xsequence/trails-relayer"]

const sdkPkg = JSON.parse(fs.readFileSync(sdkPath, "utf-8"))
let modified = false

;["dependencies", "peerDependencies"].forEach((field) => {
  if (!sdkPkg[field]) return

  for (const dep of workspaceDeps) {
    if (sdkPkg[field][dep] && !sdkPkg[field][dep].startsWith("workspace:")) {
      sdkPkg[field][dep] = "workspace:*"
      modified = true
      console.log(`🔁 Restored ${dep} → workspace:*`)
    }
  }
})

if (modified) {
  fs.writeFileSync(sdkPath, `${JSON.stringify(sdkPkg, null, 2)}\n`)
  console.log("✅ Restored workspace:* references in trails-sdk")
} else {
  console.log("ℹ️ No changes needed to restore workspace versions")
}
