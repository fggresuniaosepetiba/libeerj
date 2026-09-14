"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

type ZoomablePhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  mediaClassName: string;
  caption?: string;
  credit?: string;
  figureStyle?: CSSProperties;
};

/**
 * Figura com lightbox: clicar na foto abre a versão ampliada em tela cheia.
 * O hero da página não usa este componente — só as foto das seções.
 */
export function ZoomablePhoto({
  src,
  alt,
  sizes,
  mediaClassName,
  caption,
  credit,
  figureStyle,
}: ZoomablePhotoProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const scroller = document.querySelector<HTMLElement>(".page-scroll");
    const prevOverflow = scroller?.style.overflow ?? "";
    if (scroller) scroller.style.overflow = "hidden";

    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      if (scroller) scroller.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <figure className="hist-figure" style={figureStyle}>
      <button
        ref={triggerRef}
        type="button"
        className="hist-zoom"
        title="Ampliar foto"
        aria-label={`Ampliar imagem: ${alt}`}
        onClick={() => setOpen(true)}
      >
        <span className={mediaClassName}>
          <Image src={src} alt={alt} fill sizes={sizes} />
        </span>
      </button>

      <figcaption>
        <p className="hist-caption">{caption}</p>
        {credit ? <p className="hist-credit">{credit}</p> : null}
      </figcaption>

      {open ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <div
            className="lightbox__inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox__head">
              <button
                ref={closeRef}
                type="button"
                className="lightbox__close"
                aria-label="Fechar imagem ampliada"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="lightbox__media">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 760px) 94vw, 1120px"
              />
            </div>
            <div className="lightbox__meta">
              <p className="lightbox__caption">{caption}</p>
              {credit ? <p className="lightbox__credit">{credit}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </figure>
  );
}