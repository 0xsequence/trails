import type {
  QuoteProvider,
  TokenBalance,
  WagmiAccount,
} from "@0xsequence/trails-sdk"
import {
  calculateIntentAddress,
  useTokenBalances,
  useTrails,
} from "@0xsequence/trails-sdk"
import { Loader2 } from "lucide-react"
import { AbiFunction, type Address } from "ox"
import { useEffect, useMemo, useState } from "react"
import type { Hex } from "viem"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import {
  MOCK_CHAIN_ID,
  MOCK_CONTRACT_ADDRESS,
  MOCK_TOKEN_ADDRESS,
  MOCK_TOKEN_AMOUNT,
  MOCK_TRANSFER_DATA,
  PAY_AMOUNT,
  PAY_CHAIN_ID,
  PAY_RECIPIENT_ADDRESS,
  PAY_TOKEN_ADDRESS,
} from "@/config"
import { AccountInfoSection } from "@/routes/orchestration-demo/components/AccountInfoSection"
import { AdvancedControlsSection } from "@/routes/orchestration-demo/components/AdvancedControlsSection"
import { ChooseActionStep } from "@/routes/orchestration-demo/components/ChooseActionStep"
import { CommitIntentStep } from "@/routes/orchestration-demo/components/CommitIntentStep"
import { IntentQuoteDisplayStep } from "@/routes/orchestration-demo/components/IntentQuoteDisplayStep"
import { OriginCallStep } from "@/routes/orchestration-demo/components/OriginCallStep"
import { RelayerStatusSection } from "@/routes/orchestration-demo/components/RelayerStatusSection"
import { SelectOriginTokenStep } from "@/routes/orchestration-demo/components/SelectOriginTokenStep"
import type { IntentAction } from "@/types"

function useOrchestrationDemo() {
  const account = useAccount()
  const {
    connectors,
    connect,
    status: connectStatus,
    error: connectError,
  } = useConnect()
  const { disconnect } = useDisconnect()
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>(null)
  const [isAutoExecuteEnabled, setIsAutoExecuteEnabled] = useState(true)
  const [showCustomCallForm, setShowCustomCallForm] = useState(false)
  const [customCallData, setCustomCallData] = useState({
    to: "",
    data: "",
    value: "0",
    chainId: PAY_CHAIN_ID.toString(),
    tokenAmount: "0",
    tokenAddress: PAY_TOKEN_ADDRESS,
  })

  const {
    metaTxns,
    intentCallsPayloads,
    intentPreconditions,
    trailsInfos,
    committedIntentAddress,
    verificationStatus,
    committedIntentConfig,
    isLoadingCommittedConfig,
    committedConfigError,
    commitIntentConfig,
    commitIntentConfigPending,
    commitIntentConfigSuccess,
    commitIntentConfigError,
    commitIntentConfigArgs,
    createIntent,
    createIntentPending,
    createIntentSuccess,
    createIntentError,
    createIntentArgs,
    sendOriginTransaction,
    isSwitchingChain,
    isTransactionInProgress,
    isChainSwitchRequired,
    isSendingTransaction,
    originCallStatus,
    isEstimatingGas,
    isWaitingForReceipt,
    hasAutoExecuted,
    updateAutoExecute,
    sendMetaTxn,
    sendMetaTxnPending,
    sendMetaTxnSuccess,
    sendMetaTxnError,
    sendMetaTxnArgs,
    clearIntent,
    metaTxnMonitorStatuses,
    updateOriginCallParams,
    originCallParams,
    originBlockTimestamp,
    metaTxnBlockTimestamps,
    trailsFee,
  } = useTrails({
    account: account as WagmiAccount,
    env: import.meta.env.VITE_ENV,
  })

  const calculatedIntentAddress = useMemo(() => {
    if (
      !account.address ||
      !intentCallsPayloads ||
      !trailsInfos ||
      !trailsFee
    ) {
      return null
    }
    return calculateIntentAddress(
      account.address,
      intentCallsPayloads as any,
      trailsInfos as any,
      trailsFee.quoteProvider as QuoteProvider,
    )
  }, [account.address, intentCallsPayloads, trailsInfos, trailsFee])

  const { sortedTokens, isLoadingBalances, balanceError } = useTokenBalances(
    account.address as Address.Address,
  )
  const [intentActionType, setIntentActionType] = useState<IntentAction | null>(
    null,
  )
  const [isManualMetaTxnEnabled, setIsManualMetaTxnEnabled] = useState(false)
  const [selectedMetaTxnId, setSelectedMetaTxnId] = useState<string | null>(
    null,
  )

  function createIntentAction(action: IntentAction) {
    if (!selectedToken || !account.address) {
      throw new Error("Missing selected token or account address")
    }

    setIntentActionType(action)

    let destinationCall
    if (action === "pay") {
      // ERC20 ABI functions
      const erc20Transfer = AbiFunction.from(
        "function transfer(address,uint256) returns (bool)",
      )
      const encodedData = AbiFunction.encodeData(erc20Transfer, [
        PAY_RECIPIENT_ADDRESS,
        PAY_AMOUNT,
      ]) as Hex

      // Ensure calldata is prefixed with 0x
      const transactionData = encodedData.startsWith("0x")
        ? encodedData
        : `0x${encodedData}`

      destinationCall = {
        chainId: PAY_CHAIN_ID,
        to: PAY_TOKEN_ADDRESS,
        transactionData,
        transactionValue: "0",
      }
    } else if (action === "custom_call") {
      // Handle custom call
      destinationCall = {
        chainId: parseInt(customCallData.chainId),
        to: customCallData.to,
        transactionData: customCallData.data.startsWith("0x")
          ? customCallData.data
          : `0x${customCallData.data}`,
        transactionValue: customCallData.value,
      }
    } else if (action === "mock_interaction") {
      // Ensure mock data is prefixed with 0x
      const transactionData = MOCK_TRANSFER_DATA.startsWith("0x")
        ? MOCK_TRANSFER_DATA
        : `0x${MOCK_TRANSFER_DATA}`
      const destinationChainId = selectedToken.chainId || 8453

      destinationCall = {
        chainId: destinationChainId,
        to: PAY_TOKEN_ADDRESS,
        transactionData,
        transactionValue: "0",
      }
    } else {
      throw new Error("Invalid action")
    }

    const args = {
      userAddress: account.address,
      originChainId: selectedToken.chainId || 8453,
      originTokenAddress: selectedToken.contractAddress,
      originTokenAmount: selectedToken.balance.toString(),
      destinationChainId:
        action === "custom_call"
          ? parseInt(customCallData.chainId)
          : action === "mock_interaction"
            ? MOCK_CHAIN_ID
            : destinationCall.chainId,
      destinationToAddress:
        action === "custom_call"
          ? customCallData.to
          : action === "mock_interaction"
            ? MOCK_CONTRACT_ADDRESS
            : destinationCall.to,
      destinationTokenAddress:
        action === "custom_call"
          ? customCallData.tokenAddress
          : action === "mock_interaction"
            ? MOCK_TOKEN_ADDRESS
            : PAY_TOKEN_ADDRESS,
      destinationTokenAmount:
        action === "custom_call"
          ? customCallData.tokenAmount
          : action === "mock_interaction"
            ? MOCK_TOKEN_AMOUNT
            : PAY_AMOUNT.toString(),
      destinationCallData:
        action === "custom_call"
          ? customCallData.data.startsWith("0x")
            ? customCallData.data
            : `0x${customCallData.data}`
          : action === "mock_interaction"
            ? MOCK_TRANSFER_DATA
            : destinationCall.transactionData,
      destinationCallValue:
        action === "custom_call"
          ? customCallData.value
          : action === "mock_interaction"
            ? MOCK_TOKEN_AMOUNT
            : destinationCall.transactionValue,
    }

    return args
  }

  function createIntentMutationAction(action: IntentAction) {
    const args = createIntentAction(action)
    createIntent(args)
  }

  // Remove disconnectCleanup and simplify account disconnection handling
  useEffect(() => {
    if (!account.isConnected) {
      setSelectedToken(null)
      clearIntent()
    }
  }, [account.isConnected, clearIntent]) // clearIntent is stable now, no need to include it

  useEffect(() => {
    updateAutoExecute(isAutoExecuteEnabled)
  }, [isAutoExecuteEnabled, updateAutoExecute])

  const handleActionClick = (action: IntentAction) => {
    clearIntent()

    setShowCustomCallForm(false)
    if (action === "custom_call") {
      setShowCustomCallForm(true)
    } else {
      createIntentMutationAction(action)
    }
  }

  const handleCustomCallSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createIntentMutationAction("custom_call")
    setShowCustomCallForm(false)
  }

  useEffect(() => {
    if (!selectedToken) {
      updateOriginCallParams(null)
      return
    }

    updateOriginCallParams({
      originChainId: selectedToken.chainId,
      tokenAddress: selectedToken.contractAddress,
    })
  }, [selectedToken, updateOriginCallParams])

  // Update button text and disabled state for commit button
  const commitButtonText = commitIntentConfigPending ? (
    <div className="flex items-center">
      <Loader2 className="animate-spin h-4 w-4 mr-2" />
      Committing...
    </div>
  ) : (
    "Commit Intent"
  )

  const isCommitButtonDisabled = Boolean(
    commitIntentConfigPending || commitIntentConfigSuccess, // Disable if commit is pending OR has already succeeded
  )

  // Update button text and disabled state for send transaction button
  const sendButtonText = isSwitchingChain ? (
    <div className="flex items-center">
      <Loader2 className="animate-spin h-4 w-4 mr-2" />
      Switching Chain...
    </div>
  ) : isSendingTransaction || isWaitingForReceipt ? (
    <div className="flex items-center">
      <Loader2 className="animate-spin h-4 w-4 mr-2" />
      {isWaitingForReceipt ? "Waiting..." : "Sending..."}
    </div>
  ) : isEstimatingGas ? (
    <div className="flex items-center">
      <Loader2 className="animate-spin h-4 w-4 mr-2" />
      Estimating Gas...
    </div>
  ) : isChainSwitchRequired ? (
    "Switch Chain"
  ) : (
    "Send Transaction"
  )

  const isSendButtonDisabled =
    !verificationStatus?.success ||
    isSendingTransaction ||
    isWaitingForReceipt ||
    !originCallParams ||
    !!originCallParams.error ||
    isSwitchingChain ||
    (isAutoExecuteEnabled && commitIntentConfigSuccess) // Disable if auto-execute is on and commit was successful

  // Replace the sendMetaTxn function with a wrapper that uses the mutation
  const handleSendMetaTxn = (selectedId: string | null) => {
    sendMetaTxn(selectedId)
  }

  function handleSendOriginCall() {
    sendOriginTransaction()
  }

  return {
    // Account Management
    account,
    connectors,
    connect,
    disconnect,
    connectStatus,
    connectError,

    // Token Management
    selectedToken,
    setSelectedToken,
    sortedTokens,
    isLoadingBalances,
    balanceError,

    // Intent State
    intentCallsPayloads,
    intentPreconditions,
    metaTxns,
    trailsInfos,
    committedIntentAddress,
    committedIntentConfig,
    verificationStatus,
    intentActionType,
    trailsFee,

    // Transaction State
    originCallParams,
    originCallStatus,
    isTransactionInProgress,
    isSendingTransaction,
    isSwitchingChain,
    isWaitingForReceipt,
    isEstimatingGas,
    isChainSwitchRequired,
    hasAutoExecuted,

    // Auto-Execute Controls
    isAutoExecuteEnabled,
    setIsAutoExecuteEnabled,

    // Meta Transaction Management
    isManualMetaTxnEnabled,
    setIsManualMetaTxnEnabled,
    selectedMetaTxnId,
    setSelectedMetaTxnId,
    metaTxnMonitorStatuses,
    sendMetaTxnPending,
    sendMetaTxnSuccess,
    sendMetaTxnError,
    sendMetaTxnArgs,

    // Custom Call Form
    showCustomCallForm,
    setShowCustomCallForm,
    customCallData,
    setCustomCallData,

    // Action Handlers
    handleActionClick,
    handleCustomCallSubmit,
    handleSendOriginCall,
    handleSendMetaTxn,
    clearIntent,

    // Intent Mutation State
    createIntentMutationAction,
    createIntentPending,
    createIntentSuccess,
    createIntentError,
    createIntentArgs,

    // Config Mutation State
    commitIntentConfig,
    commitIntentConfigPending,
    commitIntentConfigSuccess,
    commitIntentConfigError,
    commitIntentConfigArgs,
    isLoadingCommittedConfig,
    committedConfigError,

    // UI State
    sendButtonText,
    isSendButtonDisabled,
    commitButtonText,
    isCommitButtonDisabled,

    calculatedIntentAddress,
    originBlockTimestamp,
    metaTxnBlockTimestamps,
  }
}

export const OrchestrationDemo = () => {
  const {
    // Account Management
    account,
    connectors,
    connect,
    disconnect,
    connectStatus,
    connectError,

    // Token Management
    selectedToken,
    setSelectedToken,
    sortedTokens,
    isLoadingBalances,
    balanceError,

    // Intent State
    intentCallsPayloads,
    intentPreconditions,
    metaTxns,
    trailsInfos,
    committedIntentAddress,
    committedIntentConfig,
    verificationStatus,
    intentActionType,
    trailsFee,

    // Transaction State
    originCallParams,
    originCallStatus,
    isWaitingForReceipt,

    // Auto-Execute Controls
    isAutoExecuteEnabled,
    setIsAutoExecuteEnabled,

    // Meta Transaction Management
    isManualMetaTxnEnabled,
    setIsManualMetaTxnEnabled,
    selectedMetaTxnId,
    setSelectedMetaTxnId,
    metaTxnMonitorStatuses,

    // Custom Call Form
    showCustomCallForm,
    setShowCustomCallForm,
    customCallData,
    setCustomCallData,

    // Action Handlers
    handleActionClick,
    handleCustomCallSubmit,
    handleSendOriginCall,
    handleSendMetaTxn,
    clearIntent,

    // Intent Mutation State
    createIntentPending,
    createIntentError,
    createIntentArgs,

    // Config Mutation State
    commitIntentConfig,
    commitIntentConfigSuccess,
    commitIntentConfigError,
    isLoadingCommittedConfig,
    committedConfigError,
    // commitIntentConfigPending,
    // commitIntentConfigArgs,

    // UI State
    sendButtonText,
    isSendButtonDisabled,
    commitButtonText,
    isCommitButtonDisabled,

    calculatedIntentAddress,
    sendMetaTxnPending,
    originBlockTimestamp,
    metaTxnBlockTimestamps,
  } = useOrchestrationDemo()

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
          Trails Demo
        </h1>
        <p className="text-gray-300 text-sm px-4">
          Connect your wallet and explore cross-chain intents
        </p>
      </div>

      {/* Account Info & Connect/Disconnect - Standalone Card */}
      <AccountInfoSection
        account={account}
        connectors={connectors}
        connect={connect}
        disconnect={disconnect}
        connectStatus={connectStatus}
        connectError={connectError}
      />

      {/* Main Workflow Card - Container for Steps 2-6 */}
      {account.status === "connected" && (
        <div className="bg-gray-800/80 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm space-y-4 sm:space-y-6 transition-all duration-300 hover:shadow-blue-900/20 mb-6">
          {/* Step 2: Select Origin Token */}
          <SelectOriginTokenStep
            isLoadingBalances={isLoadingBalances}
            balanceError={balanceError}
            sortedTokens={sortedTokens}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            clearIntent={clearIntent}
          />

          {/* Step 3: Choose Action */}
          <ChooseActionStep
            isAutoExecuteEnabled={isAutoExecuteEnabled}
            setIsAutoExecuteEnabled={setIsAutoExecuteEnabled}
            handleActionClick={handleActionClick}
            selectedToken={selectedToken}
            createIntentPending={createIntentPending}
            intentActionType={intentActionType}
            createIntentArgs={createIntentArgs}
            showCustomCallForm={showCustomCallForm}
            setShowCustomCallForm={setShowCustomCallForm}
            customCallData={customCallData}
            setCustomCallData={setCustomCallData}
            handleCustomCallSubmit={handleCustomCallSubmit}
          />

          {/* Step 4: Intent Quote Display */}
          <IntentQuoteDisplayStep
            createIntentPending={createIntentPending}
            createIntentError={createIntentError}
            intentCallsPayloads={intentCallsPayloads}
            intentPreconditions={intentPreconditions}
            metaTxns={metaTxns}
            trailsInfos={trailsInfos}
            trailsFee={trailsFee}
            intentActionType={intentActionType}
            selectedToken={selectedToken}
            account={account as any}
            calculatedIntentAddress={calculatedIntentAddress}
            customCallData={customCallData}
          />

          {/* Step 5: Commit Intent */}
          <CommitIntentStep
            intentCallsPayloads={intentCallsPayloads}
            intentPreconditions={intentPreconditions}
            trailsInfos={trailsInfos}
            trailsFee={trailsFee}
            verificationStatus={verificationStatus}
            commitIntentConfigError={commitIntentConfigError}
            commitIntentConfigSuccess={commitIntentConfigSuccess}
            committedIntentAddress={committedIntentAddress}
            isLoadingCommittedConfig={isLoadingCommittedConfig}
            committedConfigError={committedConfigError}
            committedIntentConfigData={committedIntentConfig}
            commitIntentConfig={commitIntentConfig}
            isCommitButtonDisabled={isCommitButtonDisabled}
            commitButtonText={commitButtonText}
            calculatedIntentAddress={calculatedIntentAddress}
            accountAddress={account?.address}
          />

          {/* Step 6: Origin Call - Replace with Component */}
          <OriginCallStep
            intentCallsPayloads={intentCallsPayloads}
            intentPreconditions={intentPreconditions}
            accountAddress={account?.address}
            originCallParams={originCallParams}
            isSendButtonDisabled={isSendButtonDisabled}
            sendButtonText={sendButtonText}
            handleSendOriginCall={handleSendOriginCall}
          />

          {/* Replace Preview Calculated Address and Manual Meta Txn Controls with Component */}
          <AdvancedControlsSection
            accountAddress={account?.address}
            intentCallsPayloads={intentCallsPayloads}
            metaTxns={metaTxns}
            calculatedIntentAddress={calculatedIntentAddress}
            intentActionType={intentActionType}
            customCallData={customCallData}
            isManualMetaTxnEnabled={isManualMetaTxnEnabled}
            setIsManualMetaTxnEnabled={setIsManualMetaTxnEnabled}
            selectedMetaTxnId={selectedMetaTxnId}
            setSelectedMetaTxnId={setSelectedMetaTxnId}
            handleSendMetaTxn={handleSendMetaTxn}
            sendMetaTxnPending={sendMetaTxnPending}
          />
        </div>
      )}

      {account.status === "connected" && (
        <RelayerStatusSection
          originCallStatus={originCallStatus}
          isWaitingForReceipt={isWaitingForReceipt}
          metaTxns={metaTxns}
          metaTxnMonitorStatuses={metaTxnMonitorStatuses}
          originBlockTimestamp={originBlockTimestamp}
          metaTxnBlockTimestamps={metaTxnBlockTimestamps}
          originCallParams={originCallParams}
        />
      )}
    </div>
  )
}
