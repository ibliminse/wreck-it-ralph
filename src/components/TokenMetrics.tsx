"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTokenData, formatPrice, formatLargeNumber, formatPercentage } from "@/hooks/useTokenData";
import { AnimatedNumber } from "./AnimatedNumber";
import { LINKS } from "@/lib/constants";

function MetricRow({
  label,
  wreckitValue,
  ralphValue,
  format,
  delay = 0,
}: {
  label: string;
  wreckitValue: number;
  ralphValue: number;
  format: (n: number) => string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Determine which is higher
  const wreckitHigher = wreckitValue > ralphValue;
  const ralphHigher = ralphValue > wreckitValue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="grid grid-cols-3 gap-4 py-4 border-b border-[var(--border-subtle)] last:border-0"
    >
      <div className="text-sm font-medium text-[var(--text-muted)]">{label}</div>
      <div
        className={`text-sm font-mono text-right ${
          wreckitHigher ? "text-[var(--wreckit-primary)]" : "text-[var(--text-secondary)]"
        }`}
      >
        <AnimatedNumber value={wreckitValue} format={format} />
      </div>
      <div
        className={`text-sm font-mono text-right ${
          ralphHigher ? "text-[var(--ralph-primary)]" : "text-[var(--text-secondary)]"
        }`}
      >
        <AnimatedNumber value={ralphValue} format={format} />
      </div>
    </motion.div>
  );
}

function RatioBar({
  label,
  wreckitValue,
  ralphValue,
  delay = 0,
}: {
  label: string;
  wreckitValue: number;
  ralphValue: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const total = wreckitValue + ralphValue;
  const wreckitPct = total > 0 ? (wreckitValue / total) * 100 : 50;
  const ralphPct = total > 0 ? (ralphValue / total) * 100 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-[var(--text-muted)]">{label}</span>
        <span className="text-[var(--text-secondary)]">
          {wreckitPct.toFixed(1)}% vs {ralphPct.toFixed(1)}%
        </span>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden bg-[var(--bg-elevated)]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${wreckitPct}%` } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[var(--wreckit-primary)]"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${ralphPct}%` } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[var(--ralph-primary)]"
        />
      </div>
    </motion.div>
  );
}

export function TokenMetrics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { wreckit, ralph, loading, lastFetch } = useTokenData(5000);

  return (
    <section
      id="tokens"
      className="py-20 md:py-32 snap-section bg-[var(--bg-surface)]"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The Tokens
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Live market data for both tokens. Updated every 5 seconds.
          </p>

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[var(--text-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-success)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-success)]"></span>
            </span>
            <span>Real-time data from DexScreener</span>
          </div>
        </motion.div>

        {/* Main comparison card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="card p-6 md:p-8 mb-8"
        >
          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div className="text-sm font-medium text-[var(--text-muted)]">Metric</div>
            <div className="text-sm font-semibold text-[var(--wreckit-primary)] text-right">
              $WRECKIT
            </div>
            <div className="text-sm font-semibold text-[var(--ralph-primary)] text-right">
              $RALPH
            </div>
          </div>

          {/* Metrics */}
          <div className="py-2">
            <MetricRow
              label="Price"
              wreckitValue={wreckit?.price || 0}
              ralphValue={ralph?.price || 0}
              format={formatPrice}
              delay={0.1}
            />
            <MetricRow
              label="24h Change"
              wreckitValue={wreckit?.priceChange24h || 0}
              ralphValue={ralph?.priceChange24h || 0}
              format={(n) => formatPercentage(n)}
              delay={0.15}
            />
            <MetricRow
              label="Market Cap"
              wreckitValue={wreckit?.marketCap || 0}
              ralphValue={ralph?.marketCap || 0}
              format={formatLargeNumber}
              delay={0.2}
            />
            <MetricRow
              label="24h Volume"
              wreckitValue={wreckit?.volume24h || 0}
              ralphValue={ralph?.volume24h || 0}
              format={formatLargeNumber}
              delay={0.25}
            />
            <MetricRow
              label="Liquidity"
              wreckitValue={wreckit?.liquidity || 0}
              ralphValue={ralph?.liquidity || 0}
              format={formatLargeNumber}
              delay={0.3}
            />
            <MetricRow
              label="24h Transactions"
              wreckitValue={(wreckit?.txns24h.buys || 0) + (wreckit?.txns24h.sells || 0)}
              ralphValue={(ralph?.txns24h.buys || 0) + (ralph?.txns24h.sells || 0)}
              format={(n) => n.toLocaleString()}
              delay={0.35}
            />
          </div>
        </motion.div>

        {/* Ratio visualizations */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Market Share</h3>
            <RatioBar
              label="Market Cap"
              wreckitValue={wreckit?.marketCap || 0}
              ralphValue={ralph?.marketCap || 0}
              delay={0.5}
            />
            <RatioBar
              label="24h Volume"
              wreckitValue={wreckit?.volume24h || 0}
              ralphValue={ralph?.volume24h || 0}
              delay={0.55}
            />
            <RatioBar
              label="Liquidity"
              wreckitValue={wreckit?.liquidity || 0}
              ralphValue={ralph?.liquidity || 0}
              delay={0.6}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Take</h3>
            <div className="space-y-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--ralph-primary)] mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-[var(--text-primary)]">$RALPH</strong> is the established
                  player with more liquidity and market cap. Lower risk, proven track record.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--wreckit-primary)] mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-[var(--text-primary)]">$WRECKIT</strong> is newer with a
                  smaller cap. Higher risk, but potentially more room to grow if the tool gains
                  traction.
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-[var(--text-muted)] text-xs">
                  Not financial advice. DYOR. Both tokens can go to zero.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trade CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={LINKS.WRECKIT.trade}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wreckit"
          >
            Trade $WRECKIT
          </a>
          <a
            href={LINKS.RALPH.trade}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ralph"
          >
            Trade $RALPH
          </a>
        </motion.div>
      </div>
    </section>
  );
}
