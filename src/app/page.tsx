import Image from "next/image";
import { SITE } from "@/lib/site";
import { homeService } from "@/lib/services";
import { eventsService } from "@/lib/services";
import { CATEGORY_SHORT } from "@/lib/types";
import {
  Badge,
  BlockCard,
  ButtonLink,
  EventCard,
  NewsCard,
  SectionHead,
  Stat,
} from "@/components/ui";
import { PodiumRanking } from "@/components/ui/PodiumRanking";

export default function HomePage() {
  const featured = homeService.featuredBlocks();
  const news = homeService.latestNews(3);
  const events = homeService.upcomingEvents(4);
  const rankings = homeService.activeRankings();
  const upcomingCount = eventsService.upcoming().length;

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Destaque">
        <div className="hero__media">
          <Image
            src="/assets/images/hero/hero-carnaval-parade.jpg"
            alt="Desfile de bloco na rua durante o Carnaval"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero__scrim" aria-hidden />
        <div className="container hero__content">
          <span className="hero__kicker">✦ Carnaval {SITE.currentYear} em desfile</span>
          <h1>{SITE.name}</h1>
          <p className="hero__lead">
            Liga Independente dos Blocos de Enredo e Embalo do Estado do Rio de Janeiro. O carnaval de
            rua organizado, representado e celebrado — com inúmeros blocos de todo Estado filiados e uma
            agenda de rua que é a cara do Rio.
          </p>
          <div className="hero__actions">
            <ButtonLink href="/blocos">Conheça os blocos</ButtonLink>
            <ButtonLink href="/rankings" variant="ghost">
              Ver rankings 2027
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" aria-label="A Liga em números">
        <div className="container">
          <div className="stats">
            <Stat value="50" label="blocos filiados" emphasis="+"/>
            <Stat value="2" label="categorias: embalo e enredo" />
            <Stat value={String(SITE.currentYear)} label="próximo desfile" />
            <Stat value={String(upcomingCount)} label="eventos na agenda do ano" />
          </div>
        </div>
      </section>

      {/* Blocos em destaque */}
      <section className="section section--sand" aria-labelledby="destacados-title">
        <div className="container">
          <SectionHead
            eyebrow="Blocos"
            title="Blocos em destaque"
            lede="Uma amostra da diversidade dos nossos filiados, do centro à orla."
            action={{ href: "/blocos", label: "Ver todos os blocos" }}
          />
          <div className="card-grid">
            {featured.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section className="section" aria-labelledby="rankings-title">
        <div className="container">
          <SectionHead
            eyebrow="Rankings"
            title="Ranking do Carnaval 2027"
            lede="Apuração das categorias de embalo e enredo. Dados demonstrativos."
            action={{ href: "/rankings", label: "Ir para rankings" }}
          />

          <div className="rank-duo">
            {(["enredo", "embalo"] as const).map((category) => {
              const ranking = rankings[category].find((r) => r.type === "annual");
              if (!ranking) return null;
              const rows = homeService.rankingRows(ranking);
              return (
                <PodiumRanking
                  key={category}
                  ranking={ranking}
                  rows={rows}
                  category={category}
                  limit={6}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="section section--sand" aria-labelledby="agenda-title">
        <div className="container">
          <SectionHead
            eyebrow="Agenda"
            title="Próximos eventos"
            lede="Ensaios, desfiles e atividades abertas ao público."
            action={{ href: "/agenda", label: "Ver agenda completa" }}
          />
          <div className="card-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Notícias */}
      <section className="section" aria-labelledby="noticias-title">
        <div className="container">
          <SectionHead
            eyebrow="Notícias"
            title="Últimas notícias"
            lede="Cobertura da Liga para a imprensa e para o folião."
            action={{ href: "/noticias", label: "Todas as notícias" }}
          />
          <div className="card-grid">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--navy" aria-labelledby="cta-title">
        <div className="container center">
          <h2 id="cta-title">Faça parte da folia</h2>
          <p className="lead" style={{ color: "#dfe6f5" }}>
            A LIBEERJ representa os blocos de embalo e enredo do Rio. Mega eventos,
            projetos sociais e uma história que se escreve na rua.
          </p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <ButtonLink href="/a-liga">Conheça a Liga</ButtonLink>
            <ButtonLink href="/memoria" variant="ghost">
              Nossa memória
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}