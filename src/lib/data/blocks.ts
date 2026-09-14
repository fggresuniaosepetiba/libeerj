import type { CarnivalBlock } from "@/lib/types";

/**
 * BLOCOS FILIADOS
 * ---------------
 * Lista oficial informada pela presidência da LIBEERJ, na ordem de
 * cadastro. A categoria de cada bloco ainda NÃO foi fornecida — por isso
 * todos os blocos estão com `category: null`.
 *
 * Os campos de exibição (bairro, fundação e enredo) estão preenchidos
 * com dados PROVISÓRIOS e fictícios para o site não ficar incompleto —
 * devem ser substituídos pelos dados oficiais informados por cada bloco.
 */
export const BLOCKS_DATA: CarnivalBlock[] = [
  { id: "deita-mas-nao-dorme", slug: "deita-mas-nao-dorme", name: "G.R.B.C. DEITA MAS NÃO DORME", category: null, neighborhood: "Rocha Miranda", foundedYear: 2006, enredo: "A vigília da folia", logo: "/assets/images/logos/deita-mas-nao-dorme.svg" },
  { id: "uniao-de-sepetiba", slug: "uniao-de-sepetiba", name: "G.R.B.C. UNIÃO DE SEPETIBA", category: null, neighborhood: "Sepetiba", foundedYear: 2024, foundedDate: "2024-02-02", enredo: "Sabejé", logo: "/assets/images/blocos de enredo/logo-escola.jpeg" },
  { id: "balanco-de-iraja", slug: "balanco-de-iraja", name: "A.C. BALANÇO DE IRAJÁ", category: null, neighborhood: "Irajá", foundedYear: 2006, enredo: "Balanço e samba no coração do subúrbio", logo: "/assets/images/logos/balanco-de-iraja.svg" },
  { id: "se-beber-nao-caia", slug: "se-beber-nao-caia", name: "G.R.B.C. SE BEBER NÃO CAIA", category: null, neighborhood: "Campo Grande", foundedYear: 2015, enredo: "Quem bebe a fama, paga com samba", logo: "/assets/images/logos/se-beber-nao-caia.svg" },
  { id: "aquilah", slug: "aquilah", name: "G.R.B.C. AQUILAH", category: null, neighborhood: "Madureira", foundedYear: 2008, enredo: "Aquilah: a força que vem das águas", logo: "/assets/images/logos/aquilah.svg" },
  { id: "oba-oba-do-recreio", slug: "oba-oba-do-recreio", name: "G.R.B.C. OBA, OBA DO RECREIO", category: null, neighborhood: "Recreio dos Bandeirantes", foundedYear: 1998, enredo: "Oba, oba: as ondas do Recreio na avenida", logo: "/assets/images/logos/oba-oba-do-recreio.svg" },
  { id: "arrastao-da-barra-de-guaratiba", slug: "arrastao-da-barra-de-guaratiba", name: "G.R.B.C. ARRASTÃO DA BARRA DE GUARATIBA", category: null, neighborhood: "Barra de Guaratiba", foundedYear: 1997, enredo: "O poder do arrastão", logo: "/assets/images/logos/arrastao-da-barra-de-guaratiba.svg" },
  { id: "academicos-de-sao-gabriel", slug: "academicos-de-sao-gabriel", name: "G.R.B.C. ACADÊMICOS DE SÃO GABRIEL", category: null, neighborhood: "Cordovil", foundedYear: 2004, enredo: "São Gabriel anuncia a folia", logo: "/assets/images/logos/academicos-de-sao-gabriel.svg" },
  { id: "mangueirinha", slug: "mangueirinha", name: "G.R.B.C. MANGUEIRINHA", category: null, neighborhood: "Vila Isabel", foundedYear: 2019, enredo: "Nas raízes do mangue, a flor do samba", logo: "/assets/images/logos/mangueirinha.svg" },
  { id: "flor-da-primavera", slug: "flor-da-primavera", name: "G.R.B.C. FLOR DA PRIMAVERA", category: null, neighborhood: "Penha", foundedYear: 2012, enredo: "Flores que florescem na avenida", logo: "/assets/images/logos/flor-da-primavera.svg" },
  { id: "academicos-do-vidigal", slug: "academicos-do-vidigal", name: "G.R.B.C. ACADÊMICOS DO VIDIGAL", category: null, neighborhood: "Vidigal", foundedYear: 2015, enredo: "O encontro do céu e do mar", logo: "/assets/images/logos/academicos-do-vidigal.svg" },
  { id: "zimbaue", slug: "zimbaue", name: "G.R.B.C. ZIMBAUÊ", category: null, neighborhood: "Realengo", foundedYear: 2010, enredo: "Zimbauê, o ritmo que atravessou mares", logo: "/assets/images/logos/zimbaue.svg" },
  { id: "xupa-mas-nao-baba", slug: "xupa-mas-nao-baba", name: "G.R.B.C. XUPA MAS NÃO BABA", category: null, neighborhood: "Madureira", foundedYear: 1973, enredo: "Tradição que a rua não esquece", logo: "/assets/images/logos/xupa-mas-nao-baba.svg" },
  { id: "esperanca-de-nova-campinas", slug: "esperanca-de-nova-campinas", name: "G.R.B.C. ESPERANÇA DE NOVA CAMPINAS", category: null, neighborhood: "Nova Campinas", foundedYear: 1985, enredo: "Esperança que renasce a cada folia", logo: "/assets/images/logos/esperanca-de-nova-campinas.svg" },
  { id: "urubu-bloco", slug: "urubu-bloco", name: "G.R.B.C. URUBU BLOCO", category: null, neighborhood: "Pavuna", foundedYear: 2006, enredo: "Urubu, a alma do samba", logo: "/assets/images/logos/urubu-bloco.svg" },
  { id: "cortejo-carioca", slug: "cortejo-carioca", name: "G.R.B.C. CORTEJO CARIOCA", category: null, neighborhood: "Centro", foundedYear: 2020, enredo: "O cortejo que leva o Rio para a rua", logo: "/assets/images/logos/cortejo-carioca.svg" },
  { id: "grilo-de-bangu", slug: "grilo-de-bangu", name: "G.R.B.C. GRILO DE BANGU", category: null, neighborhood: "Bangu", foundedYear: 1978, enredo: "O canto do grilo nos morros do subúrbio", logo: "/assets/images/logos/grilo-de-bangu.svg" },
  { id: "do-china", slug: "do-china", name: "G.R.B.C. DO CHINA", category: null, neighborhood: "Tijuca", foundedYear: 2018, enredo: "Na China, os encantos da folia", logo: "/assets/images/logos/do-china.svg" },
  { id: "academicos-do-vaz-lobo", slug: "academicos-do-vaz-lobo", name: "G.R.B.C. ACADÊMICOS DO VAZ LOBO", category: null, neighborhood: "Vaz Lobo", foundedYear: 2009, enredo: "Vaz Lobo, memórias em festa", logo: "/assets/images/logos/academicos-do-vaz-lobo.svg" },
  { id: "tigre-imperial", slug: "tigre-imperial", name: "G.R.B.C. TIGRE IMPERIAL", category: null, neighborhood: "São Cristóvão", foundedYear: 1995, enredo: "O rugido do tigre na avenida", logo: "/assets/images/logos/tigre-imperial.svg" },
  { id: "entre-amigos", slug: "entre-amigos", name: "G.R.B.C. ENTRE AMIGOS", category: null, neighborhood: "Ramos", foundedYear: 2014, enredo: "Entre amigos, o samba é a nossa casa", logo: "/assets/images/logos/entre-amigos.svg" },
  { id: "do-magia", slug: "do-magia", name: "G.R.B.C. DO MAGIA", category: null, neighborhood: "Magé", foundedYear: 2021, enredo: "A magia que encanta o Rio", logo: "/assets/images/logos/do-magia.svg" },
  { id: "unidos-do-jardim-do-amanha", slug: "unidos-do-jardim-do-amanha", name: "G.R.B.C. UNIDOS DO JARDIM DO AMANHÃ", category: null, neighborhood: "Jardim do Amanhã", foundedYear: 2017, enredo: "O jardim que floresce no amanhã", logo: "/assets/images/logos/unidos-do-jardim-do-amanha.svg" },
  { id: "boca-miuda", slug: "boca-miuda", name: "G.R.B.C. BOCA MIÚDA", category: null, neighborhood: "Méier", foundedYear: 2011, enredo: "Boca miúda, coração gigante", logo: "/assets/images/logos/boca-miuda.svg" },
  { id: "imperio-da-pedra", slug: "imperio-da-pedra", name: "G.R.B.C. IMPÉRIO DA PEDRA", category: null, neighborhood: "Cascadura", foundedYear: 1990, enredo: "Um império erguido sobre a pedra", logo: "/assets/images/logos/imperio-da-pedra.svg" },
  { id: "dos-cascudos", slug: "dos-cascudos", name: "G.R.B.C. DOS CASCUDOS", category: null, neighborhood: "Vista Alegre", foundedYear: 1996, enredo: "A braveza que samba", logo: "/assets/images/logos/dos-cascudos.svg" },
  { id: "unidos-do-caciquinho-de-inhoaiba", slug: "unidos-do-caciquinho-de-inhoaiba", name: "G.R.B.C. UNIDOS DO CACIQUINHO DE INHOAÍBA", category: null, neighborhood: "Inhoaíba", foundedYear: 1993, enredo: "O chefe grande do samba", logo: "/assets/images/logos/unidos-do-caciquinho-de-inhoaiba.svg" },
  { id: "tropa-do-assombroso", slug: "tropa-do-assombroso", name: "G.R.B.C. TROPA DO ASSOMBROSO", category: null, neighborhood: "Piedade", foundedYear: 2007, enredo: "Os poetas da noite assombrosa", logo: "/assets/images/logos/tropa-do-assombroso.svg" },
  { id: "do-balde", slug: "do-balde", name: "G.R.B.C. DO BALDE", category: null, neighborhood: "Maré", foundedYear: 2009, enredo: "Um balde cheio de alegria", logo: "/assets/images/logos/do-balde.svg" },
  { id: "boemia-das-alegrias", slug: "boemia-das-alegrias", name: "G.R.B.C. BOÊMIA DAS ALEGRIAS", category: null, neighborhood: "Lapa", foundedYear: 2002, enredo: "Boêmia, serenata e alegria", logo: "/assets/images/logos/boemia-das-alegrias.svg" },
  { id: "amigos-da-nana", slug: "amigos-da-nana", name: "G.R.B.C. AMIGOS DA NANÁ", category: null, neighborhood: "Engenho de Dentro", foundedYear: 2013, enredo: "Naná e seus amigos na folia", logo: "/assets/images/logos/amigos-da-nana.svg" },
];

export const EXPECTED_BLOCKS = BLOCKS_DATA.length;