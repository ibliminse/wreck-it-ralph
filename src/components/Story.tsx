"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CreatorCardProps {
  name: string;
  role: string;
  story: string[];
  quote: string;
  variant: "wreckit" | "ralph";
  links: { label: string; url: string }[];
  delay?: number;
}

function CreatorCard({ name, role, story, quote, variant, links, delay = 0 }: CreatorCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const borderClass =
    variant === "wreckit"
      ? "border-[var(--wreckit-primary)]/20"
      : "border-[var(--ralph-primary)]/20";

  const gradientClass =
    variant === "wreckit" ? "text-gradient-wreckit" : "text-gradient-ralph";

  const tagBg =
    variant === "wreckit"
      ? "bg-[var(--wreckit-subtle)] text-[var(--wreckit-primary)]"
      : "bg-[var(--ralph-subtle)] text-[var(--ralph-primary)]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`card p-6 md:p-8 border ${borderClass}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${tagBg} mb-3`}>
            {variant === "wreckit" ? "WRECKIT Creator" : "RALPH Creator"}
          </span>
          <h3
            className={`text-2xl font-bold ${gradientClass}`}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {name}
          </h3>
          <p className="text-sm text-[var(--text-muted)]">{role}</p>
        </div>
      </div>

      {/* Story */}
      <div className="space-y-4 mb-6">
        {story.map((paragraph, i) => (
          <p key={i} className="text-[var(--text-secondary)] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="border-l-2 border-[var(--border-strong)] pl-4 mb-6">
        <p className="text-[var(--text-primary)] italic">&ldquo;{quote}&rdquo;</p>
      </blockquote>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {link.label} →
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export function Story() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="story"
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
            The Story
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            From a goat farmer&apos;s experiment to a jQuery veteran&apos;s evolution.
            <br className="hidden md:block" />
            The people behind the tools.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-1/2 left-0 right-0 h-px bg-[var(--border-subtle)] origin-left hidden md:block"
          />

          <div className="grid md:grid-cols-3 gap-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-4 h-4 rounded-full bg-[var(--ralph-primary)] mx-auto mb-4 relative z-10" />
              <span className="text-sm font-mono text-[var(--text-muted)]">July 2025</span>
              <p className="text-[var(--text-primary)] font-medium mt-2">RALPH is born</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                The bash loop that started it all
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              <div className="w-4 h-4 rounded-full bg-[var(--accent-data)] mx-auto mb-4 relative z-10" />
              <span className="text-sm font-mono text-[var(--text-muted)]">Late 2025</span>
              <p className="text-[var(--text-primary)] font-medium mt-2">AI coding explodes</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                VentureBeat coverage, massive adoption
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-4 h-4 rounded-full bg-[var(--wreckit-primary)] mx-auto mb-4 relative z-10" />
              <span className="text-sm font-mono text-[var(--text-muted)]">Jan 2026</span>
              <p className="text-[var(--text-primary)] font-medium mt-2">WRECKIT launches</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                &ldquo;Ralph with guardrails&rdquo;
              </p>
            </motion.div>
          </div>
        </div>

        {/* Creator cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <CreatorCard
            name="Geoffrey Huntley"
            role="Creator of RALPH"
            story={[
              "Geoffrey is a goat farmer turned open source maintainer who stumbled onto something big. His simple bash loop technique—letting Claude run unsupervised in a loop—became the foundation of a movement.",
              "What started as an experiment became a $50K contract completed for $297. Then another. Then VentureBeat wrote about it. The technique spread through the developer community like wildfire.",
            ]}
            quote="It's deterministically bad, but it works. Let the AI fail fast and iterate."
            variant="ralph"
            links={[
              { label: "GitHub", url: "https://github.com/ghuntley/ralph" },
              { label: "Twitter", url: "https://twitter.com/geoffreyhuntley" },
            ]}
            delay={0.3}
          />

          <CreatorCard
            name="Mike Hostetler"
            role="Creator of WRECKIT"
            story={[
              "Mike is a jQuery core team veteran who saw RALPH's potential—and its limitations. With decades of experience building developer tools, he knew that production use needed structure.",
              "WRECKIT was born: the same autonomous AI loop philosophy, but with state management, human review gates, and crash recovery. Ralph with adult supervision.",
            ]}
            quote="Even Ralph needs adult supervision. That's the insight that makes WRECKIT work."
            variant="wreckit"
            links={[
              { label: "GitHub", url: "https://github.com/mikehostetler/wreckit" },
              { label: "Twitter", url: "https://twitter.com/mikehostetler" },
            ]}
            delay={0.4}
          />
        </div>

        {/* The connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <span className="text-gradient-ralph font-semibold">RALPH</span>
            <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="text-gradient-wreckit font-semibold">WRECKIT</span>
            <span className="text-[var(--text-muted)] text-sm ml-2">Same mission, different approach</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
