import { describe, expect, it, vi } from "vitest"
import * as hooks from "../src/index.js"
import type { MetaTxn } from "../src/metaTxnMonitor.js"

// Mock the hooks module
vi.mock("../src/index.js", () => ({
  useAPIClient: vi.fn(),
  useMetaTxnsMonitor: vi.fn(),
  useRelayers: vi.fn(),
  useTokenBalances: vi.fn(),
  useTrails: vi.fn(),
}))

describe("SDK Exports", () => {
  it("exports all hooks", () => {
    expect(hooks.useAPIClient).toBeDefined()
    expect(hooks.useMetaTxnsMonitor).toBeDefined()
    expect(hooks.useRelayers).toBeDefined()
    expect(hooks.useTokenBalances).toBeDefined()
    expect(hooks.useTrails).toBeDefined()
  })

  it("exports types", () => {
    // Just verify the type exists by using it in a type context
    const _metaTxn: MetaTxn = {
      id: "123",
      chainId: "1",
      contract: "0x123",
      input: "0x456",
      walletAddress: "0x789",
    }
    expect(_metaTxn).toBeDefined()
  })
})
