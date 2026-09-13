import type { NewsCategory, NewsItem } from "@/lib/types";
import { NEWS_DATA } from "@/lib/data/news";

const published = (item: NewsItem) => item.status !== "draft";

const byDateDesc = (a: NewsItem, b: NewsItem) => b.date.localeCompare(a.date);

export const newsRepo = {
  all(): NewsItem[] {
    return NEWS_DATA.filter(published).sort(byDateDesc);
  },

  getBySlug(slug: string): NewsItem | undefined {
    return NEWS_DATA.find((n) => n.status !== "draft" && n.slug === slug);
  },

  latest(count = 6): NewsItem[] {
    return NEWS_DATA.filter(published).sort(byDateDesc).slice(0, count);
  },

  byCategory(category: NewsCategory): NewsItem[] {
    return NEWS_DATA.filter((n) => published(n) && n.category === category).sort(
      byDateDesc,
    );
  },

  featured(): NewsItem[] {
    return NEWS_DATA.filter((n) => published(n) && n.featured).sort(byDateDesc);
  },

  categories(): NewsCategory[] {
    return ["carnaval", "blocos", "liga", "memoria", "cultura"];
  },
};

export const NEWS_CATEGORIES = newsRepo.categories();