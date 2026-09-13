"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

const FILTERS: Array<{ value: GalleryCategory | "all"; label: string }> = [
  { value: "all", label: "Tudo" },
  { value: "memoria", label: "Memória" },
  { value: "embalo", label: "Embalo" },
  { value: "enredo", label: "Enredo" },
  { value: "blocos", label: "Blocos" },
  { value: "geral", label: "Geral" },
];

export function GaleriaGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="rank-tabs" role="group" aria-label="Filtrar galeria">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`tab${filter === f.value ? " tab--active" : ""}`}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="gal-grid">
        {visible.map((item) => (
          <figure key={item.id} className="gal-item">
            <Image
              src={item.image}
              alt={item.caption}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 25vw"
            />
            <figcaption className="gal-item__cap">
              <strong>{item.title}</strong>
              {item.year && ` · ${item.year}`}
            </figcaption>
          </figure>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="empty">Nenhum registro para esta categoria ainda.</p>
      )}
    </div>
  );
}