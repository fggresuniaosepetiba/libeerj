import Link from "next/link";
import type { Metadata } from "next";
import { blocksService } from "@/lib/services";
import { BlockCard, EmptyState } from "@/components/ui";
import { BlocosFilter } from "@/components/blocos/BlocosFilter";

export const metadata: Metadata = {
  title: "Blocos",
  description: "Catálogo dos blocos filiados à LIBEERJ.",
};

type SearchParams = Promise<{
  q?: string;
  neighborhood?: string;
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
  const neighborhood = sp.neighborhood ?? "all";

  const result = blocksService.query({
    search: q,
    neighborhood,
    sort: "name",
    page,
    pageSize: 12,
  });

  const neighborhoods = blocksService.neighborhoods();

  const hrefFor = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    for (const [key, value] of [
      ["q", q],
      ["neighborhood", neighborhood === "all" ? undefined : neighborhood],
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
            {blocksService.count()} blocos associados à LIBEERJ. As categorias
            e as fichas completas serão publicadas pela presidência em breve.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BlocosFilter neighborhoods={neighborhoods} />

          {result.items.length === 0 ? (
            <EmptyState>
              Nenhum bloco encontrado para a busca escolhida. Tente outro nome.
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