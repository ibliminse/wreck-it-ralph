"use client";

import { useState, useEffect, useCallback } from "react";

export interface TokenData {
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  txns24h: {
    buys: number;
    sells: number;
  };
}

export interface TokenPair {
  wreckit: TokenData | null;
  ralph: TokenData | null;
  loading: boolean;
  error: string | null;
  lastFetch: Date | null;
}

export function useTokenData(refreshInterval = 10000): TokenPair {
  const [data, setData] = useState<TokenPair>({
    wreckit: null,
    ralph: null,
    loading: true,
    error: null,
    lastFetch: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/tokens");

      if (!res.ok) {
        throw new Error("Failed to fetch token data");
      }

      const json = await res.json();

      setData({
        wreckit: json.wreckit,
        ralph: json.ralph,
        loading: false,
        error: null,
        lastFetch: new Date(),
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return data;
}

// Utility functions for formatting
export function formatPrice(price: number): string {
  if (price === 0) return "$0.00";
  if (price < 0.00001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
}

export function formatLargeNumber(num: number): string {
  if (num === 0) return "$0";
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

export function formatPercentage(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}
