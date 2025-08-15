import { useState, useEffect, useCallback } from "react";
const RECENT_TOKENS_KEY = "trails_recent_tokens";
const MAX_RECENT_TOKENS = 10;
export function useRecentTokens(accountAddress) {
    const [recentTokens, setRecentTokens] = useState([]);
    // Load recent tokens from localStorage for the current account
    useEffect(() => {
        if (!accountAddress) {
            setRecentTokens([]);
            return;
        }
        try {
            const stored = localStorage.getItem(RECENT_TOKENS_KEY);
            if (stored) {
                const allRecentTokens = JSON.parse(stored);
                const accountTokens = allRecentTokens[accountAddress.toLowerCase()] || [];
                setRecentTokens(accountTokens);
            }
        }
        catch (error) {
            console.warn("Failed to load recent tokens from localStorage:", error);
        }
    }, [accountAddress]);
    // Add or update a recent token
    const addRecentToken = useCallback((token) => {
        if (!accountAddress)
            return;
        try {
            const stored = localStorage.getItem(RECENT_TOKENS_KEY);
            const allRecentTokens = stored
                ? JSON.parse(stored)
                : {};
            const accountKey = accountAddress.toLowerCase();
            let accountTokens = allRecentTokens[accountKey] || [];
            // Remove the token if it already exists (to avoid duplicates)
            accountTokens = accountTokens.filter((t) => !(t.contractAddress === token.contractAddress &&
                t.chainId === token.chainId));
            // Add the token to the beginning (most recent)
            accountTokens.unshift(token);
            // Keep only the most recent tokens
            accountTokens = accountTokens.slice(0, MAX_RECENT_TOKENS);
            // Update storage
            allRecentTokens[accountKey] = accountTokens;
            localStorage.setItem(RECENT_TOKENS_KEY, JSON.stringify(allRecentTokens));
            // Update state
            setRecentTokens(accountTokens);
        }
        catch (error) {
            console.warn("Failed to save recent token to localStorage:", error);
        }
    }, [accountAddress]);
    // Clear recent tokens for current account
    const clearRecentTokens = useCallback(() => {
        if (!accountAddress)
            return;
        try {
            const stored = localStorage.getItem(RECENT_TOKENS_KEY);
            if (stored) {
                const allRecentTokens = JSON.parse(stored);
                const accountKey = accountAddress.toLowerCase();
                delete allRecentTokens[accountKey];
                localStorage.setItem(RECENT_TOKENS_KEY, JSON.stringify(allRecentTokens));
            }
            setRecentTokens([]);
        }
        catch (error) {
            console.warn("Failed to clear recent tokens from localStorage:", error);
        }
    }, [accountAddress]);
    return {
        recentTokens,
        addRecentToken,
        clearRecentTokens,
    };
}
