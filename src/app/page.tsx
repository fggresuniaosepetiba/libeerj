import Image from "next/image";
import { SITE } from "@/lib/site";
import { homeService } from "@/lib/services";
import { eventsService } from "@/lib/services";
import { blocksService } from "@/lib/services";
import { boardService } from "@/lib/services";
import {
  BlockCard,
  ButtonLink,
  EventCard,
  NewsCard,
  SectionHead,
  Stat,
} from "@/components/ui";
import { PreregistrationForm } from "@/components/forms/PreregistrationForm";
import { DonationForm } from "@/components/forms/DonationForm";

export default function HomePage() {
  const filiados = blocksService.registered(6);
  const news = homeService.latestNews(3);
  const events = homeService.upcomingEvents(6);
  const count = blocksService.count();
  const upcomingCount = eventsService.upcoming().length;
  const executive = boardService.executive()?.members.length ?? 0;
  const boardGroups = boardService.groups();

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
            <ButtonLink href="/agenda" variant="ghost">
              Ver agenda 2027
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" aria-label="A Liga em números">
        <div className="container">
          <div className="stats">
            <Stat value={String(count)} label="blocos filiados" emphasis="+"/>
            <Stat value={String(executive)} label="membros na diretoria executiva" />
            <Stat value={String(SITE.currentYear)} label="próximo desfile" />
            <Stat value={String(upcomingCount)} label="eventos na agenda do ano" />
          </div>
        </div>
      </section>

      {/* Blocos filiados */}
      <section className="section section--sand" aria-labelledby="filiados-title">
        <div className="container">
          <SectionHead
            eyebrow="Blocos"
            title="Lista de blocos filiados"
            lede="Conheça os blocos associados à LIBEERJ, na ordem de cadastro junto à liga."
            action={{ href: "/blocos", label: "Ir para Blocos" }}
          />
          <div className="card-grid">
            {filiados.map((block) => (
              <BlockCard key={block.slug} block={block} />
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="section" aria-labelledby="agenda-title">
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
      <section className="section section--sand" aria-labelledby="noticias-title">
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

      {/* Diretoria */}
      <section className="section" aria-labelledby="diretoria-title">
        <div className="container board-teaser">
          <div className="board-teaser__intro">
            <SectionHead
              eyebrow="Instituição"
              title="Diretoria"
              lede="Uma equipe dedicada à organização, à representação e ao futuro dos blocos filiados."
            />
            <ButtonLink href="/diretoria">Conheça nossa Diretoria</ButtonLink>
          </div>
          <aside className="board-teaser__card" aria-label="Grupos da diretoria">
            <h3>Estrutura dirigente</h3>
            <ul>
              {boardGroups.map((group) => (
                <li key={group.id}>
                  <span className="board-teaser__group">{group.title}</span>
                  <span className="board-teaser__count">
                    {group.members.length}{" "}
                    {group.members.length === 1 ? "membro" : "membros"}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Faça parte da folia */}
      <section className="section section--navy join" id="participar" aria-labelledby="cta-title">
        <div className="container">
          <div className="join__grid">
            <div className="join__intro">
              <span className="section-head__eyebrow">Participe</span>
              <h2 id="cta-title">Faça parte da folia</h2>
              <p className="lead" style={{ color: "#dfe6f5" }}>
                A LIBEERJ representa os blocos de embalo e enredo do Rio. Mega
                eventos, projetos sociais e uma história que se escreve na rua.
              </p>

              <div className="join__mv">
                <div className="join__mv-item">
                  <h3>Missão</h3>
                  <p>
                    Representar, organizar e valorizar os blocos de embalo e
                    enredo do estado do Rio, mantendo o carnaval de rua
                    acessível, democrático e seguro.
                  </p>
                </div>
                <div className="join__mv-item">
                  <h3>Visão</h3>
                  <p>
                    Ser a referência estadual de organização da folia de rua,
                    com blocos fortes, calendário estável e uma folia cada vez
                    mais plural.
                  </p>
                </div>
                <div className="join__mv-item">
                  <h3>Valores</h3>
                  <p>
                    Diversidade, tradição, autonomia, transparência e respeito
                    à rua e ao folião.
                  </p>
                </div>
              </div>

              <figure className="join__quote">
                <blockquote>
                  &quot;Nossa liga nasceu da rua e é para a rua: enquanto houver
                  alegria para desfilar, haverá LIBEERJ defendendo cada bloco.&quot;
                </blockquote>
                <figcaption>
                  <span className="join__signature">Gabriel Macedo</span>
                  <span className="join__byline">
                    {" "}
                    — Presidente Administrativo da LIBEERJ
                  </span>
                </figcaption>
              </figure>

              <p className="muted" style={{ color: "#b9c4dd" }}>
                Blocos interessados em se filiar, parceiros e voluntários podem
                manifestar interesse ao lado — a diretoria responde cada
                pré-inscrição pessoalmente.
              </p>

              <div className="hero__actions" style={{ justifyContent: "flex-start" }}>
                <ButtonLink href="/a-liga">Conheça a Liga</ButtonLink>
                <ButtonLink href="/memoria" variant="ghost">
                  Nossa Memória
                </ButtonLink>
              </div>
            </div>

            <PreregistrationForm />
          </div>
        </div>
      </section>

      {/* Apoie a LIBEERJ */}
      <section className="section support" id="apoio" aria-labelledby="support-title">
        <div className="container support__grid">
          <div className="support__intro">
            <span className="section-head__eyebrow">Apoio</span>
            <h2 id="support-title">Apoie a LIBEERJ</h2>
            <p className="support__lead">
              Ajude a levar o Carnaval de volta para a rua — onde a festa é do
              povo.
            </p>
            <p className="support__text">
              O Carnaval da LIBEERJ vive da força de quem o faz. Nossos blocos e
              baterias caminham com plumas, suor e alegria, mas é a sua
              contribuição que mantém essa cultura pulsando. Cada real doado
              vira música, fantasia, dança e memória para milhares de foliões.
            </p>
            <p className="support__cta-line">
              A rua é o nosso palco — e você pode ser parte dessa festa.
            </p>
          </div>

          <DonationForm />
        </div>
      </section>
    </>
  );
}