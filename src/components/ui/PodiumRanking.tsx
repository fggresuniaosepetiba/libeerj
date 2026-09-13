import Link from "next/link";
import Image from "next/image";
import type { CarnivalBlock, Ranking } from "@/lib/types";
import type { RankRow } from "./RankingTable";

const MEDALS = [
  {
    emoji: "🥇",
    pos: "1º",
    step: "podium-step--gold",
    medalCls: "podium-medal--gold",
    name: "Campeão",
  },
  {
    emoji: "🥈",
    pos: "2º",
    step: "podium-step--silver",
    medalCls: "podium-medal--silver",
    name: "Vice",
  },
  {
    emoji: "🥉",
    pos: "3º",
    step: "podium-step--bronze",
    medalCls: "podium-medal--bronze",
    name: "Terceiro",
  },
];

function BlockName({ block, entry }: RankRow) {
  if (!block) return <span className="podium-name">{entry.blockId}</span>;
  return (
    <Link className="podium-name" href={`/blocos/${block.slug}`}>
      {block.name}
    </Link>
  );
}

export function PodiumRanking({
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
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3, limit);

  return (
    <div className={`podium-card${category === "enredo" ? "" : " podium-card--embalo"}`}>
      <div className="podium-steps" role="list" aria-label="Pódio">
        {MEDALS.map((m, i) => {
          const row = podium[i];
          if (!row) return null;
          const { entry, block } = row;
          return (
            <div
              key={`medal-${entry.position}`}
              className={`podium-step ${m.step}${i === 0 ? " podium-step--first" : ""}`}
              role="listitem"
            >
              <dl className="podium__body">
                <div className="podium__img">
                  {block && (
                    <Image
                      src={block.logo}
                      alt=""
                      width={56}
                      height={56}
                    />
                  )}
                </div>
                <dt className="podium__label">{m.name}</dt>
                <dd className="podium__block">
                  <BlockName block={block} entry={entry} />
                </dd>
                <dd className="podium__place">{block?.neighborhood ?? "—"}</dd>
                <dd className="podium__pts">
                  <strong>{entry.points}</strong> pts
                </dd>
              </dl>
              <span className={`podium-medal ${m.medalCls}`} aria-hidden="true">
                {m.emoji}
              </span>
              <span className="podium-cap">
                <span className="podium-pos">{m.pos}</span>
              </span>
            </div>
          );
        })}
      </div>

      {rest.length > 0 && (
        <ul className="podium-rest">
          {rest.map(({ entry, block }) => (
            <li key={`rest-${entry.position}`}>
              <span className="podium-rest__pos">{entry.position}º</span>
              <span className="podium-rest__img">
                {block && (
                  <Image src={block.logo} alt="" width={24} height={24} />
                )}
              </span>
              <span className="podium-rest__name">
                <BlockName block={block} entry={entry} />
              </span>
              <span className="podium-rest__pts">{entry.points} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
