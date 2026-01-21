"use client";

import { motion } from "framer-motion";
import { useTokenData, formatPrice, formatLargeNumber, formatPercentage } from "@/hooks/useTokenData";
import { AnimatedNumber } from "./AnimatedNumber";
import { LINKS } from "@/lib/constants";

function MetricCard({
  label,
  value,
  format,
  change,
  variant = "neutral",
  delay = 0,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  change?: number;
  variant?: "wreckit" | "ralph" | "neutral";
  delay?: number;
}) {
  const bgClass =
    variant === "wreckit"
      ? "bg-[var(--wreckit-subtle)] border-[var(--wreckit-primary)]/20"
      : variant === "ralph"
      ? "bg-[var(--ralph-subtle)] border-[var(--ralph-primary)]/20"
      : "bg-[var(--bg-surface)] border-[var(--border-subtle)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`p-4 md:p-5 rounded-xl border ${bgClass} backdrop-blur-sm`}
    >
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl md:text-2xl font-semibold data-value">
          <AnimatedNumber value={value} format={format} />
        </span>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change >= 0 ? "text-[var(--accent-success)]" : "text-[var(--accent-error)]"
            }`}
          >
            {formatPercentage(change)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function TokenHeader({
  name,
  symbol,
  price,
  change,
  variant,
  delay = 0,
}: {
  name: string;
  symbol: string;
  price: number;
  change: number;
  variant: "wreckit" | "ralph";
  delay?: number;
}) {
  const gradientClass = variant === "wreckit" ? "text-gradient-wreckit" : "text-gradient-ralph";
  const glowClass = variant === "wreckit" ? "glow-wreckit" : "glow-ralph";

  return (
    <motion.div
      initial={{ opacity: 0, x: variant === "wreckit" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div
        className={`inline-block px-4 py-1.5 rounded-full border ${
          variant === "wreckit"
            ? "border-[var(--wreckit-primary)]/30 bg-[var(--wreckit-subtle)]"
            : "border-[var(--ralph-primary)]/30 bg-[var(--ralph-subtle)]"
        } mb-3`}
      >
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {variant === "wreckit" ? "The Evolution" : "The Pioneer"}
        </span>
      </div>

      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold ${gradientClass} mb-2`}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {symbol}
      </h2>

      <div className="flex items-center justify-center gap-3">
        <span className="text-2xl md:text-3xl font-semibold data-value">
          <AnimatedNumber value={price} format={formatPrice} />
        </span>
        <span
          className={`text-lg font-medium ${
            change >= 0 ? "text-[var(--accent-success)]" : "text-[var(--accent-error)]"
          }`}
        >
          {formatPercentage(change)}
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { wreckit, ralph, loading, lastFetch } = useTokenData(5000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 snap-section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-surface)] to-[var(--bg-deep)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px),
                           linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--wreckit-primary)] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--ralph-primary)] rounded-full blur-[150px] opacity-10" />

      <div className="container relative z-10">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--text-primary)] mb-4 md:mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The AI Coding
            <br />
            <span className="text-gradient-wreckit">Revolution</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            RALPH started it. WRECKIT is taking it further.
            <br className="hidden md:block" />
            Live data. Real tools. Same mission.
          </p>
        </motion.div>

        {/* Token comparison dashboard */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* WRECKIT Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <TokenHeader
              name="WRECKIT"
              symbol="$WRECKIT"
              price={wreckit?.price || 0}
              change={wreckit?.priceChange24h || 0}
              variant="wreckit"
              delay={0.3}
            />

            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label="Market Cap"
                value={wreckit?.marketCap || 0}
                format={formatLargeNumber}
                variant="wreckit"
                delay={0.4}
              />
              <MetricCard
                label="24h Volume"
                value={wreckit?.volume24h || 0}
                format={formatLargeNumber}
                variant="wreckit"
                delay={0.45}
              />
              <MetricCard
                label="Liquidity"
                value={wreckit?.liquidity || 0}
                format={formatLargeNumber}
                variant="wreckit"
                delay={0.5}
              />
              <MetricCard
                label="Transactions"
                value={(wreckit?.txns24h.buys || 0) + (wreckit?.txns24h.sells || 0)}
                format={(n) => n.toLocaleString()}
                variant="wreckit"
                delay={0.55}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex gap-3"
            >
              <a
                href={LINKS.WRECKIT.dexscreener}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wreckit flex-1"
              >
                Trade
              </a>
              <a
                href={LINKS.WRECKIT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex-1"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* RALPH Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <TokenHeader
              name="RALPH"
              symbol="$RALPH"
              price={ralph?.price || 0}
              change={ralph?.priceChange24h || 0}
              variant="ralph"
              delay={0.3}
            />

            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label="Market Cap"
                value={ralph?.marketCap || 0}
                format={formatLargeNumber}
                variant="ralph"
                delay={0.4}
              />
              <MetricCard
                label="24h Volume"
                value={ralph?.volume24h || 0}
                format={formatLargeNumber}
                variant="ralph"
                delay={0.45}
              />
              <MetricCard
                label="Liquidity"
                value={ralph?.liquidity || 0}
                format={formatLargeNumber}
                variant="ralph"
                delay={0.5}
              />
              <MetricCard
                label="Transactions"
                value={(ralph?.txns24h.buys || 0) + (ralph?.txns24h.sells || 0)}
                format={(n) => n.toLocaleString()}
                variant="ralph"
                delay={0.55}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex gap-3"
            >
              <a
                href={LINKS.RALPH.dexscreener}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ralph flex-1"
              >
                Trade
              </a>
              <a
                href={LINKS.RALPH.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex-1"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-2 mt-8 text-xs text-[var(--text-muted)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-success)]"></span>
          </span>
          <span>
            Live data • Updates every 5s
            {lastFetch && (
              <span className="ml-2 opacity-50">
                Last: {lastFetch.toLocaleTimeString()}
              </span>
            )}
          </span>
        </motion.div>

      </div>

      {/* Scroll indicator - positioned relative to section, not container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)]"
        >
          <span className="text-xs">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
