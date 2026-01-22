"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What's the difference between WRECKIT and RALPH?",
    a: "RALPH was the pioneer - the first AI coding agent token that proved the concept. WRECKIT is the evolution, building on those foundations with enhanced capabilities and a focus on breaking barriers in autonomous coding.",
  },
  {
    q: "Are these tokens affiliated with Anthropic or Claude?",
    a: "No. These are independent community tokens celebrating AI coding agents. They are not officially associated with Anthropic, Claude, or any AI company.",
  },
  {
    q: "Which token should I buy?",
    a: "This is not financial advice. RALPH has more liquidity and established history. WRECKIT is newer with higher risk/reward potential. DYOR and only invest what you can afford to lose.",
  },
  {
    q: "Where can I trade these tokens?",
    a: "Both tokens trade on Solana DEXs. You can find them on DexScreener, Jupiter, or Raydium. Use the contract addresses shown on this site to find the correct tokens.",
  },
  {
    q: "What makes AI coding agents special?",
    a: "AI coding agents can autonomously write, test, and debug code. They represent a shift from AI as a tool to AI as a collaborator, capable of handling complex development tasks with minimal human intervention.",
  },
  {
    q: "Is the data on this site real-time?",
    a: "Yes. Price, volume, and other metrics update every 5 seconds directly from DexScreener's API. The data reflects actual on-chain activity.",
  },
];

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[var(--border-subtle)] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:text-[var(--text-primary)] transition-colors"
      >
        <span className="font-medium text-[var(--text-primary)] pr-4">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[var(--text-muted)]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--text-secondary)] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 snap-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            FAQ
          </h2>
          <p className="text-[var(--text-secondary)]">Common questions about WRECKIT and RALPH</p>
        </div>

        <div className="max-w-2xl mx-auto card p-6 md:p-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
