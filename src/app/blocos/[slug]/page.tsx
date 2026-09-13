import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blocksService } from "@/lib/services";
import { Badge, BlockCard, SectionHead } from "@/components/ui";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const block = blocksService.getBySlug(slug);
  if (!block) return { title: "Bloco não encontrado" };
  return {
    title: block.name,
    description: `${block.name} — bloco filiado à LIBEERJ${block.neighborhood ? `, com atuação em ${block.neighborhood}.` : "."}`,
  };
}

const fallbackCover = "/assets/images/blocks/category-samba.jpg";

export default async function BlockDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const block = blocksService.getBySlug(slug);
  if (!block) notFound();

  const related = blocksService
    .query({ pageSize: 12 })
    .items.filter((b) => b.slug !== block.slug)
    .slice(0, 3);

  return (
    <>
      <section className="hero" style={{ minHeight: 380 }}>
        <div className="hero__media">
          <Image src={fallbackCover} alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero__scrim" aria-hidden />
        <div className="container hero__content">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / <Link href="/blocos">Blocos</Link> /{" "}
            {block.name}
          </nav>
          <h1>{block.name}</h1>
          {block.description && <p className="hero__lead">{block.description}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container profile">
          <aside className="profile__side">
            <span className="profile__logo">
              <Image src={block.logo} alt={`Logomarca do bloco ${block.name}`} width={104} height={104} />
            </span>
            <p className="credit" style={{ marginTop: 12 }}>
              {block.name}
              {block.neighborhood ? ` · ${block.neighborhood}` : ""}
            </p>
            {block.instagram && (
              <a
                className="btn btn--gold"
                href={`https://instagram.com/${block.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Seguir no Instagram
              </a>
            )}
          </aside>

          <div className="stack">
            <p className="lead">
              Bloco filiado à LIBEERJ. Ficha provisória em curadoria pela
              presidência — os dados oficiais de cada bloco serão publicados em
              breve.
            </p>

            <dl className="ficha">
              <div className="ficha__item">
                <dt>Categoria</dt>
                <dd>A atribuir</dd>
              </div>
              <div className="ficha__item">
                <dt>Bairro / Local</dt>
                <dd>{block.neighborhood ?? "A informar"}</dd>
              </div>
              <div className="ficha__item">
                <dt>Fundação</dt>
                <dd>
                  {block.foundedDate
                    ? new Date(`${block.foundedDate}T12:00:00`).toLocaleDateString("pt-BR")
                    : block.foundedYear ?? "A informar"}
                </dd>
              </div>
              <div className="ficha__item">
                <dt>Presidente</dt>
                <dd>{block.president ?? "A informar"}</dd>
              </div>
              <div className="ficha__item">
                <dt>Vice-presidência</dt>
                <dd>{block.vicePresident ?? "A informar"}</dd>
              </div>
              <div className="ficha__item">
                <dt>Direção de Carnaval</dt>
                <dd>{block.carnivalDirector ?? "A informar"}</dd>
              </div>
              <div className="ficha__item">
                <dt>Componentes</dt>
                <dd>{block.components ? `~${block.components}` : "A informar"}</dd>
              </div>
              {block.enredo && (
                <div className="ficha__item">
                  <dt>Enredo</dt>
                  <dd>{block.enredo}</dd>
                </div>
              )}
            </dl>

            <p className="muted">
              <Badge tone="muted">Filiado</Badge> Informações oficiais em
              atualização pela diretoria da liga.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--sand">
          <div className="container">
            <SectionHead
              eyebrow="Blocos"
              title="Outros blocos filiados"
              action={{ href: "/blocos", label: "Ver todos" }}
            />
            <div className="card-grid">
              {related.map((b) => (
                <BlockCard key={b.slug} block={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}