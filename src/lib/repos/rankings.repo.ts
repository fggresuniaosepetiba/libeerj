import type { BlockCategory, Ranking, RankingType } from "@/lib/types";
import { RANKINGS_DATA, RANKING_YEARS } from "@/lib/data/rankings";

export const rankingsRepo = {
  all(): Ranking[] {
    return RANKINGS_DATA;
  },

  byType(type: RankingType): Ranking[] {
    return RANKINGS_DATA.filter((r) => r.type === type);
  },

  byYear(year: number): Ranking[] {
    return RANKINGS_DATA.filter((r) => r.type === "annual" && r.year === year);
  },

  byCategory(category: BlockCategory): Ranking[] {
    return RANKINGS_DATA.filter((r) => r.category === category);
  },

  annual(category: BlockCategory, year: number): Ranking | undefined {
    return RANKINGS_DATA.find(
      (r) => r.type === "annual" && r.category === category && r.year === year,
    );
  },

  overall(category: BlockCategory): Ranking | undefined {
    return RANKINGS_DATA.find(
      (r) => r.type === "overall" && r.category === category,
    );
  },

  years(): number[] {
    return [...RANKING_YEARS];
  },
};