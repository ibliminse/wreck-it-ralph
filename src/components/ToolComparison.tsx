"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ComparisonRow {
  aspect: string;
  ralph: string;
  wreckit: string;
  verdict: "wreckit" | "ralph" | "neutral";
  note?: string;
}

const comparisonData: ComparisonRow[] = [
  {
    aspect: "Form Factor",
    ralph: "5-line bash loop",
    wreckit: "Full CLI framework",
    verdict: "neutral",
    note: "Different approaches",
  },
  {
    aspect: "Philosophy",
    ralph: '"Deterministically bad"',
    wreckit: '"Ralph with guardrails"',
    verdict: "neutral",
    note: "Same DNA",
  },
  {
    aspect: "State Management",
    ralph: "Git history (manual)",
    wreckit: ".wreckit/ directory (auto)",
    verdict: "wreckit",
    note: "Structured & trackable",
  },
  {
    aspect: "Resumability",
    ralph: "Manual tracking",
    wreckit: "Built-in (Ctrl-C safe)",
    verdict: "wreckit",
    note: "Pick up anytime",
  },
  {
    aspect: "Human Review",
    ralph: "Optional",
    wreckit: "Mandatory at PR",
    verdict: "wreckit",
    note: "Safer by design",
  },
  {
    aspect: "Error Recovery",
    ralph: "Start over",
    wreckit: "wreckit doctor --fix",
    verdict: "wreckit",
    note: "Self-healing",
  },
  {
    aspect: "GitHub Stars",
    ralph: "5,800+",
    wreckit: "Growing",
    verdict: "ralph",
    note: "RALPH is established",
  },
  {
    aspect: "Anthropic Support",
    ralph: "Official plugin",
    wreckit: "Independent",
    verdict: "ralph",
    note: "Both valid paths",
  },
];

function FeatureCard({
  icon,
  title,
  description,
  variant,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: "wreckit" | "ralph";
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bgClass =
    variant === "wreckit"
      ? "border-[var(--wreckit-primary)]/20 hover:border-[var(--wreckit-primary)]/40"
      : "border-[var(--ralph-primary)]/20 hover:border-[var(--ralph-primary)]/40";

  const iconBg =
    variant === "wreckit"
      ? "bg-[var(--wreckit-subtle)] text-[var(--wreckit-primary)]"
      : "bg-[var(--ralph-subtle)] text-[var(--ralph-primary)]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`card p-6 border ${bgClass}`}
    >
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h4>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </motion.div>
  );
}

export function ToolComparison() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="tools" className="py-20 md:py-32 snap-section" ref={sectionRef}>
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
            The Tools
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            RALPH is the technique that started it all. WRECKIT is the productized evolution.
            <br className="hidden md:block" />
            Different approaches, same mission.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="card overflow-hidden mb-16"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-muted)]">
                    Aspect
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--ralph-primary)]">
                    RALPH
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--wreckit-primary)]">
                    WRECKIT
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[var(--text-muted)]">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <motion.tr
                    key={row.aspect}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-elevated)]/50 transition-colors"
                  >
                    <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                      {row.aspect}
                    </td>
                    <td className="p-4 text-sm text-[var(--text-secondary)]">{row.ralph}</td>
                    <td className="p-4 text-sm text-[var(--text-secondary)]">{row.wreckit}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          row.verdict === "wreckit"
                            ? "bg-[var(--wreckit-subtle)] text-[var(--wreckit-primary)]"
                            : row.verdict === "ralph"
                            ? "bg-[var(--ralph-subtle)] text-[var(--ralph-primary)]"
                            : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                        }`}
                      >
                        {row.note}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* WRECKIT features */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl font-semibold text-gradient-wreckit mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Why WRECKIT
            </motion.h3>
            <div className="space-y-4">
              <FeatureCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Production Ready"
                description="Human review gates, state persistence, and structured phases mean you can use it on real projects."
                variant="wreckit"
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
                title="Resumable Sessions"
                description="Ctrl-C anytime. Come back tomorrow. WRECKIT remembers where you left off."
                variant="wreckit"
                delay={0.55}
              />
              <FeatureCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
                title="Transparent State"
                description="Everything in .wreckit/ is git-trackable. Know exactly what the agent is doing."
                variant="wreckit"
                delay={0.6}
              />
            </div>
          </div>

          {/* RALPH features */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl font-semibold text-gradient-ralph mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Why RALPH
            </motion.h3>
            <div className="space-y-4">
              <FeatureCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                title="Pure Simplicity"
                description="5 lines of bash. No dependencies. No installation. Just paste and run."
                variant="ralph"
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Proven Community"
                description="5,800+ GitHub stars. Active community. Battle-tested by thousands."
                variant="ralph"
                delay={0.55}
              />
              <FeatureCard
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                }
                title="Anthropic Official"
                description="Official Claude plugin support. Integrated into the ecosystem."
                variant="ralph"
                delay={0.6}
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-[var(--text-muted)] mb-6">
            Both tools get the job done. WRECKIT just adds guardrails.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/mikehostetler/wreckit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wreckit"
            >
              Try WRECKIT
            </a>
            <a
              href="https://github.com/ghuntley/ralph"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Explore RALPH
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
