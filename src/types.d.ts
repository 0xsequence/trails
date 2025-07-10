declare global {
  interface Window {
    Buffer: typeof import("buffer").Buffer
    ethereum?: any
  }
}

declare module "*.svg" {
  const content: string
  export default content
}
