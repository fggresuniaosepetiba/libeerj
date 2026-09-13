import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { boardService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Diretoria",
  description: `Conheça a Diretoria da ${SITE.fullName}.`,
};

export default function DiretoriaPage() {
  const groups = boardService.groups();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / Diretoria
          </nav>
          <h1>Diretoria</h1>
          <p>
            A composição dirigente da {SITE.fullName}, organizada em grupos de
            atuação.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container board-page">
          {groups.map((group) => (
            <div className="board-group" key={group.id}>
              <span className="section-head__eyebrow">{group.title}</span>
              <h2 className="board-group__title">{group.title}</h2>
              <p className="muted board-group__subtitle">{group.subtitle}</p>

              <div className="card-grid board-group__grid">
                {group.members.map((member) => (
                  <div className="person-card" key={`${member.role}-${member.name}`}>
                    <span className="person-card__initials" aria-hidden>
                      {member.name
                        .split(" ")
                        .filter((p) => /^[^\d]/.test(p))
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <h3>{member.name}</h3>
                    <p className="muted">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="muted" style={{ marginTop: 32, maxWidth: "70ch" }}>
            Composição informada oficialmente pela presidência da liga
            (Carnaval {SITE.currentYear}). Cargos ocupados por mais de uma
            pessoa são listados individualmente.
          </p>
        </div>
      </section>
    </>
  );
}