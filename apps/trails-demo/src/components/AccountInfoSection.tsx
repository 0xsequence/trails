import { Button, NetworkImage, Text } from "@0xsequence/design-system"
import { AlertTriangle } from "lucide-react"
import type { Address } from "viem"
import type { Connector, UseAccountReturnType, useConnect } from "wagmi"
import { SectionHeader } from "@/components/SectionHeader"

interface AccountInfoSectionProps {
  account: {
    address?: Address
    chainId?: number
    status: UseAccountReturnType["status"]
  }
  connectors: readonly Connector[]
  connect: (args: { connector: Connector; chainId?: number }) => void
  disconnect: () => void
  connectStatus: ReturnType<typeof useConnect>["status"]
  connectError?: Error | null
}

export const AccountInfoSection = ({
  account,
  connectors,
  connect,
  disconnect,
  connectStatus,
  connectError,
}: AccountInfoSectionProps) => {
  return (
    <SectionHeader
      className="bg-gray-800/80 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-900/20 mb-6"
      titleContainerClassName="p-4 sm:p-6 flex items-center justify-between w-full"
      contentContainerClassName="p-4 sm:p-6 pt-0"
      title={
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mr-2 shadow-lg text-sm sm:text-base">
            <span>1</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Account
          </h3>
        </div>
      }
      statusPill={
        <div className="px-2 sm:px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-xs sm:text-sm flex items-center">
          <span
            className={`w-2 h-2 rounded-full ${account.status === "connected" ? "bg-green-400" : "bg-yellow-400"} mr-2 animate-pulse`}
          ></span>
          {account.status === "connected" ? "Connected" : "Disconnected"}
        </div>
      }
    >
      {account.status === "connected" ? (
        <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-700/30 space-y-3 sm:space-y-2 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <Text
              variant="small"
              color="secondary"
              className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0"
            >
              <span className="text-blue-300 font-semibold mr-0 sm:mr-2">
                Address:
              </span>
              <span className="font-mono bg-gray-800/70 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm break-all">
                {account.address}
              </span>
            </Text>
            <Button
              variant="danger"
              size="sm"
              onClick={() => disconnect()}
              className="px-3 sm:px-5 py-2 w-full sm:w-auto"
            >
              Disconnect
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Text
              variant="small"
              color="secondary"
              className="flex items-center"
            >
              <span className="text-blue-300 font-semibold mr-2">Chain:</span>
              <div className="flex items-center">
                <NetworkImage
                  chainId={Number(account.chainId)}
                  size="sm"
                  className="w-4 h-4 mr-1"
                />
                <span className="font-mono bg-gray-800/70 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {account.chainId}
                </span>
              </div>
            </Text>
            <Text
              variant="small"
              color="secondary"
              className="flex items-center"
            >
              <span className="text-blue-300 font-semibold mr-2">Status:</span>
              <span className="text-green-400 font-mono bg-green-900/20 px-2 sm:px-3 py-1 rounded-full border border-green-700/30 text-xs sm:text-sm">
                {account.status}
              </span>
            </Text>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-gray-700/30">
          <Text variant="small" color="secondary" className="mb-3">
            Select a wallet to connect:
          </Text>
          <div className="flex flex-wrap gap-2 mb-4">
            {connectors.map((connector: Connector) => (
              <Button
                key={connector.uid}
                variant="primary"
                size="sm"
                onClick={() => connect({ connector })}
                className="px-3 sm:px-5 py-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md text-sm"
              >
                {connector.name}
              </Button>
            ))}
          </div>
          <div className="mt-3 bg-gray-800/70 p-2 sm:p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <Text
              variant="small"
              color="secondary"
              className="flex items-center"
            >
              <span className="text-blue-300 font-semibold mr-2">Status:</span>
              <span className="text-yellow-400 font-mono text-xs sm:text-sm">
                {account.status}
                {connectStatus === "pending" && (
                  <span className="ml-1">(Connecting...)</span>
                )}
              </span>
            </Text>
            {connectError && (
              <Text
                variant="small"
                color="negative"
                className="flex items-center text-xs sm:text-sm"
              >
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {connectError.message}
              </Text>
            )}
          </div>
        </div>
      )}
    </SectionHeader>
  )
}
