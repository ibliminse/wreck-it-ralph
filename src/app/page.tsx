import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ToolComparison } from "@/components/ToolComparison";
import { TokenMetrics } from "@/components/TokenMetrics";
import { Story } from "@/components/Story";
import { UseCases } from "@/components/UseCases";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <ToolComparison />
      <TokenMetrics />
      <Story />
      <UseCases />

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="text-gradient-wreckit">WRECKIT</span>
                <span className="text-[var(--text-muted)] mx-1">&</span>
                <span className="text-gradient-ralph">RALPH</span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                The AI coding agent ecosystem. Live data, real tools, same mission.
              </p>
            </div>

            {/* WRECKIT Links */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--wreckit-primary)] mb-4">WRECKIT</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/mikehostetler/wreckit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://dexscreener.com/solana/7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    DexScreener
                  </a>
                </li>
                <li>
                  <a
                    href="https://bags.fm/b/wreckit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Bags.fm
                  </a>
                </li>
              </ul>
            </div>

            {/* RALPH Links */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--ralph-primary)] mb-4">RALPH</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/ghuntley/ralph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://dexscreener.com/solana/5qTrDxBrJPGNW6bNBK6ckvLXeaE1cqqLs98fxDP2pump"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    DexScreener
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-[var(--text-muted)]">
                Not financial advice. DYOR. Both tokens can go to zero.
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                <span>Built with Claude</span>
                <span>•</span>
                <span>Data from DexScreener</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
