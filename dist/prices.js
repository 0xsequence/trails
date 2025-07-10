import { useQuery } from "@tanstack/react-query";
export const getTokenPrices = async (apiClient, tokens) => {
    if (tokens.length === 0) {
        return [];
    }
    const res = await apiClient.getCoinPrices({ tokens });
    return res?.tokenPrices || [];
};
export const getTokenPrice = async (apiClient, token) => {
    const res = await apiClient.getCoinPrices({ tokens: [token] });
    return res?.tokenPrices?.[0] || null;
};
export const useTokenPrices = (tokens, apiClient) => {
    return useQuery({
        queryKey: ["coinPrices", tokens],
        queryFn: () => {
            return getTokenPrices(apiClient, tokens);
        },
        retry: true,
        staleTime: 60_000,
        enabled: tokens.length > 0,
    });
};
export const useTokenPrice = (token, apiClient) => {
    return useQuery({
        queryKey: ["coinPrice", token],
        queryFn: () => (token ? getTokenPrice(apiClient, token) : null),
        enabled: !!token,
        retry: true,
        staleTime: 60_000,
    });
};
