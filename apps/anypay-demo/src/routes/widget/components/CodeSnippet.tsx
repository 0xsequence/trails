import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeSnippetProps {
  children: React.ReactNode
  toRecipient: string
  toAmount: string
  toChainId: number | undefined
  toToken: string | undefined
  toCalldata: string
  useCustomButton: boolean | null
  renderInline: boolean | null
  theme: "light" | "dark" | "auto" | null
  walletOptions: string[] | null
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  children,
  toRecipient,
  toAmount,
  toChainId,
  toToken,
  toCalldata,
  useCustomButton,
  renderInline,
  theme,
  walletOptions,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExample)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getCode = () => {
    const props = [
      toRecipient && `toRecipient="${toRecipient}"`,
      toAmount && `toAmount="${toAmount}"`,
      toChainId && `toChainId={${toChainId}}`,
      toToken && `toToken="${toToken}"`,
      toCalldata && `toCalldata="${toCalldata}"`,
      renderInline !== null && `renderInline={${renderInline}}`,
      theme && `theme="${theme}"`,
      walletOptions && `walletOptions={${JSON.stringify(walletOptions)}}`,
    ].filter(Boolean)

    return `import { AnyPayWidget } from '@0xsequence/anypay-sdk/widget'

export const App = () => {
  return (${
    useCustomButton
      ? `
    <AnyPayWidget
      sequenceApiKey={'key_123...'}${props.join("\n      ")}
    >
      <button className="custom-button-styles">
        Pay with AnyPay
      </button>
    </AnyPayWidget>`
      : `
    <AnyPayWidget
      sequenceApiKey={'key_123...'}${props.join("\n      ")}
    />`
  }
  )
}`
  }

  const codeExample = getCode()

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-200">
            Integration Example
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Import and use the widget in your React application.
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-lg text-gray-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            background: "#1a1a1a",
            height: "100%",
          }}
        >
          {codeExample}
        </SyntaxHighlighter>
      </div>
      {children}
    </div>
  )
}
