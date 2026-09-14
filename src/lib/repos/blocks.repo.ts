import type {
  BlocksQuery,
  CarnivalBlock,
  Paginated,
} from "@/lib/types";
import { BLOCKS_DATA } from "@/lib/data/blocks";

const sorters: Record<NonNullable<BlocksQuery["sort"]>, (a: CarnivalBlock, b: CarnivalBlock) => number> = {
  name: (a, b) => a.name.localeCompare(b.name, "pt-BR"),
  founded: (a, b) => (a.foundedYear ?? 0) - (b.foundedYear ?? 0) || a.name.localeCompare(b.name, "pt-BR"),
  components: (a, b) => (a.components ?? 0) - (b.components ?? 0) || a.name.localeCompare(b.name, "pt-BR"),
  /** Ordem oficial de cadastro junto à liga (a ordem do array de dados). */
  registered: () => 0,
};

const stableHash = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
};

export const blocksRepo = {
  all(): CarnivalBlock[] {
    return BLOCKS_DATA;
  },

  count(): number {
    return BLOCKS_DATA.length;
  },

  getBySlug(slug: string): CarnivalBlock | undefined {
    return BLOCKS_DATA.find((b) => b.slug === slug || b.id === slug);
  },

  list(): CarnivalBlock[] {
    return [...BLOCKS_DATA].sort(sorters.name);
  },

  /** Os N primeiros blocos na ordem de cadastro junto à liga. */
  registered(count = 6): CarnivalBlock[] {
    return BLOCKS_DATA.slice(0, count);
  },

  byCategory(category: "embalo" | "enredo"): CarnivalBlock[] {
    return BLOCKS_DATA.filter((b) => b.category === category);
  },

  neighborhoods(): string[] {
    return [...new Set(BLOCKS_DATA.map((b) => b.neighborhood).filter((n): n is string => Boolean(n)))].sort(
      (a, b) => a.localeCompare(b, "pt-BR"),
    );
  },

  /**
   * Seleção determinística para vitrine com mistura de categorias e bairros.
   */
  featured(count = 6): CarnivalBlock[] {
    return [...BLOCKS_DATA]
      .map((b) => ({ b, hash: stableHash(b.slug) }))
      .sort((a, z) => z.hash - a.hash)
      .slice(0, count)
      .map(({ b }) => b);
  },

  query(q: BlocksQuery = {}): Paginated<CarnivalBlock> {
    const {
      search = "",
      category = "all",
      neighborhood = "all",
      sort = "name",
      page = 1,
      pageSize = 12,
    } = q;

    const term = search.trim().toLowerCase();

    let items = BLOCKS_DATA.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (neighborhood !== "all" && b.neighborhood !== neighborhood) return false;
      if (!term) return true;
      return (
        b.name.toLowerCase().includes(term) ||
        (b.neighborhood ?? "").toLowerCase().includes(term) ||
        (b.description ?? "").toLowerCase().includes(term)
      );
    });

    items = [...items].sort(sorters[sort]);

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;

    return {
      items: items.slice(start, start + pageSize),
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  },
};