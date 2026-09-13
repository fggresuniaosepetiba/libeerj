import type { BoardGroup } from "@/lib/types";

/**
 * DIRETORIA — composição real informada pela presidência da LIBEERJ.
 * Cargos multi-integrantes são representados por um membro por pessoa,
 * compartilhando o mesmo cargo.
 */
export const BOARD_GROUPS: BoardGroup[] = [
  {
    id: "executiva",
    title: "Diretoria Executiva",
    subtitle:
      "Responsável pela condução administrativa e pelas frentes estratégicas da liga.",
    members: [
      { role: "Presidente Administrativo", name: "Gabriel Macedo" },
      { role: "Vice-Presidente Administrativa", name: "Luciana Serra" },
      { role: "Vice-Presidente de Carnaval", name: "Eduardo Alvarenga" },
      { role: "Vice-Presidente Financeira", name: "Hellen Kathelen" },
      { role: "Vice-Presidente Cultural", name: "Verônica Moura" },
    ],
  },
  {
    id: "diretoria",
    title: "Diretoria",
    subtitle:
      "Direções temáticas que operam o dia a dia da liga e suas frentes técnicas.",
    members: [
      { role: "Direção Jurídica e Contábil", name: "Drº Willian" },
      { role: "Direção Jurídica e Contábil", name: "Drª Maria" },
      { role: "Direção de Carnaval", name: "William Ribeiro" },
      { role: "Direção de Carnaval", name: "Luciana Corrêa" },
      { role: "Direção de Carnaval", name: "Allan Oliver" },
      { role: "Direção Administrativa", name: "Joyce Santos" },
      { role: "Direção Administrativa", name: "Luciana Corrêa" },
      { role: "Direção Administrativa", name: "João Ribeiro" },
      { role: "Direção de Eventos", name: "Diego" },
      { role: "Direção de Eventos", name: "Matheus" },
      { role: "Direção de Eventos", name: "Renan" },
      { role: "Direção de Eventos", name: "David" },
      { role: "Diretora Social", name: "Martha Aime" },
      { role: "Diretor de Comunicação", name: "Moisés Guimarães" },
      { role: "Direção de Editais", name: "Verônica Moura" },
      { role: "Direção de Editais", name: "Neide Manhães" },
    ],
  },
  {
    id: "conselho",
    title: "Conselho Fiscal e Deliberativo",
    subtitle:
      "Instância de fiscalização e deliberação colegiada da liga.",
    members: [
      { role: "Presidente", name: "Lorrayne Vitória" },
      { role: "1º Suplente", name: "Kawan Felipe" },
      { role: "2º Suplente", name: "Fábio Maurício" },
    ],
  },
];