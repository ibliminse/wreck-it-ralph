// Token contract addresses
export const TOKENS = {
  WRECKIT: {
    address: "7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
    name: "WRECKIT",
    symbol: "$WRECKIT",
    chain: "solana",
    logo: "https://cdn.dexscreener.com/cms/images/852dbed63bcc7aa2f3860400c38b815c451c44524bebe3a8f3a0d0f8f5a26348?width=128&height=128&quality=90",
  },
  RALPH: {
    address: "CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
    name: "RALPH",
    symbol: "$RALPH",
    chain: "solana",
    logo: "https://cdn.dexscreener.com/cms/images/67580f0bfa8ce26c0bbbb9914508d70a67df5a8a1cbcd119ab976b6ed6cc9205?width=128&height=128&quality=90",
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
    trade: "https://bags.fm/7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
    dexscreener: "https://dexscreener.com/solana/7BJ6Mogdczju5hGGzpCqEvLVBTdDu6ixGUH3MMHmBAGS",
  },
  RALPH: {
    github: "https://github.com/ghuntley/ralph",
    trade: "https://dexscreener.com/solana/CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
    dexscreener: "https://dexscreener.com/solana/CxWPdDBqxVo3fnTMRTvNuSrd4gkp78udSrFvkVDBAGS",
  },
} as const;
