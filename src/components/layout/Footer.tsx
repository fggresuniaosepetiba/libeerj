import Link from "next/link";
import { NAV, SITE, SOCIAL } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h3>{SITE.name}</h3>
            <p className="credit">
              {SITE.fullName}. {SITE.founded}.
            </p>
            <p className="credit">
              {SITE.address} · {SITE.email}
              <br />
              {SITE.phone}
            </p>
          </div>

          <nav aria-label="Mapa do site">
            <h3>Navegação</h3>
            <ul>
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>Redes</h3>
            <ul>
              <li><a href={SOCIAL.instagram} rel="noopener noreferrer" target="_blank">Instagram</a></li>
              <li><a href={SOCIAL.facebook} rel="noopener noreferrer" target="_blank">Facebook</a></li>
              <li><a href={SOCIAL.youtube} rel="noopener noreferrer" target="_blank">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {SITE.name} — Carnaval {SITE.currentYear} em destaque.
          </span>
          <span className="credit">
            Site demonstrativo. Dados, eventos e rankings ilustrativos.
          </span>
        </div>
      </div>
    </footer>
  );
}