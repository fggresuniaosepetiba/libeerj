import { blocksRepo } from "@/lib/repos/blocks.repo";
import { eventsRepo } from "@/lib/repos/events.repo";
import { newsRepo } from "@/lib/repos/news.repo";
import { galleryRepo } from "@/lib/repos/gallery.repo";
import { rankingsRepo } from "@/lib/repos/rankings.repo";
import type {
  BlockCategory,
  BlocksQuery,
  CarnivalBlock,
  CarnivalEvent,
  GalleryItem,
  NewsItem,
  Paginated,
  Ranking,
  RankingEntry,
} from "@/lib/types";
import { SITE } from "@/lib/site";

export type { BlocksQuery, CarnivalBlock, CarnivalEvent, GalleryItem, NewsItem, Paginated, Ranking, RankingEntry };

const blockMap = () => new Map(blocksRepo.all().map((b) => [b.slug, b]));

/** Convenience: attach block references used across screens. */
export const siteService = {
  config() {
    return SITE;
  },
};

export const blocksService = {
  query(q?: BlocksQuery) {
    return blocksRepo.query(q);
  },
  getBySlug(slug: string) {
    return blocksRepo.getBySlug(slug);
  },
  count() {
    return blocksRepo.count();
  },
  neighborhoods() {
    return blocksRepo.neighborhoods();
  },
  featured(count?: number) {
    return blocksRepo.featured(count);
  },
  visual(category: "embalo" | "enredo") {
    return blocksRepo.byCategory(category).slice(0, 10);
  },
};

export const eventsService = {
  upcoming(): CarnivalEvent[] {
    return eventsRepo.upcoming();
  },
  all(): CarnivalEvent[] {
    return eventsRepo.all();
  },
  getById(id: string) {
    return eventsRepo.getById(id);
  },
};

export const rankingsService = {
  annual(category: "embalo" | "enredo", year = SITE.currentYear): Ranking | undefined {
    return rankingsRepo.annual(category, year);
  },
  overall(category: "embalo" | "enredo"): Ranking | undefined {
    return rankingsRepo.overall(category);
  },
  years(): number[] {
    return rankingsRepo.years();
  },
  currentYear(): number {
    return SITE.currentYear;
  },
};

export const newsService = {
  latest(count?: number): NewsItem[] {
    return newsRepo.latest(count);
  },
  getBySlug(slug: string) {
    return newsRepo.getBySlug(slug);
  },
};

export const galleryService = {
  latest(count?: number): GalleryItem[] {
    return galleryRepo.latest(count);
  },
  byCategory(category: GalleryItem["category"]) {
    return galleryRepo.byCategory(category);
  },
};

/** Top N de uma categoria no ranking anual vigente, na ordem da apuração. */
const topRanked = (category: BlockCategory, count = 3): CarnivalBlock[] => {
  const ranking = rankingsService.annual(category, SITE.currentYear);
  if (!ranking) return [];
  return ranking.entries
    .map((entry) => blockMap().get(entry.blockId))
    .filter((b): b is CarnivalBlock => Boolean(b))
    .slice(0, count);
};

/** Prepara a vitrine da home: blocos + ranking atual + próximos eventos. */
export const homeService = {
  /** 3 primeiros de Enredo seguidos de 3 primeiros de Embalo, pela ordem do ranking. */
  featuredBlocks(): CarnivalBlock[] {
    return [...topRanked("enredo"), ...topRanked("embalo")];
  },
  highlightBlocks() {
    return {
      enredo: topRanked("enredo"),
      embalo: topRanked("embalo"),
    };
  },
  activeRankings() {
    const byCategory = (category: "embalo" | "enredo") => [
      rankingsService.overall(category),
      rankingsService.annual(category),
    ].filter((r): r is Ranking => Boolean(r));
    return { embalo: byCategory("embalo"), enredo: byCategory("enredo") };
  },
  upcomingEvents(count = 4) {
    return eventsService.upcoming().slice(0, count);
  },
  latestNews(count = 3) {
    return newsService.latest(count);
  },
  rankingRows(ranking: Ranking): Array<{ entry: RankingEntry; block?: CarnivalBlock; }> {
    return ranking.entries
      .map((entry) => ({ entry, block: blockMap().get(entry.blockId) }))
      .slice(0, 10);
  },
};