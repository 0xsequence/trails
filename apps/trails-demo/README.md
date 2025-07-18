# Trail Demo App

A simple application demonstrating Trails intent configuration.

## Setup

1.  Clone the `sequence-core` repo if you haven't already.
2.  Install dependencies and build the core packages:
    ```bash
    pnpm install
    pnpm build
    ```
3.  Copy `.env.sample` to `.env` and add your Sequence Project Access Key:
    ```bash
    cp apps/demo-trails/.env.sample apps/demo-trails/.env
    ```
4.  Run the development server:
    ```bash
    pnpm --filter demo-trails dev
    ```

## Usage

1.  Open the app in your browser.
2.  Connect your wallet (e.g., Metamask).
3.  Select a token from your balance list.
4.  Click "Pay" or "Mock Contract Interaction".
5.  Observe the generated intent configuration details.
