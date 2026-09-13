import Link from "next/link";
import Image from "next/image";
import type { CarnivalBlock, Ranking, RankingEntry } from "@/lib/types";

export interface RankRow {
  entry: RankingEntry;
  block?: CarnivalBlock;
  senior?: boolean;
}

const variationLabel = (variation?: number) => {
  const v = variation ?? 0;
  if (v > 0) return { text: `▲ ${v}`, cls: "var-up" };
  if (v < 0) return { text: `▼ ${Math.abs(v)}`, cls: "var-down" };
  return { text: "—", cls: "var-flat" };
};


export function RankingTable({
  ranking,
  rows,
  category,
  limit = 6,
}: {
  ranking: Ranking;
  rows: RankRow[];
  category: "enredo" | "embalo";
  limit?: number;
}) {
  const visible = rows.slice(0, limit);
  const themeLabel = category === "enredo" ? "Enredo" : "Tema";

  const medal = (position: number) => {
    if (position === 1) return <span className="medal" aria-hidden="true">🥇</span>;
    if (position === 2) return <span className="medal" aria-hidden="true">🥈</span>;
    if (position === 3) return <span className="medal" aria-hidden="true">🥉</span>;
    return null;
  };

  return (
    <div className="rank-table-wrap">
      <table className="rank-table">
        <caption className="sr-only">{ranking.title}</caption>
        <thead>
          <tr>
            <th scope="col" className="rank-th-pos">Colocação</th>
            <th scope="col">Bloco</th>
            <th scope="col">{themeLabel}</th>
            <th scope="col" className="rank-th-pts">Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(({ entry, block }) => {
            const lead = entry.position === 1;
            return (
              <tr key={`${ranking.id}-${entry.blockId}`}>
                <td className={`rank-pos${lead ? " rank-pos--lead" : ""}`}>
                  {medal(entry.position)}
                  {entry.position}º
                </td>
                <td>
                  <span className="rank-block">
                    {block && (
                      <span className="rank-logo">
                        <Image src={block.logo} alt="" width={34} height={34} />
                      </span>
                    )}
                    {block ? (
                      <Link className="rank-name" href={`/blocos/${block.slug}`}>
                        {block.name}
                      </Link>
                    ) : (
                      <span className="rank-name">{entry.blockId}</span>
                    )}
                  </span>
                </td>
                <td className={`rank-theme${lead ? " rank-theme--lead" : ""}`}>
                  {block?.enredo ?? "—"}
                </td>
                <td className={`rank-pts${lead ? " rank-pts--lead" : ""}`}>
                  <strong>{entry.points}</strong> pts
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
