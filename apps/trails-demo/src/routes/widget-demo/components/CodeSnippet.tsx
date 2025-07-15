import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  nightOwl as darkSyntaxStyle,
  oneLight as lightSyntaxStyle,
} from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "@/contexts/ThemeContext"

interface CodeSnippetProps {
  children?: React.ReactNode
  appId: string
  toAddress: string
  toAmount: string
  toChainId: number | undefined
  toToken: string | undefined
  toCalldata: string
  useCustomButton: boolean | null
  renderInline: boolean | null
  theme: string | null
  walletOptions: string[] | null
  paymasterUrls: Array<{ chainId: number; url: string }>
  gasless: boolean | null
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  children,
  appId,
  toAddress,
  toAmount,
  toChainId,
  toToken,
  toCalldata,
  useCustomButton,
  renderInline,
  theme,
  walletOptions,
  paymasterUrls,
  gasless,
  onOriginConfirmation,
  onDestinationConfirmation,
}) => {
  const { theme: globalTheme } = useTheme()
  const [isCopied, setIsCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"react" | "script">("react")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        activeTab === "react" ? reactCodeExample : scriptCodeExample,
      )
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getReactCode = () => {
    const props = [
      appId && `appId="${appId}"`,
      toAddress && `toAddress="${toAddress}"`,
      toAmount && `toAmount="${toAmount}"`,
      toChainId && `toChainId={${toChainId}}`,
      toToken && `toToken="${toToken}"`,
      toCalldata && `toCalldata="${toCalldata}"`,
      paymasterUrls &&
        paymasterUrls.length > 0 &&
        `paymasterUrls={${JSON.stringify(paymasterUrls)}}`,
      renderInline !== null && `renderInline={${renderInline}}`,
      theme && `theme="${theme}"`,
      walletOptions && `walletOptions={${JSON.stringify(walletOptions)}}`,
      gasless && `gasless={true}`,
      onOriginConfirmation && `onOriginConfirmation={${onOriginConfirmation}}`,
      onDestinationConfirmation &&
        `onDestinationConfirmation={${onDestinationConfirmation}}`,
    ].filter(Boolean)

    return `import { TrailsWidget } from '@0xsequence/trails-sdk/widget'

export const App = () => {
  return (${
    useCustomButton
      ? `
    <TrailsWidget
      ${props.join("\n      ")}
    >
      <button className="custom-button-styles">
        Pay with Trails
      </button>
    </TrailsWidget>`
      : `
    <TrailsWidget
      ${props.join("\n      ")}
    />`
  }
  )
}`
  }

  const getScriptCode = () => {
    const props = [
      appId && `appId: '${appId}'`,
      toAddress && `toAddress: '${toAddress}'`,
      toAmount && `toAmount: '${toAmount}'`,
      toChainId && `toChainId: ${toChainId}`,
      toToken && `toToken: '${toToken}'`,
      toCalldata && `toCalldata: '${toCalldata}'`,
      paymasterUrls &&
        paymasterUrls.length > 0 &&
        `paymasterUrls: ${JSON.stringify(paymasterUrls)}`,
      renderInline !== null && `renderInline: ${renderInline}`,
      theme && `theme: '${theme}'`,
      walletOptions && `walletOptions: ${JSON.stringify(walletOptions)}`,
      gasless && `gasless: true`,
      onOriginConfirmation && `onOriginConfirmation: ${onOriginConfirmation}`,
      onDestinationConfirmation &&
        `onDestinationConfirmation: ${onDestinationConfirmation}`,
    ].filter(Boolean)

    return `<div id="trails"></div>

<script src="https://demo.trails.build/js/trails.min.js"></script>
<script>
    TrailsWidget.render(document.getElementById('trails'), {
      ${props.join(",\n       ")}
    })
</script>
`.trim()
  }

  const reactCodeExample = getReactCode()
  const scriptCodeExample = getScriptCode()

  const dark = globalTheme === "dark"

  return (
    <div className="rounded-lg p-4 sm:p-6 h-full relative bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-4 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-200">
            Integration Example
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Import and use the widget in your application.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer rounded-lg text-gray-700 dark:text-gray-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("react")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "react"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          React Component
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("script")}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
            activeTab === "script"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Script Tag
        </button>
      </div>

      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={activeTab === "react" ? "tsx" : "html"}
          style={dark ? darkSyntaxStyle : lightSyntaxStyle}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            background: dark ? "#13141c" : "rgb(250, 250, 250)",
            height: "100%",
            fontSize: "12px",
          }}
        >
          {activeTab === "react" ? reactCodeExample : scriptCodeExample}
        </SyntaxHighlighter>
      </div>
      {children}
    </div>
  )
}
