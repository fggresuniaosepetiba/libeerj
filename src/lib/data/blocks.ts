import type { CarnivalBlock } from "@/lib/types";

/**
 * DADOS DEMONSTRATIVOS
 * --------------------
 * Os 50 blocos abaixo são fictícios e servem para demonstrar o site com uma
 * massa realista de entidades. Diretoria, número de componentes e enredos são
 * placeholders claramente demonstrativos.
 *
 * Para carregar os dados oficiais, basta substituir este repositório pela sua
 * fonte real (API). A camada de serviço (src/lib/services/blocks.ts) é a única
 * porta de entrada dos componentes — nada de dados é importado em tela.
 */

type Seed = [
  slug: string,
  name: string,
  category: "embalo" | "enredo",
  neighborhood: string,
  foundedYear: number,
  components: number,
  instagram?: string,
  slogan?: string,
  description?: string,
  logo?: string,
  enredo?: string,
  foundedDate?: string,
];

const firstNames = [
  "Alice", "Bruno", "Caio", "Duda", "Érica", "Felipe", "Giovana", "Heitor",
  "Íris", "João", "Karla", "Luiz", "Marta", "Nina", "Otávio", "Paula",
  "Rafael", "Sofia", "Théo", "Valéria",
];

const lastTokens = [
  "Embalo", "Enredo", "Folião", "Foliã", "Marchinha", "Batuke", "Frevo",
  "Axé", "Samba", "Passista", "Cordão", "Tambor", "Surdo", "Agogô",
  "Viola", "Estrela", "Coral", "Alegria", "Lapa", "Cidade", "Rio",
];

const seeds: Seed[] = [
  // ---------------------------------------------------------------- Enredo
  ["estrela-do-cais", "Estrela do Cais", "enredo", "Saúde", 1998, 320, "@estreladocais", "O brilho do porto num só coração", "Nascido nas antigas ruas do porto, conta as histórias da cidade que chega pelo mar."],
  ["imperio-do-boi", "Império do Boi", "enredo", "Méier", 1994, 410, "@imperiodoboi", "A força que traz a primavera", "Traduz em samba enredo os mitos populares e as lendas das encostas cariocas."],
  ["uniao-da-serra", "União da Serra", "enredo", "Santa Teresa", 1990, 350, "@uniaodaserra", "Do alto, vê-se o Rio inteiro", "Bloco de enredo das ladeiras, eterno contador das crônicas de Santa Teresa."],
  ["coral-do-centro", "Coral do Centro", "enredo", "Centro", 2001, 280, "@coraldocentro", "A voz do coração da cidade", "Um coral que virou bloco e levou o samba de enredo para o coração financeiro do Rio."],
  ["flor-de-graca", "Flor de Graça", "enredo", "Campo Grande", 1987, 460, "@flordegraca", "Florescendo no subúrbio", "Da Baixada cantada em verso e prosa, um enredo de resistência e alegria."],
  ["tambor-de-ouro", "Tambor de Ouro", "enredo", "Madureira", 1995, 520, "@tambordeouro", "O ouro que sai do tambor", "Bateria pesada e alas de passistas que transformam a rua num grande desfile."],
  ["azul-da-guia", "Azul da Guia", "enredo", "Ilha do Governador", 1992, 300, "@azuldaguia", "O azul que recebe quem chega", "Inspirado no mar da Guanabara, desfila as travessias e a memória da Ilha."],
  ["rosa-dos-ventos", "Rosa dos Ventos", "enredo", "Bangu", 2003, 340, "@rosadosventos", "Toda rota chega ao samba", "Bloco de enredo que celebra as navegações, os mapas e os caminhos do povo."],
  ["sol-da-mangueira", "Sol da Mangueira", "enredo", "Mangueira", 1989, 480, "@soldamangueira", "O sol que não se põe", "De raízes na Zona Norte, resiste com enredos sobre o cotidiano e a luta do morro."],
  ["beija-flor-do-cais", "Beija-flor do Cais", "enredo", "Gamboa", 2006, 260, "@beijaflordocais", "Pequeno no tamanho, gigante na folia", "Bloco de enredo da área portuária, conhecido pela precisão das alas coreografadas."],
  ["matriz-do-samba", "Matriz do Samba", "enredo", "Estácio", 1985, 550, "@matrizdosamba", "Onde o samba aprendeu a andar", "Homenagem perene ao berço do samba, com repertório de marchinhas e sambas históricos."],
  ["lua-de-cristal", "Lua de Cristal", "enredo", "Tijuca", 2008, 300, "@luadecristal", "Clareia a noite de quem brinca", "Enredos de poesia, luz e encantaria, com figurinos inspirados na natureza."],
  ["girasol-da-penha", "Girassol da Penha", "enredo", "Penha", 1997, 420, "@girasoldapenha", "Volta o sol, volta a alegria", "Famoso pelo sorteio de enredos que envolve toda a comunidade a cada ano."],
  ["reino-da-primavera", "Reino da Primavera", "enredo", "Olaria", 1993, 380, "@reinodaprimavera", "Todo ano, um novo jeito de florescer", "Bloco de enredo que estreou no feriadão e virou referência de organização."],
  ["vozes-do-samba", "Vozes do Samba", "enredo", "Caju", 1991, 310, "@vozesdosamba", "Cantamos o que a cidade cala", "Corais e puxadores que transformam a concentração num grande ensaio aberto."],
  ["estrela-guia", "Estrela Guia", "enredo", "Ramos", 2000, 360, "@estrelaguia", "Quem segue, chega", "Bloco devoto das estrelas, com enredos que passeiam por navegações e constelações."],
  ["princesa-da-lapa", "Princesa da Lapa", "enredo", "Lapa", 1988, 490, "@princesadalapa", "A boemia coroada", "Salões, arcos e serenatas: a Princesa desfila a história boêmia da cidade."],
  ["grinalda-de-ouro", "Grinalda de Ouro", "enredo", "Benfica", 1996, 330, "@grinaldadeouro", "Casamento de samba com o povo", "Enredos sobre bodas, coroas e celebrações que unem a comunidade do bairro."],
  ["orquestra-do-morro", "Orquestra do Morro", "enredo", "Falcão", 2010, 250, "@orquestradomorro", "Cada surdo é um instrumento da rua", "Formado por músicos de formação clássica e popular, une orquestra à bateria de rua."],
  ["aurora-carioca", "Aurora Carioca", "enredo", "Catumbi", 1986, 470, "@auroracarioca", "O dia que nasce no samba", "Tradicionalíssimo, desfila antes do sol raiar com enredos sobre o amanhecer carioca."],
  ["jardim-de-bodas", "Jardim de Bodas", "enredo", "Praça Seca", 2004, 290, "@jardimdebodas", "Onde o amor sempre floresce", "Enredos românticos e alas de casais que emocionam o público a cada desfile."],
  ["estrela-do-mar", "Estrela do Mar", "enredo", "Zona Portuária", 2012, 240, "@estreladomar", "Azul, sal e samba", "Celebra a força das águas e a memória marinheira das ruas do porto."],
  ["soldado-do-samba", "Soldado do Samba", "enredo", "Vila Kosmos", 1999, 350, "@soldadodosamba", "Em pé, firme e na cadência", "Disciplina de bateria e evolução de alas, um verdadeiro pelotão da folia."],
  ["cidade-das-artes", "Cidade das Artes", "enredo", "Barra da Tijuca", 2015, 220, "@cidadedasartes", "A rua vira palco", "Bloco jovem que mistura samba enredo com artes visuais e teatro de rua."],
  ["corte-do-amanha", "União de Sepetiba", "enredo", "Sepetiba", 2024, 310, "@uniaodesepetiba", undefined, undefined, "/assets/images/blocos de enredo/logo-escola.jpeg", "Sabejé", "2024-02-02"],

  // ---------------------------------------------------------------- Embalo
  ["o-fervo-da-lapa", "O Fervo da Lapa", "embalo", "Lapa", 2013, 620, "@ofervodalapa", "A Lapa conhece o nosso passo", "De marchinhas a sucessos atuais, agita os arcos da Lapa com repertório para todas as idades."],
  ["empurra-que-pega", "Empurra que Pega", "embalo", "Centro", 2007, 540, "@empurraquepega", "Quando encosta, ninguém segura", "Bloco do centro que esgota as ruas no pré-Carnaval com batucada pesada e figurino marcante."],
  ["batuque-de-santa", "Batuque de Santa", "embalo", "Santa Teresa", 2001, 380, "@batuquedesanta", "As ladeiras respondem no tambor", "Sobe e desce as ladeiras de Santa Teresa ao som de uma bateria criada em ensaios abertos."],
  ["passo-de-mestre", "Passo de Mestre", "embalo", "Glória", 2016, 340, "@passodemestre", "Aprendeu no chão e ensina na rua", "Liderado por mestres de dança popular, transforma cada desfile numa aula de gingado aberta."],
  ["sexta-de-samba", "Sexta de Samba", "embalo", "Catete", 2009, 300, "@sextadesamba", "A semana termina, a folia começa", "Bloco oficial da abertura dos festejos, famoso por receitas e marchinhas autorais."],
  ["bloco-do-carmo", "Bloco do Carmo", "embalo", "Centro", 2011, 460, "@blocodocarmo", "Tradição que atravessa o tempo", "Honra as bandas históricas da Sé e do Carmo com repertório clássico e trompetes de rua."],
  ["traca-formosa", "Traça Formosa", "embalo", "Bairro de Fátima", 2014, 380, "@tracaformosa", "Faz parte da obra da alegria", "De perfil irreverente, satiriza o cotidiano da cidade com marchinhas atuais criadas a cada ano."],
  ["crioula-do-avelar", "Crioula do Avelar", "embalo", "Santa Teresa", 2010, 330, "@criouladoavelar", "Rainha da ladeira", "Bloco histórico da região, famoso pelo baile que antecede o desfile oficial."],
  ["meu-bem-volta-depois", "Meu Bem Volta Depois", "embalo", "Flamengo", 2018, 420, "@meubemvoltadepois", "Vai, mas sempre retorna", "Repertório romântico e animado, o bloco do retorno que o público obriga a voltar."],
  ["dia-de-rubra", "Dia de Rubra", "embalo", "Botafogo", 2019, 350, "@diaderubra", "Cores fortes, alegria inteira", "Celebrações temáticas anuais — cada edição homenageia uma cor e uma cultura."],
  ["dona-rosa", "Dona Rosa", "embalo", "Tijuca", 2003, 510, "@donarosa", "Quem brinca, rejuvenesce", "Presta tributo às matriarcas da folia, com alas de famílias inteiras e carroçóis antecedendo a bateria."],
  ["tricoteiras-do-samba", "Tricoteiras do Samba", "embalo", "Laranjeiras", 2020, 260, "@tricoteirasdosamba", "Trançamos o nosso caminho", "Bloco de confecção própria: cada integrante costura sua fantasia e tricota seu adereço."],
  ["siri-da-gavea", "Siri da Gávea", "embalo", "Gávea", 2015, 310, "@siridagavea", "Anda de lado, mas não para", "Típico bloco universitário, anima o fim de tarde antes dos desfiles de sábado."],
  ["pelo-amor-de-deus", "Pelo Amor de Deus", "embalo", "Urca", 2006, 290, "@peloamordedeus", "A rua pede socorro e a gente atende", "Bloco de fim de tarde às margens da Baía de Guanabara, com pôr do sol e muito samba."],
  ["janelinha-de-ouro", "Janelinha de Ouro", "embalo", "Jardim Botânico", 2012, 240, "@janelinhadeouro", "Quem vê de fora, abre a janela", "Animação impecável e repertório elegante, bloco favorito de quem busca coreografia."],
  ["bote-quente", "Bote Quente", "embalo", "Leblon", 2017, 360, "@botequente", "Servido na medida da alegria", "Samba no ponto, suingue no chão e um repertório que sempre cai bem."],
  ["maré-alta", "Maré Alta", "embalo", "Ipanema", 2011, 480, "@marealta", "Quando o sol desce, a rua sobe", "Clássico da orla, atravessa Ipanema em desfile que mistura surfistas, famílias e passistas."],
  ["bossa-no-tambor", "Bossa no Tambor", "embalo", "Copacabana", 2005, 440, "@bossanotambor", "Suave no balanço, firme no compasso", "Rendição musical à bossa e ao samba de canção, com arranjos suaves para o carnaval."],
  ["jardim-de-inverno", "Jardim de Inverno", "embalo", "Humaitá", 2021, 240, "@jardimdeinverno", "Folia em qualquer estação", "Bloco que aposta em ensaios o ano inteiro e chega ao Carnaval afiado."],
  ["pequena-africa", "Pequena África", "embalo", "Saúde", 2004, 450, "@pequenaafrica", "A memória negra em ritmo de festa", "Celebra a herança africana da zona portuária com tambores, ijexá e axé."],
  ["coracao-da-pedra", "Coração da Pedra", "embalo", "Vidigal", 2013, 380, "@coracaodapedra", "Palpita no alto do morro", "Bloco de comunidade, desce o Vidigal carregando a mítica do samba de pé de morro."],
  ["sol-da-rocinha", "Sol da Rocinha", "embalo", "Rocinha", 2016, 330, "@soldarocinha", "Clareia a vida de quem sobe", "Reposiciona a imagem das comunidades, com bateria formada por jovens da região."],
  ["arrasa-centro", "Arrasa Centro", "embalo", "Largo da Carioca", 2022, 310, "@arrasacentro", "Trabalhador também samba", "Bloco pós-expediente que ocupa o centro nos finais de semana de pré-Carnaval."],
  ["voo-livre", "Voo Livre", "embalo", "Barra da Tijuca", 2019, 270, "@voolivre", "A rua é o nosso território", "Perfil leve e família, desfila em horários diurnos com espaços acessíveis."],
  ["estrelinha-da-cidade", "Estrelinha da Cidade", "embalo", "Centro", 2020, 290, "@estrelinhadacidade", "Pequena, brilhante e de todos", "Bloco dedicado à memória afetiva da cidade, com repertório de marchinhas eternas."],
  ["sambaba-do-saenz", "Sambabá do Saenz", "embalo", "Tijuca", 2014, 340, "@sambabadosaenz", "Do Saenz à rua, um passo de cada vez", "Bloco da Tijuca que reúne vizinhos e famílias em desfiles tranquilos de fim de tarde."],
];

const namesOf = (index: number, offset: number) => {
  const base = (index * 7 + offset * 13) % Math.max(firstNames.length, 1);
  const last = (index * 5 + offset * 17) % Math.max(lastTokens.length, 1);
  return `${firstNames[base]} ${lastTokens[last]}`;
};

const blurb = (category: "embalo" | "enredo", neighborhood: string): string =>
  category === "enredo"
    ? `Bloco de enredo com raízes em ${neighborhood}. Apresenta sambas autorais, alas organizadas e uma bateria que conduz o desfile com a força da tradição.`
    : `Bloco de embalo que faz de ${neighborhood} o palco perfeito para a folia de rua. Repertório animado, ensaios abertos e alegria para todos os públicos.`;

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Tokens de tema/enredo usados como �oltimo recurso, quando o seed nǜo traz
 * slogan nem enredo pr��prio. Determin��stico: cada bloco pega o token na sua
 * posi��ǜo do ciclo, garantindo sempre um tema fict��cio completo.
 */
const themeTokens: Array<{ enredo: string; tema: string }> = [
  { enredo: "As cores que a cidade acende", tema: "O colorido que toma a rua" },
  { enredo: "De todas as janelas, um s�", tema: "Balan��o de todas as janelas" },
  { enredo: "O samba nǜo para no rel��gio", tema: "A rua marca seu pr��prio tempo" },
  { enredo: "No passo de quem chega primeiro", tema: "A festa chega sem avisar" },
  { enredo: "Sobre as ondas desse mar de gente", tema: "Mar de gente, mar de alegria" },
  { enredo: "A mem��ria viva dos antigos quintais", tema: "Hist��ria que ainda samba" },
  { enredo: "Um grito de cores contra o cinza", tema: "Alegria que vence o cinza" },
  { enredo: "Nasce o dia, renasce a folia", tema: "Do amanhecer a meia-noite" },
];

/**
 * Data de fundação fictícia, determinística por seed — usada quando o seed
 * informa apenas o ano. Garante uma ficha de cartão completa para TODOS os
 * blocos sem exigir edição individual. A União de Sepetiba informa a data real
 * no seed e ela prevalece.
 */
const foundedDateFor = (year: number, index: number): string => {
  const month = ((index * 3) % 12) + 1;
  const day = ((index * 7) % 27) + 1;
  return `${year}-${pad2(month)}-${pad2(day)}`;
};

/**
 * Nome do tema/enredo inventado por bloco, derivado do slogan de cada seed.
 * O rótulo do cartão vira "Enredo" para enredo e "Tema" para embalo.
 */
const themeFor = (slogan: string | undefined, category: "embalo" | "enredo", index: number): string => {
  if (slogan) return slogan;
  const base = themeTokens[index % themeTokens.length];
  return category === "enredo" ? base.enredo : base.tema;
};

export const BLOCKS_DATA: CarnivalBlock[] = seeds.map((seed, i) => {
  const [slug, name, category, neighborhood, foundedYear, components, instagram, slogan, description, logo, enredo, foundedDate] = seed;
  return {
    id: slug,
    slug,
    name,
    category,
    neighborhood,
    foundedYear,
    foundedDate: foundedDate ?? foundedDateFor(foundedYear, i),
    president: namesOf(i, 0),
    vicePresident: namesOf(i, 1),
    carnivalDirector: namesOf(i, 2),
    components,
    instagram: instagram ?? `@${slug}`,
    logo: logo ?? `/assets/images/logos/${slug}.svg`,
    slogan: slogan,
    description: description ?? blurb(category, neighborhood),
    enredo: enredo ?? themeFor(slogan, category, i),
  };
});

export const EXPECTED_BLOCKS = 50;
