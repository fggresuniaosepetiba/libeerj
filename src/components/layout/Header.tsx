"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const scroller = document.querySelector(".page-scroll");
    if (!scroller) return;
    const onScroll = () => {
      const atTop = scroller.scrollTop <= 12;
      setHidden(openRef.current ? false : !atTop);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const scroller = document.querySelector(".page-scroll");
    if (scroller) scroller.scrollTo({ top: 0, behavior: "instant" });
    setHidden(false);
  }, [pathname]);

  return (
    <header className={hidden ? "site-header is-hidden" : "site-header"}>
      <div className="container site-header__inner">
        <Link className="brand" href="/" aria-label={`${SITE.name} — página inicial`} onClick={() => setOpen(false)}>
          <span className="brand__logo">
            <Image
              src="/assets/images/libeerj-logo.jpeg"
              alt="Logo da LIBEERJ"
              width={44}
              height={44}
              priority
            />
          </span>
          <span className="brand__text">
            <span className="brand__name">{SITE.name}</span>
            <span className="brand__sub">Blocos de Enredo e Embalo</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => {
            setOpen((v) => !v);
            setHidden(false);
          }}
        >
          <span aria-hidden>☰</span>
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="site-nav--mobile container"
          aria-label="Navegação mobile"
        >
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}