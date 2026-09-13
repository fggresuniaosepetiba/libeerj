import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { blocksService } from "@/lib/services";
import { ButtonLink } from "@/components/ui";
import { FiliationForm } from "@/components/forms/FiliationForm";

export const metadata: Metadata = {
  title: "A Liga",
  description: `A ${SITE.fullName}: atuação institucional, história, blocos filiados e pré-inscrição para filiação.`,
};

const ACTUATIONS = [
  {
    title: "Organização",
    text: "Construção de calendário, regulamento e critérios técnicos que garantem desfiles previsíveis, seguros e bem apresentados.",
  },
  {
    title: "Representação",
    text: "A liga é a voz institucional dos blocos junto ao poder público, à imprensa e à sociedade.",
  },
  {
    title: "Integração",
    text: "Aproxima os filiados entre si, promovendo a troca entre blocos de estilos, gerações e territórios diferentes.",
  },
  {
    title: "Valorização da cultura",
    text: "Preserva e difunde o carnaval de rua como manifestação cultural de acesso livre, gratuito e democrático.",
  },
  {
    title: "Fortalecimento da folia",
    text: "Trabalha durante todo o ano para que cada desfile aconteça com estrutura, comunicação e apoio institucional.",
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
          <h1>A Liga</h1>
          <p>{SITE.fullName}.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="apresentacao-title">
        <div className="container editorial">
          <div className="editorial__body">
            <span className="section-head__eyebrow">A Liga</span>
            <h2 id="apresentacao-title">
              Uma entidade dedicada ao carnaval de rua
            </h2>
            <p className="lead">
              A {SITE.fullName} é a entidade de representação dos blocos de
              embalo e enredo do Rio de Janeiro. Sua atuação associa autonomia,
              organização e respeito à essência da folia carioca.
            </p>
            <p>
              A liga reúne hoje{" "}
              <strong>{count} blocos filiados</strong> — pequenos e gigantes,
              antigos e novíssimos — e trabalha o ano inteiro para que a rua
              esteja pronta quando o Carnaval chegar: regulamento, agenda,
              comunicação e projetos que sustentam a cena cultural do estado.
            </p>
            <p>
              Filiados associam-se à instituição para ganhar representatividade
              institucional, calendário estável e o respaldo de uma entidade
              consolidada, construída por quem faz a festa acontecer.
            </p>
          </div>
          <figure className="editorial__figure">
            <div className="editorial__media">
              <Image
                src="/assets/images/hero/hero-samba-2024.jpg"
                alt="Bateria de bloco de samba em apresentação nas ruas"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <figcaption className="editorial__caption">
              A bateria é o coração da folia de rua: cada filiado carrega uma
              identidade própria de som, cor e movimento.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="historia-title">
        <div className="container editorial editorial--invert">
          <figure className="editorial__figure">
            <div className="editorial__media">
              <Image
                src="/assets/images/hero/hero-rio-key-ceremony.jpg"
                alt="Cerimônia institucional de abertura do Carnaval"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
            </div>
            <figcaption className="editorial__caption editorial__caption--navy">
              Momentos institucionais, como cerimônias e solenidades, marcam o
              calendário oficial da liga.
            </figcaption>
          </figure>
          <div className="editorial__body">
            <span className="section-head__eyebrow">Nossa história</span>
            <h2 id="historia-title">Uma trajetória construída pela rua</h2>
            <p>
              A LIBEERJ foi fundada para defender e organizar os blocos
              cariocas. De uma necessidade concreta — dar voz e estrutura a
              quem faz a folia acontecer — a liga consolidou uma forma própria
              de atuação, apoiada em organização, diálogo e representação.
            </p>
            <p>
              Sua história se firma ao lado de cada filiado e de cada folião,
              em permanente construção. O registro dessa memória fotográfica e
              institucional está em expansão, sempre no compromisso de não
              silenciar as ruas que deram origem à instituição.
            </p>
            <blockquote className="editorial-quote">
              <p>
                A rua é o palco permanente da liga: a cada bloco, a cada
                ensaio, a cada desfile, a LIBEERJ cumpre o propósito de defender
                o carnaval de rua como patrimônio do povo.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="atuacao-title">
        <div className="container act">
          <div className="act__intro">
            <span className="section-head__eyebrow">Nossa atuação</span>
            <h2 id="atuacao-title">O que a liga faz</h2>
            <p className="lead">
              A atuação da LIBEERJ se estrutura em frentes institucionais que
              sustentam o cotidiano dos blocos filiados durante o ano inteiro.
            </p>
          </div>
          <ul className="act-list">
            {ACTUATIONS.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="blocos-title">
        <div className="container blocks-teaser">
          <span className="section-head__eyebrow">Nossos blocos</span>
          <h2 id="blocos-title">Os filiados são o coração da liga</h2>
          <p>
            Cada bloco filiado carrega sua história, seu bairro e seu jeito de
            brincar o carnaval — e é essa pluralidade que faz da folia de rua um
            patrimônio verdadeiramente popular. A LIBEERJ atua para que cada
            filiado tenha as condições de desfilar com autonomia, estrutura e
            orgulho.
          </p>
          <ButtonLink href="/blocos" variant="navy">
            Conhecer os blocos
          </ButtonLink>
        </div>
      </section>

      <section className="section" id="filiacao" aria-labelledby="filiacao-title">
        <div className="container">
          <div className="filiation-head">
            <span className="section-head__eyebrow">Filiação</span>
            <h2 id="filiacao-title">Pré-inscrição de bloco</h2>
            <p>
              Blocos interessados em filiar-se à LIBEERJ podem registrar sua
              pré-inscrição. Os dados informados são analisados pela instituição
              e cada contato recebe retorno direto.
            </p>
          </div>
          <FiliationForm />
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="blocks-cta-title">
        <div className="container center">
          <span className="section-head__eyebrow">Blocos filiados</span>
          <h2 id="blocks-cta-title" style={{ color: "var(--c-paper)" }}>
            Conheça a alegria de cada filiado
          </h2>
          <p style={{ color: "#d6dff0", maxWidth: "60ch", marginInline: "auto" }}>
            Do ensaio mais íntimo ao desfile gigante, cada bloco da LIBEERJ
            escreve um capítulo próprio da folia carioca.
          </p>
          <div style={{ marginTop: 18 }}>
            <ButtonLink href="/blocos">Conhecer os blocos</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}