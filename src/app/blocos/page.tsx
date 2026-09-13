import Link from "next/link";
import type { Metadata } from "next";
import { blocksService, blocksService as s } from "@/lib/services";
import { BlockCard, EmptyState } from "@/components/ui";
import { BlocosFilter } from "@/components/blocos/BlocosFilter";
import type { BlockCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blocos",
  description:
    "Catálogo dos blocos filiados à LIBEERJ: blocos de embalo e enredo do Rio de Janeiro.",
};

const CATEGORIES: Array<{ value: BlockCategory | "all"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "embalo", label: "Embalo" },
  { value: "enredo", label: "Enredo" },
];

type SearchParams = Promise<{
  q?: string;
  category?: string;
  neighborhood?: string;
  sort?: string;
  page?: string;
}>;

const clampPage = (value: string | undefined) => {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export default async function BlocosPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  const page = clampPage(sp.page);
  const q = sp.q ?? "";
  const category = (sp.category === "embalo" || sp.category === "enredo" ? sp.category : "all") as BlockCategory | "all";
  const neighborhood = sp.neighborhood ?? "all";
  const sort = sp.sort === "founded" || sp.sort === "components" ? sp.sort : "name";

  const result = blocksService.query({
    search: q,
    category,
    neighborhood,
    sort,
    page,
    pageSize: 12,
  });

  const neighborhoods = s.neighborhoods();

  const hrefFor = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    for (const [key, value] of [
      ["q", q],
      ["category", category === "all" ? undefined : category],
      ["neighborhood", neighborhood === "all" ? undefined : neighborhood],
      ["sort", sort],
    ] as const) {
      if (value) next.set(key, value);
    }
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
    }
    const qs = next.toString();
    return qs ? `/blocos?${qs}` : "/blocos";
  };

  const pages = Array.from({ length: result.totalPages }, (_, i) => i + 1);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / Blocos
          </nav>
          <h1>Blocos filiados</h1>
          <p>
            {s.count()} blocos entre embalo e enredo, espalhados por todos os
            cantos da cidade. Busque pelo nome, explore por bairro ou filtre por
            categoria.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BlocosFilter categories={CATEGORIES} neighborhoods={neighborhoods} />

          {result.items.length === 0 ? (
            <EmptyState>
              Nenhum bloco encontrado para os filtros escolhidos. Ajuste a busca
              ou limpe os filtros acima.
            </EmptyState>
          ) : (
            <>
              <p className="muted" style={{ marginBottom: 18 }}>
                {result.total} resultado{result.total === 1 ? "" : "s"} · página{" "}
                {result.page} de {result.totalPages}
              </p>
              <div className="card-grid">
                {result.items.map((block) => (
                  <BlockCard key={block.slug} block={block} />
                ))}
              </div>

              {result.totalPages > 1 && (
                <nav aria-label="Paginação" className="pagination">
                  {result.page > 1 && (
                    <Link href={hrefFor({ page: String(result.page - 1) })} rel="prev">
                      Anterior
                    </Link>
                  )}
                  {pages.map((p) => (
                    <Link
                      key={p}
                      href={hrefFor({ page: String(p) })}
                      aria-current={p === result.page ? "page" : undefined}
                      aria-label={`Página ${p}`}
                    >
                      {p}
                    </Link>
                  ))}
                  {result.page < result.totalPages && (
                    <Link href={hrefFor({ page: String(result.page + 1) })} rel="next">
                      Próxima
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}