import Link from "next/link";
import type { Metadata } from "next";
import { galleryService } from "@/lib/services";
import { GaleriaGrid } from "@/components/gallery/GaleriaGrid";
import { Badge } from "@/components/ui";
import { FILE_CREDIT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Memória",
  description:
    "Acervo de memória da folia de rua carioca: registros, história e a preservação da cultura dos blocos.",
};

const TIMELINE = [
  { year: "1923", title: "O busto de Guarda-Chuva", text: "Blocos pioneiros surgem no centro e dão início à folia de rua como conhecemos." },
  { year: "—", title: "A pipoca se espalha", text: "A cultura do bloco se multiplica pela cidade, bairro a bairro, sem distinção." },
  { year: "1984", title: "O sambódromo entra em cena", text: "Os desfiles ganham palco oficial e o entorno vira território de blocos." },
  { year: "—", title: "Blocos, camisas e elogio à rua", text: "As camisas próprias financiam a festa e consolidam a identidade visual de cada bloco." },
  { year: "2027", title: "O Carnaval de hoje", text: "Mais de 50 blocos filiados, ensaios o ano inteiro e uma agenda que movimenta todos os cantos do Rio." },
];

export default function MemoriaPage() {
  const items = galleryService.latest(24);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / Memória
          </nav>
          <h1>Memória da folia</h1>
          <p>
            Registros fotográficos e marcos da história dos blocos de rua do Rio
            de Janeiro. Preservar a memória é garantir que o Carnaval continue
            sendo de todo mundo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Uma linha do tempo</h2>
          <div className="card-grid" style={{ marginTop: 20 }}>
            {TIMELINE.map((entry, i) => (
              <div className="card" key={i}>
                <div className="card__body">
                  <Badge tone="gold">{entry.year}</Badge>
                  <h3>{entry.title}</h3>
                  <p className="muted">{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <h2>Acervo fotográfico</h2>
          <p className="muted" style={{ maxWidth: "70ch", marginBottom: 24 }}>
            Seleção de registros do acervo público via Wikimedia Commons. Os
            créditos completos estão listados na página de atribuições.
          </p>
          <GaleriaGrid items={items} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="credit" style={{ maxWidth: "80ch" }}>{FILE_CREDIT}</p>
        </div>
      </section>
    </>
  );
}