import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { blocksService } from "@/lib/services";
import { ButtonLink, SectionHead, Stat } from "@/components/ui";

export const metadata: Metadata = {
  title: "A Liga",
  description: `Conheça a ${SITE.fullName}: missão, valores, estrutura e como fazer parte.`,
};

const DIRECTORS = [
  { name: "Alice Embalo", role: "Presidência" },
  { name: "Bruno Enredo", role: "Vice-presidência" },
  { name: "Caio Marchinha", role: "Direção de Carnaval" },
  { name: "Duda Batuke", role: "Direção Técnica e Regulamento" },
  { name: "Érica Foliã", role: "Direção Social e Comunidade" },
  { name: "Felipe Cordão", role: "Memória e Acervo" },
];

const VALUES = [
  {
    title: "Diversidade",
    text: "Cada bloco no seu lugar, cada estilo no seu ritmo. A rua é o elo que nos une.",
  },
  {
    title: "Tradição",
    text: "Cuidamos do legado dos blocos históricos e das bandas que iniciaram a folia.",
  },
  {
    title: "Rua viva",
    text: "Grátis, aberta e democrática: a folia de rua é patrimônio do povo.",
  },
  {
    title: "Organização",
    text: "Regulamento claro, calendário estável e transparência na apuração dos rankings.",
  },
];

export default function ALigaPage() {
  const count = blocksService.count();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / A Liga
          </nav>
          <h1>{SITE.name}</h1>
          <p>{SITE.fullName}.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="profile" style={{ gridTemplateColumns: "minmax(0,1fr)", gap: 28 }}>
            <div>
              <h2>Quem somos</h2>
              <p className="lead">
                {SITE.founded}. Representamos os blocos de embalo e enredo com
                autonomia, organização e respeito à essência da folia carioca.
              </p>
              <p className="muted">
                Nossa liga reúne hoje <strong>{count} blocos filiados</strong> —
                pequenos e gigantes, antigos e novíssimos — e trabalha o ano
                inteiro para que a rua esteja pronta quando o Carnaval chegar:
                regulamento, apuração, agenda, comunicação e projetos sociais.
              </p>
            </div>

            <div className="stats">
              <Stat value={String(count)} label="blocos filiados" />
              <Stat value="2" label="categorias de desfile" />
              <Stat value={String(SITE.currentYear)} label="edição em destaque" />
              <Stat value="310" label="anos somados de folia (est.)" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow="Valores"
            title="O que defendemos"
          />
          <div className="card-grid">
            {VALUES.map((value) => (
              <div className="card" key={value.title}>
                <div className="card__body">
                  <h3>{value.title}</h3>
                  <p className="muted">{value.text}</p>
                </div>
              </div>
            ))}
          </div>

          <SectionHead eyebrow="Estrutura" title="Diretoria" />
          <div className="card-grid">
            {DIRECTORS.map((person) => (
              <div className="person-card" key={person.name}>
                <span className="person-card__initials" aria-hidden>
                  {person.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <h3>{person.name}</h3>
                <p className="muted">{person.role}</p>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 16 }}>
            <strong>Nota:</strong> diretoria demonstrativa, apenas para ilustrar a
            estrutura institucional do site.
          </p>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container center">
          <h2 style={{ color: "var(--c-paper)" }}>Quer fazer parte?</h2>
          <p style={{ color: "#d6dff0", maxWidth: "60ch", marginInline: "auto" }}>
            Blocos interessados em filiar-se podem entrar em contato com nossa
            diretoria: {SITE.email}.
          </p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <ButtonLink href="/blocos">Conhecer os blocos</ButtonLink>
            <ButtonLink href="/agenda" variant="ghost">
              Ver agenda
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}