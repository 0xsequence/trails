export function findPreconditionAddresses(preconditions, originChainId, destinationChainId) {
    const origin = preconditions.find((p) => p.chainId === originChainId.toString() && p.data?.address);
    const destination = preconditions.find((p) => p.chainId === destinationChainId.toString() && p.data?.address);
    return {
        originAddress: origin?.data?.address,
        destinationAddress: destination?.data?.address,
    };
}
export function findChainAndAddressesFromPreconditions(preconditions) {
    const addressesFromPreconditions = [];
    preconditions.forEach((p) => {
        if ((p.type === "erc20-balance" ||
            p.type === "native-balance" ||
            p.type === "transfer-native") &&
            p.data?.address &&
            p.chainId) {
            addressesFromPreconditions.push({
                chainId: parseInt(p.chainId),
                address: p.data.address,
            });
        }
    });
    return addressesFromPreconditions;
}
export function findFirstPreconditionForChainId(preconditions, chainId) {
    const precondition = preconditions.find((p) => (p.type === "erc20-balance" || p.type === "native-balance") &&
        p.chainId === chainId?.toString());
    return precondition ?? null;
}
