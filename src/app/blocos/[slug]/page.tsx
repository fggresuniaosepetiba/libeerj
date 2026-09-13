import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blocksService } from "@/lib/services";
import { Badge, BlockCard, CategoryBadge, SectionHead } from "@/components/ui";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const block = blocksService.getBySlug(slug);
  if (!block) return { title: "Bloco não encontrado" };
  return {
    title: block.name,
    description: `${block.description ?? ""} ${block.category === "enredo" ? "Bloco de enredo" : "Bloco de embalo"} de ${block.neighborhood}.`,
  };
}

export default async function BlockDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const block = blocksService.getBySlug(slug);
  if (!block) notFound();

  const cover =
    block.category === "enredo"
      ? "/assets/images/blocks/category-enredo.jpg"
      : "/assets/images/blocks/category-embalo.jpg";

  const related = blocksService
    .visual(block.category)
    .filter((b) => b.slug !== block.slug)
    .slice(0, 3);

  return (
    <>
      <section className="hero" style={{ minHeight: 380 }}>
        <div className="hero__media">
          <Image src={cover} alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero__scrim" aria-hidden />
        <div className="container hero__content">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / <Link href="/blocos">Blocos</Link> /{" "}
            {block.name}
          </nav>
          <h1>{block.name}</h1>
          {block.slogan && <p className="hero__lead">“{block.slogan}”</p>}
        </div>
      </section>

      <section className="section">
        <div className="container profile">
          <aside className="profile__side">
            <span className="profile__logo">
              <Image src={block.logo} alt={`Logomarca do bloco ${block.name}`} width={104} height={104} />
            </span>
            <CategoryBadge category={block.category} />
            <p className="credit" style={{ marginTop: 12 }}>
              Fundado em {block.foundedYear} · {block.neighborhood}
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
            <p className="lead">{block.description}</p>

            <dl className="ficha">
              <div className="ficha__item">
                <dt>Diretoria — presidente</dt>
                <dd>{block.president}</dd>
              </div>
              <div className="ficha__item">
                <dt>Vice-presidência</dt>
                <dd>{block.vicePresident}</dd>
              </div>
              <div className="ficha__item">
                <dt>Direção de Carnaval</dt>
                <dd>{block.carnivalDirector}</dd>
              </div>
              <div className="ficha__item">
                <dt>Bairro</dt>
                <dd>{block.neighborhood}</dd>
              </div>
              <div className="ficha__item">
                <dt>Fundação</dt>
                <dd>{block.foundedYear}</dd>
              </div>
              <div className="ficha__item">
                <dt>Componentes estimados</dt>
                <dd>~{block.components}</dd>
              </div>
            </dl>

            <p className="muted">
              <Badge tone="muted">Demo</Badge> Dados de diretoria e público são
              ilustrativos e não representam a entidade real.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--sand">
          <div className="container">
            <SectionHead
              eyebrow="Blocos"
              title={`Também são ${block.category === "enredo" ? "de enredo" : "de embalo"}`}
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