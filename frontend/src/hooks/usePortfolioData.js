import { profile, experiences, portfolios } from "../data/content";

export function usePortfolioData() {
  return { profile, experiences, portfolios, status: "ready" };
}
