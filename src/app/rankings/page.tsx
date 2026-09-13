import Link from "next/link";
import type { Metadata } from "next";
import { rankingsService, homeService } from "@/lib/services";
import { Badge, EmptyState, SectionHead } from "@/components/ui";
import { RankingTable } from "@/components/ui/RankingTable";

export const metadata: Metadata = {
  title: "Rankings",
  description:
    "Rankings anuais e histórico dos blocos de embalo e enredo filiados à LIBEERJ.",
};

type SearchParams = Promise<{ year?: string }>;

export default async function RankingsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const requestedYear = Number.parseInt(sp.year ?? "", 10);
  const validYear = Number.isFinite(requestedYear) ? requestedYear : 2027;
  const year = rankingsService.years().includes(validYear) ? validYear : 2027;

  const categories = ["enredo", "embalo"] as const;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / Rankings
          </nav>
          <h1>Rankings</h1>
          <p>
            Resultados anuais e geral por categoria. A apuração de {year} está em
            destaque.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Ano" title="Navegue pelos anos" />
          <div className="rank-tabs" role="group" aria-label="Escolha o ano">
            {rankingsService.years().map((y) => (
              <Link
                key={y}
                href={y === 2027 ? "/rankings" : `/rankings?year=${y}`}
                className="tab"
                aria-current={y === year ? "page" : undefined}
              >
                {y}
                {y === 2027 && " · atual"}
              </Link>
            ))}
          </div>

          {year !== 2027 && (
            <div className="empty">
              A apuração de {year} ainda não foi publicada. Acompanhe a agenda de
              desfiles e volte em breve.
            </div>
          )}

          <div className="card-grid" style={{ marginTop: 28 }}>
            {categories.map((category) => {
              const annual = rankingsService.annual(category, year);
              const overall = rankingsService.overall(category);
              if (!annual) return null;
              return (
                <div key={category} className="stack">
                  <h2 style={{ fontSize: "1.2rem" }}>
                    <Badge tone={category === "enredo" ? "enredo" : "embalo"}>
                      Blocos de {category === "enredo" ? "Enredo" : "Embalo"}
                    </Badge>
                  </h2>
                  <RankingTable ranking={annual} rows={homeService.rankingRows(annual)} category={category} />
                  {overall && (
                    <div>
                      <p className="muted" style={{ margin: "18px 0 8px" }}>
                        <strong>Ranking geral histórico</strong> (acumulado)
                      </p>
                      <RankingTable ranking={overall} rows={homeService.rankingRows(overall)} category={category} limit={5} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {year !== 2027 && <EmptyState>Sem dados para o ano selecionado.</EmptyState>}
        </div>
      </section>
    </>
  );
}