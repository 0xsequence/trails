import { useState } from "react"
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
} from "wagmi"

export function ProviderProxyDemo() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransaction, isPending } = useSendTransaction()
  const [amount, setAmount] = useState("0.001")

  const handleSendTransaction = async () => {
    console.log(
      "[trails-demo provider-proxy-demo] Sending transaction",
      "address",
      address,
      "amount",
      amount,
    )
    if (!address) return

    try {
      const result = await sendTransaction({
        to: address, // Send to self for demo
        value: BigInt(parseFloat(amount) * 10 ** 18),
      })
      console.log(
        "[trails-demo provider-proxy-demo] ransaction result:",
        result,
      )
    } catch (error) {
      console.error(
        "[trails-demo provider-proxy-demo] Transaction failed:",
        error,
      )
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Provider Proxy Demo
          </h2>
          <p className="text-sm text-gray-600">Test Trails proxy provider</p>
        </div>

        {!isConnected ? (
          <div className="space-y-4">
            <div>
              <p className="block text-sm font-medium text-gray-900 mb-3">
                Connect your wallet to start:
              </p>
              <div className="space-y-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    type="button"
                    onClick={() => {
                      console.log("🔍 Connecting to:", connector.name)
                      connect({ connector })
                    }}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                  >
                    Connect {connector.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Connected:</span>{" "}
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Amount (ETH)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                step="0.001"
                min="0"
                placeholder="0.001"
              />
            </div>

            <button
              type="button"
              onClick={handleSendTransaction}
              disabled={isPending}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Sending..." : "Send Transaction"}
            </button>

            <button
              type="button"
              onClick={() => disconnect()}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
            >
              Disconnect
            </button>
          </div>
        )}

        <div className="pt-6 border-t border-gray-200">
          <details className="group">
            <summary className="flex items-center cursor-pointer list-none py-2">
              <span className="text-sm font-medium text-gray-900">
                How it works
              </span>
              <span className="text-gray-500 text-lg font-medium group-open:hidden ml-2">
                +
              </span>
              <span className="text-gray-500 text-lg font-medium hidden group-open:inline ml-2">
                −
              </span>
            </summary>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Connect your wallet using the button above
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Enter an amount and click "Send Transaction"
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  Check the browser console to see transaction logs
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  The transaction will be logged before being sent
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
