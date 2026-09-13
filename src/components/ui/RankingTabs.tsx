"use client";

import { useState } from "react";
import type { Ranking } from "@/lib/types";
import { CATEGORY_SHORT } from "@/lib/types";
import type { RankRow } from "./RankingTable";
import { RankingTable } from "./RankingTable";

export function RankingTabs({
  enredo,
  embalo,
  enredoRows,
  embaloRows,
  limit = 6,
}: {
  enredo?: Ranking;
  embalo?: Ranking;
  enredoRows: RankRow[];
  embaloRows: RankRow[];
  limit?: number;
}) {
  const [category, setCategory] = useState<"enredo" | "embalo">("enredo");

  const ranking = category === "enredo" ? enredo : embalo;
  const rows = category === "enredo" ? enredoRows : embaloRows;

  return (
    <div className="rank-tabs-card">
      <div
        className="rank-tabs"
        role="tablist"
        aria-label="Escolha a categoria do ranking"
      >
        {(["enredo", "embalo"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            id={`tab-${cat}`}
            aria-selected={category === cat}
            aria-controls="rank-panel"
            className={`tab${category === cat ? " tab--active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            Blocos de {CATEGORY_SHORT[cat]}
          </button>
        ))}
      </div>

      <div
        id="rank-panel"
        role="tabpanel"
        aria-labelledby={`tab-${category}`}
        className="rank-panel"
      >
        {ranking && (
          <RankingTable
            ranking={ranking}
            rows={rows}
            category={category}
            limit={limit}
          />
        )}
      </div>
    </div>
  );
}
