import Link from "next/link";
import Image from "next/image";
import type { CarnivalBlock, Ranking, RankingEntry } from "@/lib/types";

export interface RankRow {
  entry: RankingEntry;
  block?: CarnivalBlock;
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
  limit = 10,
}: {
  ranking: Ranking;
  rows: RankRow[];
  limit?: number;
}) {
  const visible = rows.slice(0, limit);

  return (
    <div className="rank-table-wrap">
      <table className="rank-table">
        <caption className="sr-only">{ranking.title}</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Bloco</th>
            <th scope="col">Bairro</th>
            <th scope="col">Pontos</th>
            <th scope="col">Var.</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(({ entry, block }) => {
            const lead = entry.position === 1;
            const v = variationLabel(entry.variation);
            return (
              <tr key={`${ranking.id}-${entry.blockId}`}>
                <td className={`rank-pos${lead ? " rank-pos--lead" : ""}`}>
                  {entry.position}°
                </td>
                <td>
                  <span className="rank-block">
                    {block && (
                      <span className="rank-logo">
                        <Image
                          src={block.logo}
                          alt=""
                          width={34}
                          height={34}
                        />
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
                <td className="muted">{block?.neighborhood ?? "—"}</td>
                <td className="rank-pts">{entry.points}</td>
                <td className={v.cls}>{v.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}