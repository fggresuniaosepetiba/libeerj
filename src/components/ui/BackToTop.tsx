"use client";

import { useEffect, useState } from "react";

const getScroller = (): Element | null =>
  document.querySelector<Element>(".page-scroll") ?? document.scrollingElement;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = getScroller();
      setVisible((el?.scrollTop ?? 0) > 100);
    };
    onScroll();
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  const scrollTop = () => {
    const el = getScroller();
    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " back-to-top--visible" : ""}`}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      onClick={scrollTop}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}