import Link from "next/link";
import type { Metadata } from "next";
import { newsService } from "@/lib/services";
import { EmptyState, NewsCard } from "@/components/ui";
import type { NewsCategory } from "@/lib/types";
import { NEWS_CATEGORY_LABEL } from "@/lib/types";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias e comunicados oficiais da LIBEERJ.",
};

type SearchParams = Promise<{ cat?: string }>;

const CATS = ["carnaval", "blocos", "liga", "memoria", "cultura"] as NewsCategory[];

export default async function NoticiasPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const active = (CATS as string[]).includes(sp.cat ?? "") ? (sp.cat as NewsCategory) : null;

  const unpublished = newsService.latest(50); // atenção: só published

  const items = active
    ? unpublished.filter((n) => n.category === active)
    : unpublished;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / Notícias
          </nav>
          <h1>Notícias</h1>
          <p>Cobertura oficial da Liga para a imprensa e para o folião.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rank-tabs" role="group" aria-label="Filtrar notícias por categoria">
            <Link href="/noticias" className="tab" aria-current={active === null ? "page" : undefined}>
              Todas
            </Link>
            {CATS.map((c) => (
              <Link
                key={c}
                href={`/noticias?cat=${c}`}
                className="tab"
                aria-current={active === c ? "page" : undefined}
              >
                {NEWS_CATEGORY_LABEL[c]}
              </Link>
            ))}
          </div>

          {items.length === 0 ? (
            <EmptyState>Nenhuma notícia publicada nesta categoria.</EmptyState>
          ) : (
            <>
              {active === null && items[0] && (
                <div style={{ marginBottom: 22 }}>
                  <NewsCard item={items[0]} featured />
                </div>
              )}
              <div className="card-grid">
                {items.slice(active === null ? 1 : 0).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}