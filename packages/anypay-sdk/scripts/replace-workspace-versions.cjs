#!/usr/bin/env node

const fs = require("node:fs")
const path = require("node:path")

// Hardcoded for your project
const sdkPath = path.join(__dirname, "..", "package.json")
const apiPath = path.join(__dirname, "../../anypay-api/package.json")
const relayerPath = path.join(__dirname, "../../anypay-relayer/package.json")

const sdkPkg = JSON.parse(fs.readFileSync(sdkPath, "utf-8"))
const apiPkg = JSON.parse(fs.readFileSync(apiPath, "utf-8"))
const relayerPkg = JSON.parse(fs.readFileSync(relayerPath, "utf-8"))

const replacements = {
  "@0xsequence/anypay-api": apiPkg.version,
  "@0xsequence/anypay-relayer": relayerPkg.version,
}

let modified = false

;["dependencies", "peerDependencies"].forEach((field) => {
  if (!sdkPkg[field]) return

  for (const [dep, version] of Object.entries(sdkPkg[field])) {
    if (version.startsWith("workspace:") && replacements[dep]) {
      sdkPkg[field][dep] = `^${replacements[dep]}`
      modified = true
      console.log(`✔️ Replaced ${dep} → ^${replacements[dep]}`)
    }
  }
})

if (modified) {
  fs.writeFileSync(sdkPath, `${JSON.stringify(sdkPkg, null, 2)}\n`)
  console.log("✅ Updated package.json in anypay-sdk")
} else {
  console.log("ℹ️ No changes made to anypay-sdk dependencies")
}
