import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section section--navy">
      <div className="container center">
        <h1 style={{ color: "var(--c-paper)" }}>Página não encontrada</h1>
        <p style={{ color: "#d6dff0" }}>
          A página que você procura não existe ou foi movida.
        </p>
        <p>
          <Link className="btn btn--gold" href="/">
            Voltar para o início
          </Link>
        </p>
        <span className="sr-only">{SITE.name}</span>
      </div>
    </section>
  );
}