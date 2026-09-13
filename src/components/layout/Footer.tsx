import Image from "next/image";
import Link from "next/link";
import { FOOTER_NAV, SITE, SOCIAL } from "@/lib/site";

const socials = [
  {
    label: "WhatsApp",
    href: SOCIAL.whatsapp,
    className: "social-icon social-icon--whatsapp",
    path: (
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: SOCIAL.instagram,
    className: "social-icon social-icon--instagram",
    path: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
        <path d="M12 2.16c3.2 0 3.58.01 4.84.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.26.07 1.64.07 4.84s-.01 3.58-.07 4.84c-.05 1.17-.25 1.8-.41 2.22a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.26.06-1.64.07-4.84.07s-3.58-.01-4.84-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22-.06-1.26-.07-1.64-.07-4.84s.01-3.58.07-4.84c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.15 0-3.52.01-4.76.07-1.08.05-1.66.23-2.05.38-.52.2-.88.44-1.27.83-.39.39-.63.75-.83 1.27-.15.39-.33.97-.38 2.05-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.08.23 1.66.38 2.05.2.52.44.88.83 1.27.39.39.75.63 1.27.83.39.15.97.33 2.05.38 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.08-.05 1.66-.23 2.05-.38.52-.2.88-.44 1.27-.83.39-.39.63-.75.83-1.27.15-.39.33-.97.38-2.05.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.08-.23-1.66-.38-2.05a2.7 2.7 0 0 0-.83-1.27 2.7 2.7 0 0 0-1.27-.83c-.39-.15-.97-.33-2.05-.38-1.24-.06-1.61-.07-4.76-.07Zm0 3.06a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm5.34-2.92a1.19 1.19 0 1 1 0 2.38 1.19 1.19 0 0 1 0-2.38Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: SOCIAL.youtube,
    className: "social-icon social-icon--youtube",
    path: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
        <path d="M23.5 6.19a3.03 3.03 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.03 3.03 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.03 3.03 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.03 3.03 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo">
              <span className="site-footer__logo-img">
                <Image
                  src={SITE.logo}
                  alt="Logomarca da LIBEERJ"
                  width={56}
                  height={56}
                />
              </span>
              <span className="site-footer__logo-text">
                <strong>{SITE.name}</strong>
                <span>{SITE.shortFullName}</span>
              </span>
            </Link>
            <p className="credit">
              {SITE.founded}. O carnaval de rua representado com autonomia,
              organização e identidade própria.
            </p>
          </div>

          <nav aria-label="Mapa do site">
            <h3>Navegação</h3>
            <ul className="site-footer__nav">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__socials">
            <h3>Redes sociais</h3>
            <ul className="site-footer__social-list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className={s.className}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={s.label}
                    aria-label={s.label}
                  >
                    {s.path}
                  </a>
                </li>
              ))}
            </ul>
            <p className="credit">
              Fale com a liga: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>

          <div className="site-footer__sede">
            <h3>Sede</h3>
            <div className="site-footer__map">
              <iframe
                src="https://www.google.com/maps?q=Samb%C3%B3dromo%20da%20Marqu%C3%AAs%20de%20Sapuca%C3%AD%2C%20Rio%20de%20Janeiro&z=15&output=embed"
                title="Mapa com a localização da sede da LIBEERJ (provisoriamente na Marquês de Sapucaí)"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="credit">
              Sede provisória: Marquês de Sapucaí, Rio de Janeiro — RJ. O
              endereço oficial será confirmado pela presidência da liga.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {SITE.name} — Todos os direitos reservados.
          </span>
          <span>Desenvolvido por Trinary Solutions Software House</span>
        </div>
      </div>
    </footer>
  );
}