import { SequenceHooksProvider } from "@0xsequence/hooks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from "jotai"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "./routes"

import { globalStore } from "./store"

import "./index.css"
import { ThemeProvider as SequenceThemeProvider } from "@0xsequence/design-system"
import { ThemeProvider } from "./contexts/ThemeContext"

const queryClient = new QueryClient()
const apiUrl = import.meta.env.VITE_API_URL || "https://v3-api.sequence.app"
const indexerUrl =
  import.meta.env.VITE_INDEXER_URL || "https://indexer.sequence.app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={globalStore}>
        <SequenceHooksProvider
          config={{
            projectAccessKey: import.meta.env.VITE_PROJECT_ACCESS_KEY,
            env: {
              indexerUrl: indexerUrl,
              indexerGatewayUrl: indexerUrl,
              // indexerUrl: 'https://dev-indexer.sequence.app',
              // indexerUrl:
              //   import.meta.env.VITE_ENV === 'local'
              //     ? 'http://localhost:7777'
              //     : import.meta.env.VITE_ENV === 'cors-anywhere'
              //       ? 'http://localhost:8080/https://dev-indexer.sequence.app'
              //       : import.meta.env.VITE_ENV === 'dev'
              //         ? 'https://dev-indexer.sequence.app'
              //         : 'https://indexer.sequence.app',
              apiUrl: apiUrl,
              // import.meta.env.VITE_ENV === 'local'
              //   ? 'http://localhost:4422'
              //   : import.meta.env.VITE_ENV === 'cors-anywhere'
              //     ? 'http://localhost:8080/https://dev-api.sequence.app'
              //     : import.meta.env.VITE_ENV === 'dev'
              //       ? import.meta.env.VITE_USE_V3_API === 'true'
              //         ? 'https://v3-api.sequence.app'
              //         : 'https://dev-api.sequence.app'
              //       : 'https://api.sequence.app',
            },
          }}
        >
          <SequenceThemeProvider>
            <ThemeProvider initialTheme="light">
              <RouterProvider router={router} />
            </ThemeProvider>
          </SequenceThemeProvider>
        </SequenceHooksProvider>
      </JotaiProvider>
    </QueryClientProvider>
  </StrictMode>,
)
