"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Corrige o scroll de âncoras (#filiacao, #participar etc.).
 *
 * O layout do site usa um container de rolagem próprio (.page-scroll):
 * a restauração de scroll do Next age sobre a janela, que não rola
 * neste layout — e as imagens que carregam depois da navegação empurram
 * a seção alvo para fora do lugar. Este componente re-posiciona a âncora
 * a cada virada de rota e segue conferindo até a seção assentar.
 */
const getScroller = (): Element | null =>
  document.querySelector<Element>(".page-scroll") ?? document.scrollingElement;

export function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

    let timer: number | undefined;
    let ticks = 0;
    let closeStreak = 0;

    const stop = () => {
      if (timer) window.clearTimeout(timer);
      timer = undefined;
    };

    const tick = () => {
      timer = undefined;
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;

      ticks += 1;
      if (ticks > 60) return;

      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);
      const scroller = getScroller();

      if (!target || !scroller) {
        timer = window.setTimeout(tick, 120);
        return;
      }

      const margin =
        parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const scrollerTop = scroller.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const distance = targetTop - scrollerTop - margin;

      if (Math.abs(distance) > 24) {
        target.scrollIntoView({ behavior, block: "start" });
        closeStreak = 0;
      } else {
        closeStreak += 1;
        if (closeStreak >= 2) return;
        if (Math.abs(distance) > 6) {
          target.scrollIntoView({ behavior, block: "start" });
        }
      }

      timer = window.setTimeout(tick, 150);
    };

    const start = () => {
      stop();
      ticks = 0;
      closeStreak = 0;
      timer = window.setTimeout(tick, 60);
    };

    start();
    window.addEventListener("hashchange", start);
    window.addEventListener("load", start);

    return () => {
      stop();
      window.removeEventListener("hashchange", start);
      window.removeEventListener("load", start);
    };
  }, [pathname]);

  return null;
}