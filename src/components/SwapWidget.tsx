"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { TOKENS } from "@/lib/constants";

declare global {
  interface Window {
    Jupiter: {
      init: (config: {
        displayMode: string;
        integratedTargetId: string;
        endpoint: string;
        strictTokenList: boolean;
        defaultExplorer: string;
        formProps: {
          initialInputMint?: string;
          initialOutputMint?: string;
          fixedOutputMint?: boolean;
        };
      }) => void;
    };
  }
}

function TokenSwapButton({
  token,
  variant,
  onClick,
  active,
}: {
  token: string;
  variant: "wreckit" | "ralph";
  onClick: () => void;
  active: boolean;
}) {
  const colorClass =
    variant === "wreckit"
      ? active
        ? "border-[var(--wreckit-primary)] bg-[var(--wreckit-subtle)]"
        : "border-[var(--border-subtle)] hover:border-[var(--wreckit-primary)]/50"
      : active
      ? "border-[var(--ralph-primary)] bg-[var(--ralph-subtle)]"
      : "border-[var(--border-subtle)] hover:border-[var(--ralph-primary)]/50";

  const textClass =
    variant === "wreckit"
      ? active
        ? "text-[var(--wreckit-primary)]"
        : "text-[var(--text-secondary)]"
      : active
      ? "text-[var(--ralph-primary)]"
      : "text-[var(--text-secondary)]";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border transition-all ${colorClass}`}
    >
      <span className={`font-semibold ${textClass}`}>{token}</span>
    </button>
  );
}

export function SwapWidget() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedToken, setSelectedToken] = useState<"wreckit" | "ralph">("wreckit");
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const tokenAddress = selectedToken === "wreckit" ? TOKENS.WRECKIT.address : TOKENS.RALPH.address;

  useEffect(() => {
    // Load Jupiter Terminal script
    const existingScript = document.getElementById("jupiter-terminal");
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "jupiter-terminal";
    script.src = "https://terminal.jup.ag/main-v3.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Don't remove on unmount as it might be needed by other components
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.Jupiter || !widgetRef.current) return;

    // Clear previous widget
    if (widgetRef.current) {
      widgetRef.current.innerHTML = "";
    }

    // Initialize Jupiter Terminal
    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-terminal-container",
      endpoint: "https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92",
      strictTokenList: false,
      defaultExplorer: "Solscan",
      formProps: {
        initialOutputMint: tokenAddress,
        fixedOutputMint: false,
      },
    });
  }, [isLoaded, tokenAddress]);

  return (
    <section
      id="swap"
      ref={sectionRef}
      className="py-20 md:py-32 bg-[var(--bg-surface)]"
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
            Swap Tokens
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Trade directly on-site using Jupiter aggregator. Best rates across all Solana DEXs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          {/* Token selector */}
          <div className="flex justify-center gap-3 mb-6">
            <TokenSwapButton
              token="$WRECKIT"
              variant="wreckit"
              active={selectedToken === "wreckit"}
              onClick={() => setSelectedToken("wreckit")}
            />
            <TokenSwapButton
              token="$RALPH"
              variant="ralph"
              active={selectedToken === "ralph"}
              onClick={() => setSelectedToken("ralph")}
            />
          </div>

          {/* Jupiter Terminal Container */}
          <div className="card p-1 overflow-hidden">
            <div
              id="jupiter-terminal-container"
              ref={widgetRef}
              className="min-h-[400px] rounded-xl overflow-hidden"
              style={{
                background: "var(--bg-elevated)",
              }}
            >
              {!isLoaded && (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[var(--wreckit-primary)] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-[var(--text-muted)]">Loading Jupiter...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-[var(--text-muted)] mt-4">
            Powered by Jupiter Aggregator. Trades execute on-chain via your connected wallet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
