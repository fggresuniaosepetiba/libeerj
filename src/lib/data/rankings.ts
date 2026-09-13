import type { Ranking, RankingEntry } from "@/lib/types";
import { BLOCKS_DATA } from "@/lib/data/blocks";

const byId = new Map(BLOCKS_DATA.map((b) => [b.slug, b]));

const embaloOrder: string[] = [
  // campeões e destaques 2027
  "o-fervo-da-lapa",
  "maré-alta",
  "pequena-africa",
  "empurra-que-pega",
  "batuque-de-santa",
  "bossa-no-tambor",
  "bloco-do-carmo",
  "crioula-do-avelar",
  "traca-formosa",
  "passo-de-mestre",
  "sexta-de-samba",
  "dona-rosa",
  "coracao-da-pedra",
  "meu-bem-volta-depois",
  "siri-da-gavea",
  "pelo-amor-de-deus",
  "sol-da-rocinha",
  "dia-de-rubra",
  "janelinha-de-ouro",
  "bote-quente",
  "tricoteiras-do-samba",
  "voo-livre",
  "arrasa-centro",
  "jardim-de-inverno",
  "estrelinha-da-cidade",
  "sambaba-do-saenz",
];

const enredoOrder: string[] = [
  // campeões e destaques 2027
  "corte-do-amanha",
  "estrela-do-cais",
  "imperio-do-boi",
  "uniao-da-serra",
  "coral-do-centro",
  "flor-de-graca",
  "tambor-de-ouro",
  "azul-da-guia",
  "matriz-do-samba",
  "sol-da-mangueira",
  "rosa-dos-ventos",
  "vozes-do-samba",
  "estrela-guia",
  "princesa-da-lapa",
  "aurora-carioca",
  "reino-da-primavera",
  "girasol-da-penha",
  "grinalda-de-ouro",
  "lua-de-cristal",
  "beija-flor-do-cais",
  "soldado-do-samba",
  "orquestra-do-morro",
  "jardim-de-bodas",
  "estrela-do-mar",
  "cidade-das-artes",
  "corte-do-amanha",
];

const annualPoints = [
  270, 262, 255, 249, 244, 240, 236, 232, 228, 224, 220, 216, 212, 208, 204,
  200, 196, 192, 188, 184, 180, 176, 172, 168, 164,
];

const buildEntries = (
  order: string[],
  points: number[],
  variantSeed: number,
): RankingEntry[] =>
  order.map((slug, i) => {
    const idx = Math.min(i, points.length - 1);
    const variation =
      i === 0 ? 0
      : ((variantSeed * 11 + i * 5) % 5) - 2 === -2 ? -1
      : ((variantSeed * 11 + i * 5) % 5) - 2;
    return {
      blockId: slug,
      position: i + 1,
      points: points[idx],
      variation: variation === -2 ? -1 : variation,
    };
  });

const overallEntries = (
  order: string[],
  variantSeed: number,
): RankingEntry[] =>
  order.map((slug, i) => {
    const block = byId.get(slug);
    const base = block?.foundedYear ?? 2000;
    const accumulated = 2450 - i * 27 + ((base % 9) - 4);
    const variation = ((variantSeed ** 2 + i * 13) % 5) - 2;
    return {
      blockId: slug,
      position: i + 1,
      points: Math.max(accumulated, 900),
      variation: variation === -2 ? -1 : variation,
    };
  });

export const RANKINGS_DATA: Ranking[] = [
  {
    id: "ranking-2027-embalo",
    year: 2027,
    type: "annual",
    category: "embalo",
    title: "Ranking 2027 — Blocos de Embalo",
    entries: buildEntries(embaloOrder, annualPoints, 3),
  },
  {
    id: "ranking-2027-enredo",
    year: 2027,
    type: "annual",
    category: "enredo",
    title: "Ranking 2027 — Blocos de Enredo",
    entries: buildEntries(enredoOrder, annualPoints, 7),
  },
  {
    id: "ranking-geral-embalo",
    type: "overall",
    category: "embalo",
    title: "Ranking Geral — Blocos de Embalo",
    entries: overallEntries(embaloOrder, 11),
  },
  {
    id: "ranking-geral-enredo",
    type: "overall",
    category: "enredo",
    title: "Ranking Geral — Blocos de Enredo",
    entries: overallEntries(enredoOrder, 13),
  },
];

export const RANKING_YEARS = [2027, 2028, 2029, 2030];