import { SequenceHooksProvider } from "@0xsequence/hooks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from "jotai"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "./routes"
import {
  sequenceProjectAccessKey,
  sequenceApiUrl,
  sequenceIndexerUrl,
} from "./config"
import { globalStore } from "./store"

import "./index.css"
import { ThemeProvider as SequenceThemeProvider } from "@0xsequence/design-system"
import { ThemeProvider } from "./contexts/ThemeContext"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={globalStore}>
        <SequenceHooksProvider
          config={{
            projectAccessKey: sequenceProjectAccessKey,
            env: {
              indexerUrl: sequenceIndexerUrl,
              indexerGatewayUrl: sequenceIndexerUrl,
              apiUrl: sequenceApiUrl,
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
