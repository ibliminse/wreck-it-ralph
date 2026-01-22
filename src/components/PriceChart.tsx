"use client";

import { useRef, useEffect, useState } from "react";
import { createChart, IChartApi, ISeriesApi, LineData, Time, LineSeries } from "lightweight-charts";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useTokenData, formatPrice } from "@/hooks/useTokenData";
import { useHistoricalData } from "@/hooks/useHistoricalData";
import { LINKS } from "@/lib/constants";

function TokenChart({
  variant,
  currentPrice,
  priceLoading,
}: {
  variant: "wreckit" | "ralph";
  currentPrice: number;
  priceLoading: boolean;
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [chartReady, setChartReady] = useState(false);
  const [timeframe, setTimeframe] = useState("1H");

  const { data: historicalData, loading: historyLoading, error } = useHistoricalData(variant, timeframe);

  const color = variant === "wreckit" ? "#f97316" : "#3b82f6";
  const dexLink = variant === "wreckit" ? LINKS.WRECKIT.dexscreener : LINKS.RALPH.dexscreener;

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 220,
      layout: {
        background: { color: "transparent" },
        textColor: "#9ca3af",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        horzLine: { visible: true, color: "rgba(255,255,255,0.1)" },
        vertLine: { color: "rgba(255,255,255,0.1)" },
      },
      handleScale: true,
      handleScroll: true,
    });

    const series = chart.addSeries(LineSeries, {
      color,
      lineWidth: 2,
      priceLineVisible: true,
      lastValueVisible: true,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
    });

    chartRef.current = chart;
    seriesRef.current = series;
    setChartReady(true);

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [color]);

  // Update chart with historical data
  useEffect(() => {
    if (!seriesRef.current || !chartReady || historyLoading) return;

    if (historicalData.length > 0) {
      const chartData: LineData[] = historicalData.map((item) => ({
        time: item.time as Time,
        value: item.value,
      }));

      seriesRef.current.setData(chartData);
      chartRef.current?.timeScale().fitContent();
    }
  }, [historicalData, chartReady, historyLoading]);

  // Calculate 24h change from historical data
  const priceChange = historicalData.length > 1
    ? ((historicalData[historicalData.length - 1]?.value - historicalData[0]?.value) / historicalData[0]?.value) * 100
    : 0;

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold text-[var(--text-primary)]">
            {variant === "wreckit" ? "$WRECKIT" : "$RALPH"}
          </span>
          {!priceLoading && currentPrice > 0 && (
            <span className="text-sm font-mono text-[var(--text-secondary)]">
              {formatPrice(currentPrice)}
            </span>
          )}
          {historicalData.length > 1 && (
            <span
              className={`text-xs font-medium ${
                priceChange >= 0 ? "text-[var(--accent-success)]" : "text-[var(--accent-error)]"
              }`}
            >
              {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Timeframe selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded px-2 py-1 text-[var(--text-secondary)]"
          >
            <option value="15m">15m</option>
            <option value="1H">1H</option>
            <option value="4H">4H</option>
            <option value="1D">1D</option>
          </select>
          <a
            href={dexLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            DexScreener →
          </a>
        </div>
      </div>

      <div ref={chartContainerRef} className="w-full" />

      {historyLoading && (
        <div className="flex items-center justify-center h-[220px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" style={{ color }} />
            <span className="text-xs text-[var(--text-muted)]">Loading chart...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center text-xs text-[var(--accent-error)] mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

export function PriceChart() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { wreckit, ralph, loading } = useTokenData(5000);

  return (
    <section
      id="charts"
      ref={sectionRef}
      className="py-20 md:py-32 bg-[var(--bg-deep)]"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Price Charts
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            24-hour price history powered by Birdeye. Select timeframe for different views.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <TokenChart
            variant="wreckit"
            currentPrice={wreckit?.price || 0}
            priceLoading={loading}
          />
          <TokenChart
            variant="ralph"
            currentPrice={ralph?.price || 0}
            priceLoading={loading}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-[var(--text-muted)] mt-6"
        >
          Data from Birdeye API • Updates every 5 minutes
        </motion.p>
      </div>
    </section>
  );
}
