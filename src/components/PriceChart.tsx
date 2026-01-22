"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { createChart, IChartApi, ISeriesApi, LineData, Time, LineSeries } from "lightweight-charts";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useTokenData, formatPrice } from "@/hooks/useTokenData";
import { LINKS } from "@/lib/constants";

interface PricePoint {
  time: Time;
  value: number;
}

function TokenChart({
  variant,
  price,
  isLoading,
}: {
  variant: "wreckit" | "ralph";
  price: number;
  isLoading: boolean;
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const priceDataRef = useRef<PricePoint[]>([]);
  const [chartReady, setChartReady] = useState(false);

  const color = variant === "wreckit" ? "#f97316" : "#3b82f6";
  const dexLink = variant === "wreckit" ? LINKS.WRECKIT.dexscreener : LINKS.RALPH.dexscreener;

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 200,
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
        horzLine: { visible: false },
        vertLine: { color: "rgba(255,255,255,0.1)" },
      },
      handleScale: false,
      handleScroll: false,
    });

    const series = chart.addSeries(LineSeries, {
      color,
      lineWidth: 2,
      priceLineVisible: false,
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

  // Update data when price changes
  useEffect(() => {
    if (!seriesRef.current || !chartReady || isLoading || price === 0) return;

    const now = Math.floor(Date.now() / 1000) as Time;
    const newPoint: PricePoint = { time: now, value: price };

    // Add to our data array
    priceDataRef.current = [...priceDataRef.current, newPoint].slice(-100); // Keep last 100 points

    // Update the chart
    seriesRef.current.setData(priceDataRef.current as LineData[]);

    // Fit content
    chartRef.current?.timeScale().fitContent();
  }, [price, chartReady, isLoading]);

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
        </div>
        <div className="flex items-center gap-3">
          {!isLoading && price > 0 && (
            <span className="text-sm font-mono text-[var(--text-secondary)]">
              {formatPrice(price)}
            </span>
          )}
          <a
            href={dexLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            Full chart →
          </a>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full" />
      {priceDataRef.current.length < 3 && (
        <div className="text-center text-xs text-[var(--text-muted)] mt-2">
          Collecting live data...
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
            Live Price Charts
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Real-time price updates as they happen. Click "Full chart" for historical data on DexScreener.
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
            price={wreckit?.price || 0}
            isLoading={loading}
          />
          <TokenChart
            variant="ralph"
            price={ralph?.price || 0}
            isLoading={loading}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-[var(--text-muted)] mt-6"
        >
          Charts show live price movements during your session. Historical data available on DexScreener.
        </motion.p>
      </div>
    </section>
  );
}
