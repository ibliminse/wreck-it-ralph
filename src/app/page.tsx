import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ToolComparison } from "@/components/ToolComparison";
import { TokenMetrics } from "@/components/TokenMetrics";
import { Story } from "@/components/Story";
import { UseCases } from "@/components/UseCases";
import { FAQ } from "@/components/FAQ";
import { MobileNav } from "@/components/MobileNav";
import { PriceAlerts } from "@/components/PriceAlerts";
import { PriceChart } from "@/components/PriceChart";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <ToolComparison />
      <TokenMetrics />
      <PriceChart />
      <Story />
      <UseCases />
      <FAQ />
      <MobileNav />
      <PriceAlerts />

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
              <p className="text-sm text-[var(--text-muted)] mb-4">
                The AI coding agent ecosystem. Live data, real tools, same mission.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                <a
                  href="https://x.com/wreckitcc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors"
                  aria-label="WRECKIT on X"
                >
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/mikehostetler/wreckit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* WRECKIT Links */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--wreckit-primary)] mb-4">WRECKIT</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://x.com/wreckitcc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    @wreckitcc
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/i/communities/2012647259825951222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/mikehostetler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    @mikehostetler
                  </a>
                </li>
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
              </ul>
            </div>

            {/* RALPH Links */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--ralph-primary)] mb-4">RALPH</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://x.com/i/communities/2008152698965643652"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/GeoffreyHuntley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    @GeoffreyHuntley
                  </a>
                </li>
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
                    href="https://dexscreener.com/solana/CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS"
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
