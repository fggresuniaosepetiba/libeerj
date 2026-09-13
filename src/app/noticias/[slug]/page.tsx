import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { newsService } from "@/lib/services";
import { Badge, NewsCard } from "@/components/ui";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const item = newsService.getBySlug(slug);
  if (!item) return { title: "Notícia não encontrada" };
  return { title: item.title, description: item.excerpt };
}

export default async function NoticiaPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = newsService.getBySlug(slug);
  if (!item) notFound();

  const more = newsService.latest(3).filter((n) => n.id !== item.id).slice(0, 2);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / <Link href="/noticias">Notícias</Link> /{" "}
            {item.category}
          </nav>
          <h1 style={{ maxWidth: "22ch" }}>{item.title}</h1>
          <p>
            {new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            {item.author ? ` · por ${item.author}` : ""}
          </p>
        </div>
      </section>

      <article className="section">
        <div className="container">
          <div className="article-hero" style={{ marginBottom: 28 }}>
            <Image
              src={item.image}
              alt={item.imageAlt ?? item.title}
              width={1600}
              height={800}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          <div className="prose">
            <p className="lead">{item.excerpt}</p>
            {item.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <p className="muted" style={{ marginTop: 24 }}>
            <Badge tone="navy">{item.category}</Badge>
          </p>

          <div style={{ marginTop: 40 }}>
            <Link className="btn btn--line" href="/noticias">
              ← Voltar para notícias
            </Link>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section section--sand">
          <div className="container">
            <h2>Continue lendo</h2>
            <div className="card-grid" style={{ marginTop: 20 }}>
              {more.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}