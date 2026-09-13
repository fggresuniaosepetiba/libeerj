import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { blocksService } from "@/lib/services";
import { boardService } from "@/lib/services";
import { ButtonLink, SectionHead, Stat } from "@/components/ui";

export const metadata: Metadata = {
  title: "A Liga",
  description: `Conheça a ${SITE.fullName}: missão, valores, estrutura e como fazer parte.`,
};

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
    text: "Regulamento claro, calendário estável e transparência administrativa.",
  },
];

export default function ALigaPage() {
  const count = blocksService.count();
  const executive = boardService.executive();

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
                regulamento, agenda, comunicação e projetos sociais.
              </p>
            </div>

            <div className="stats">
              <Stat value={String(count)} label="blocos filiados" />
              <Stat value={String(executive?.members.length ?? 0)} label="membros na diretoria executiva" />
              <Stat value={String(SITE.currentYear)} label="edição em destaque" />
              <Stat value={String(boardService.groups().length)} label="grupos dirigentes" />
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

          <SectionHead eyebrow="Estrutura" title="Diretoria" lede={executive?.subtitle} />
          <div className="card-grid">
            {executive?.members.map((member) => (
              <div className="person-card" key={`${member.role}-${member.name}`}>
                <span className="person-card__initials" aria-hidden>
                  {member.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <h3>{member.name}</h3>
                <p className="muted">{member.role}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <ButtonLink href="/diretoria">Conheça toda a Diretoria</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container center">
          <h2 style={{ color: "var(--c-paper)" }}>Quer fazer parte?</h2>
          <p style={{ color: "#d6dff0", maxWidth: "60ch", marginInline: "auto" }}>
            Blocos interessados em filiar-se podem manifestar interesse em nosso
            formulário de pré-inscrição; a diretoria retorna cada contato
            pessoalmente.
          </p>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <ButtonLink href="/#participar">Manifestar interesse</ButtonLink>
            <ButtonLink href="/blocos" variant="ghost">
              Conhecer os blocos
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}