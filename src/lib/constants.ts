// Token contract addresses
export const TOKENS = {
  WRECKIT: {
    address: "7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
    name: "WRECKIT",
    symbol: "$WRECKIT",
    chain: "solana",
  },
  RALPH: {
    address: "CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
    name: "RALPH",
    symbol: "$RALPH",
    chain: "solana",
  },
} as const;

// DexScreener API
export const DEXSCREENER_API = "https://api.dexscreener.com/latest/dex/tokens";

// GitHub repos
export const GITHUB_REPOS = {
  RALPH: "ghuntley/ralph",
  WRECKIT: "mikehostetler/wreckit",
} as const;

// External links
export const LINKS = {
  WRECKIT: {
    github: "https://github.com/mikehostetler/wreckit",
    bags: "https://bags.fm/b/wreckit",
    dexscreener: "https://dexscreener.com/solana/7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
  },
  RALPH: {
    github: "https://github.com/ghuntley/ralph",
    dexscreener: "https://dexscreener.com/solana/CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
  },
} as const;
