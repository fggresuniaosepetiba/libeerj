export type BlockCategory = "embalo" | "enredo";

export const CATEGORY_LABEL: Record<BlockCategory, string> = {
  embalo: "Bloco de Embalo",
  enredo: "Bloco de Enredo",
};

export const CATEGORY_SHORT: Record<BlockCategory, string> = {
  embalo: "Embalo",
  enredo: "Enredo",
};

export interface CarnivalBlock {
  id: string;
  slug: string;
  name: string;
  /**
   * Categoria ainda não atribuída pela presidência. Mantida como `null`
   * para preenchimento futuro: "enredo" | "embalo".
   */
  category: BlockCategory | null;
  neighborhood?: string;
  foundedYear?: number;
  /** Data completa de fundação quando disponível, em ISO, ex.: "2024-02-02" */
  foundedDate?: string;
  president?: string;
  vicePresident?: string;
  carnivalDirector?: string;
  components?: number;
  instagram?: string;
  logo: string;
  slogan?: string;
  description?: string;
  /** Enredo do bloco para o ano vigente, ex.: "Sabejé" */
  enredo?: string;
}

export type EventKind =
  | "desfile"
  | "ensaio"
  | "lancamento"
  | "institucional"
  | "premiacao"
  | "atividade";

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  desfile: "Desfile",
  ensaio: "Ensaio",
  lancamento: "Lançamento",
  institucional: "Institucional",
  premiacao: "Premiação",
  atividade: "Atividade da Liga",
};

export interface CarnivalEvent {
  id: string;
  title: string;
  /** ISO date, e.g. "2027-02-06" */
  date: string;
  /** e.g. "08:00" */
  time: string;
  timeEnd?: string;
  location: string;
  neighborhood?: string;
  kind: EventKind;
  category?: BlockCategory;
  blockId?: string;
  description: string;
  image?: string;
  free?: boolean;
}

export type RankingType = "annual" | "overall";

export interface RankingEntry {
  blockId: string;
  position: number;
  points: number;
  /** variation vs previous period, e.g. 2 or -1 */
  variation?: number;
}

export interface Ranking {
  id: string;
  /** present for annual rankings */
  year?: number;
  type: RankingType;
  category: BlockCategory;
  title: string;
  entries: RankingEntry[];
}

export type NewsCategory =
  | "liga"
  | "blocos"
  | "carnaval"
  | "memoria"
  | "cultura";

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  liga: "Liga",
  blocos: "Blocos",
  carnaval: "Carnaval",
  memoria: "Memória",
  cultura: "Cultura",
};

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt?: string;
  category: NewsCategory;
  date: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  status?: "draft" | "published";
}

export type GalleryCategory =
  | "memoria"
  | "embalo"
  | "enredo"
  | "blocos"
  | "geral";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  category: GalleryCategory;
  /** decada/ano como texto curto, ex.: "1970" */
  year?: string;
  location?: string;
  credit?: string;
  highlight?: boolean;
}

/** Filtering options used by the blocks catalogue. */
export interface BlocksQuery {
  search?: string;
  category?: BlockCategory | "all";
  neighborhood?: string;
  sort?: "name" | "founded" | "components";
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface YearOption {
  year: number;
  label: string;
  state: "live" | "upcoming" | "archive";
}

/** Membro da diretoria institucional da liga. */
export interface BoardMember {
  name: string;
  role: string;
}

/** Grupo hierárquico da diretoria (Executiva, Diretoria, Conselho). */
export interface BoardGroup {
  id: string;
  title: string;
  subtitle?: string;
  members: BoardMember[];
}