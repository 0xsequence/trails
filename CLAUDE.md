# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building
- `pnpm build` - Build all packages in the monorepo
- `pnpm build:packages` - Build only packages (excludes apps)
- `pnpm clean` - Clean all build artifacts

### Development
- `pnpm dev` - Start development servers for all packages
- `pnpm test` - Run all tests (runs with concurrency=1)

### Code Quality
- `pnpm lint` - Lint code with Biome
- `pnpm lint:fix` - Lint and auto-fix issues
- `pnpm format` - Format code with Biome
- `pnpm ci:check` - Run CI checks (formatting + linting)

### Package-specific Commands
Run commands in specific packages using:
- `cd packages/anypay-sdk && pnpm test` - Run SDK tests with Vitest
- `cd packages/anypay-sdk && pnpm build:umd` - Build UMD bundle for browser

## Architecture Overview

**Anypay** is a blockchain payment SDK that enables "pay with any token" functionality through intent-based transactions and automatic cross-chain routing.

### Monorepo Structure
- `packages/anypay-sdk/` - Main React SDK with hooks and embeddable widgets
- `packages/anypay-api/` - Generated API client for backend services  
- `packages/anypay-relayer/` - Meta-transaction relayer client
- `apps/anypay-demo/` - Demo application showcasing SDK features

### Key Technologies
- **Frontend**: React 19+ with TypeScript, Vite for building
- **Blockchain**: Wagmi 2.x, Viem 2.x for Web3 interactions
- **Wallets**: Privy Auth, Sequence Wallet, WalletConnect/Reown AppKit
- **Styling**: Tailwind CSS v4, Sequence Design System
- **Build**: Turbo for monorepo orchestration, Biome for linting/formatting

### Intent-Based Architecture
The SDK uses "intents" to describe desired payment outcomes rather than specific transaction steps. The system automatically:
- Determines optimal cross-chain routing
- Handles token swapping and bridging
- Manages wallet connections and transactions
- Provides gasless experiences through meta-transaction relayers

### Widget System
The SDK provides embeddable payment widgets with multiple integration methods:
- React hooks for React applications
- Standalone widget components
- UMD bundle (`anypay.min.js`) for vanilla JavaScript integration

### Multi-Chain Support
Supports Ethereum, Base, Optimism, Arbitrum, and Polygon with configurable network settings in `src/constants.ts`.

## Testing

- Tests use **Vitest** with extensive mocking of blockchain interactions
- E2E tests validate full payment flows
- Run individual test files: `cd packages/anypay-sdk && pnpm test intents.test.ts`

## Important Files

- `packages/anypay-sdk/src/anypay.ts` - Main React hooks and core functionality
- `packages/anypay-sdk/src/intents.ts` - Intent configuration and execution logic
- `packages/anypay-sdk/src/widget/` - Embeddable widget components
- `packages/anypay-sdk/src/constants.ts` - Network and token configurations