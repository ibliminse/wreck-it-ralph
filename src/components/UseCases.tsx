"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface UseCase {
  id: string;
  title: string;
  description: string;
  command: string;
  output?: string[];
  badge?: string;
}

const useCases: UseCase[] = [
  {
    id: "init",
    title: "Initialize a project",
    description: "Set up WRECKIT in any existing codebase with one command.",
    command: "wreckit init",
    output: [
      "✓ Created .wreckit/config.json",
      "✓ Created .wreckit/prompts/",
      "✓ Detected git repository",
      "✓ Ready to wreck your backlog",
    ],
  },
  {
    id: "ingest",
    title: "Feed it your ideas",
    description: "Write your ideas in plain text. WRECKIT turns them into actionable tasks.",
    command: "wreckit ingest IDEAS.md",
    output: [
      "Parsing IDEAS.md...",
      "✓ Found 3 features",
      "✓ Generated 12 tasks",
      "✓ Estimated complexity: Medium",
    ],
    badge: "AI Powered",
  },
  {
    id: "run",
    title: "Let it cook",
    description: "Start the autonomous loop. WRECKIT will implement, test, and iterate.",
    command: "wreckit run",
    output: [
      "Starting autonomous session...",
      "→ Task 1/12: Add user authentication",
      "  Writing auth middleware...",
      "  Running tests... ✓",
      "  Creating PR...",
    ],
    badge: "Autonomous",
  },
  {
    id: "status",
    title: "Check progress anytime",
    description: "See what's done, what's in progress, and what's left.",
    command: "wreckit status",
    output: [
      "Session: wreck-auth-feature",
      "Progress: 8/12 tasks complete",
      "Current: Implementing OAuth flow",
      "PRs created: 3 (2 merged)",
    ],
  },
  {
    id: "resume",
    title: "Resume after interruption",
    description: "Ctrl-C'd yesterday? Pick up exactly where you left off.",
    command: "wreckit resume",
    output: [
      "Restoring session state...",
      "✓ Loaded context from .wreckit/state.json",
      "✓ Resuming task 9/12",
      "Continuing: Add rate limiting...",
    ],
    badge: "Crash Safe",
  },
  {
    id: "doctor",
    title: "Self-healing diagnostics",
    description: "Something broke? WRECKIT can fix itself.",
    command: "wreckit doctor --fix",
    output: [
      "Running diagnostics...",
      "⚠ Found stale lock file",
      "⚠ Orphaned branch detected",
      "✓ Fixed 2 issues",
      "Ready to continue",
    ],
  },
];

function CodeBlock({ command, output }: { command: string; output?: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg bg-[var(--bg-deep)] border border-[var(--border-subtle)] overflow-hidden">
      {/* Command line */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent-success)] font-mono text-sm">$</span>
          <code className="text-[var(--text-primary)] font-mono text-sm">{command}</code>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="px-4 py-3 space-y-1">
          {output.map((line, i) => (
            <div key={i} className="text-sm font-mono text-[var(--text-secondary)]">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-[var(--text-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {useCase.badge && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--wreckit-subtle)] text-[var(--wreckit-primary)]">
                {useCase.badge}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{useCase.title}</h3>
        </div>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mb-4">{useCase.description}</p>

      <CodeBlock command={useCase.command} output={useCase.output} />
    </motion.div>
  );
}

export function UseCases() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="use-cases" className="py-20 md:py-32 snap-section" ref={sectionRef}>
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
            Use Cases
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            See WRECKIT in action. From initialization to autonomous coding sessions.
          </p>
        </motion.div>

        {/* Use case grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <UseCaseCard key={useCase.id} useCase={useCase} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card inline-flex flex-col items-center p-8 max-w-lg mx-auto">
            <h3
              className="text-xl font-semibold text-[var(--text-primary)] mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Ready to wreck your backlog?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Install WRECKIT and let the AI handle the grunt work.
            </p>

            <CodeBlock command="npm install -g wreckit" />

            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/mikehostetler/wreckit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wreckit"
              >
                View on GitHub
              </a>
              <a
                href="https://github.com/mikehostetler/wreckit#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Read Docs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
