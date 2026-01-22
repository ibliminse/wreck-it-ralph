"use client";

import { useState, useEffect, useCallback } from "react";

export interface OHLCVData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  value: number;
  volume: number;
}

export interface HistoricalData {
  data: OHLCVData[];
  loading: boolean;
  error: string | null;
}

export function useHistoricalData(
  token: "wreckit" | "ralph",
  timeframe: string = "1H"
): HistoricalData {
  const [state, setState] = useState<HistoricalData>({
    data: [],
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const res = await fetch(`/api/history?token=${token}&timeframe=${timeframe}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch history");
      }

      const json = await res.json();

      setState({
        data: json.data || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, [token, timeframe]);

  useEffect(() => {
    fetchData();

    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return state;
}
