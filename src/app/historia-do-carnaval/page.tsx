import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { ZoomablePhoto } from "@/components/ui/ZoomablePhoto";

export const metadata: Metadata = {
  title: "História do Carnaval",
  description:
    "A história do Carnaval do Rio de Janeiro: do entrudo do Império aos desfiles de blocos e escolas, uma viagem editorial pela formação cultural carioca.",
};

const TIMELINE = [
  {
    year: "1846",
    text: "Jornais noticiam o Zé Pereira — um dos primeiros grupos de carnaval de rua do Rio.",
  },
  {
    year: "1855",
    text: "O Congresso das Sumidades Carnavalescas inaugura as Grandes Sociedades.",
  },
  {
    year: "Final do séc. XIX",
    text: "Cordões e ranchos formam a rua popular do carnaval, entre a abolição e a República.",
  },
  {
    year: "1918",
    text: "Primeiro desfile do Cordão da Bola Preta, o mais antigo bloco ainda vivo da cidade.",
  },
  {
    year: "1928",
    text: "No Estácio, o Deixa Falar batiza a ideia de \u201cescola de samba\u201d.",
  },
  {
    year: "1932",
    text: "O jornal Mundo Sportivo promove o primeiro concurso de escolas na Praça Onze.",
  },
  {
    year: "1941–1942",
    text: "A Praça Onze é demolida para a abertura da Avenida Presidente Vargas.",
  },
  {
    year: "1984",
    text: "O Sambódromo é inaugurado na Marquês de Sapucaí e muda a escala do desfile.",
  },
  {
    year: "Hoje",
    text: "Escolas, blocos, cordões e bandas fazem a cidade inteira desfilar.",
  },
];

export default function HistoriaDoCarnavalPage() {
  return (
    <>
      {/* Capa */}
      <section className="hist-hero">
        <div className="hist-hero__bg">
          <Image
            src="/assets/images/historia/hero-sambodromo.jpg"
            alt="Panorama do Sambódromo da Marquês de Sapucaí durante um desfile de escola de samba"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hist-hero__inner">
          <span className="section-head__eyebrow">
            Patrimônio · Carnaval do Rio
          </span>
          <h1>Uma história que se escreve na rua</h1>
          <p>
            Do entrudo dos tempos do Império aos blocos que arrastam multidões
            pela cidade, a história do Carnaval do Rio é também a história de um
            povo que disputa, a cada fevereiro, o direito de ocupar a própria
            rua com alegria.
          </p>
        </div>
      </section>

      {/* Abertura */}
      <section className="section section--sand" aria-labelledby="abertura-title">
        <div className="container editorial">
          <div className="editorial__body">
            <span className="section-head__eyebrow">Apresentação</span>
            <h2 id="abertura-title">Uma festa de muitas camadas</h2>
            <p className="lead">
              O Carnaval carioca é um palimpsesto: a cada momento histórico, um
              novo jeito de brincar se escreve por cima do anterior — sem apagar
              de vez o que estava embaixo.
            </p>
            <p>
              Bailes de máscaras da elite e entrudos populares, cordões do
              tempo da abolição e rodas de samba na Pequena África, escolas que
              nasceram para provar que o samba podia ser coisa séria e blocos
              que lembram que, no fundo, tudo é brincadeira. Juntas, essas
              camadas formam a festa mais famosa do mundo.
            </p>
            <p>
              O que segue é uma viagem por essa história — feita com a cautela
              de quem sabe que datas e versões continuam sendo debatidas pelos
              pesquisadores, mas também com o calor de quem sabe que ela está
              viva na rua, todo ano, de novo.
            </p>
          </div>
          <ZoomablePhoto
            src="/assets/images/historia/carnaval-avenida-rio-branco.jpg"
            alt="Fotografia de época do carnaval na Avenida Rio Branco, no centro do Rio de Janeiro"
            sizes="(max-width: 900px) 100vw, 40vw"
            mediaClassName="hist-media hist-media--portrait"
            caption="A rua já era o palco: carnaval na Avenida Rio Branco em fotografia de época do acervo do Instituto Moreira Salles."
            credit="Acervo do Instituto Moreira Salles · Domínio público · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Entrudo */}
      <section className="section" aria-labelledby="entrudo-title">
        <div className="container editorial">
          <div className="editorial__body">
            <span className="section-head__eyebrow">As raízes · Século XIX</span>
            <h2 id="entrudo-title">O entrudo e a rua como questão</h2>
            <p className="lead">
              Antes de qualquer escola ou bloco, houve o entrudo: uma festa
              portuguesa que o Rio herdou e transformou em guerra de água,
              farinha e limões-de-cheiro.
            </p>
            <p>
              Durante décadas, o entrudo foi o carnaval das ruas. Homens,
              mulheres, crianças e escravizados entravam na brincadeira — e era
              justamente essa promiscuidade que enlouquecia a elite do Império.
              Jornais chamavam a festa de &ldquo;bárbara&rdquo;; a polícia passou a
              reprimir excessos; médicos higienistas viam na brincadeira um
              perigo para os corpos e para a ordem.
            </p>
            <p>
              Foi então que uma pergunta começou a atravessar o carnaval
              carioca, e não saiu mais: quem pode ocupar a rua? As respostas
              dadas de lá para cá — na maioria das vezes por quem não tinha
              outra escolha — são a própria história desta festa.
            </p>
          </div>
          <ZoomablePhoto
            src="/assets/images/historia/entrudo-1884.jpg"
            alt="Cenas de carnaval desenhadas por Angelo Agostini na Revista Illustrada, em 1884"
            sizes="(max-width: 900px) 100vw, 45vw"
            mediaClassName="hist-media hist-media--landscape"
            caption="O carnaval nas páginas da Revista Illustrada, em desenho de Angelo Agostini (1884)."
            credit="Angelo Agostini · Domínio público · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Elites: bailes, sociedades, corsos */}
      <section className="section section--sand" aria-labelledby="elites-title">
        <div className="container">
          <div className="editorial editorial--invert">
            <ZoomablePhoto
              src="/assets/images/historia/bailes-de-mascara-1873.jpg"
              alt="Baile de máscaras na Ópera, pintura de Édouard Manet de 1873"
              sizes="(max-width: 900px) 100vw, 38vw"
              mediaClassName="hist-media hist-media--landscape"
              caption="Referência europeia da época: um baile de máscaras na Ópera de Paris (Édouard Manet, 1873) — modelo que as elites cariocas admiravam."
              credit="Édouard Manet · National Gallery of Art · Domínio público · via Wikimedia Commons"
            />

            <div className="editorial__body">
              <span className="section-head__eyebrow">
                A civilização · Bailes e corsos
              </span>
              <h2 id="elites-title">
                Um carnaval &ldquo;civilizado&rdquo; à moda europeia
              </h2>
              <p className="lead">
                Para domesticar a rua, a elite do Segundo Reinado tentou de
                tudo: máscaras, teatro, sociedades e carros abertos.
              </p>
              <p>
                Inspirando-se em Veneza e em Paris, os clubes e os teatros
                promoviam bailes de máscaras fechados, onde se brincava longe
                do entrudo. Nas ruas, as Grandes Sociedades — a começar pelo
                Congresso das Sumidades Carnavalescas, em 1855 — organizaram os
                primeiros desfiles de carros alegóricos e fantasias
                rebuscadas.
              </p>
              <p>
                Nos primeiros anos do século XX, os corsos tomaram a Avenida
                Central (hoje Rio Branco): automóveis enfeitados desfilavam
                lentamente para serem vistos. Era o carnaval como espetáculo da
                civilidade — belo, ordenado e, principalmente, distante do povo
                que insistia em brincar à sua maneira.
              </p>
            </div>
          </div>

          <ZoomablePhoto
            src="/assets/images/historia/corso-avenida-rio-branco.jpg"
            alt="Corsos carnavalescos desfilam com carros enfeitados na Avenida Central, no início do século XX"
            sizes="100vw"
            mediaClassName="hist-media hist-media--wide"
            figureStyle={{ marginTop: 40 }}
            caption="O corso: carros decorados desfilando pela avenida, símbolo do carnaval das elites no início do século XX."
            credit="Acervo do Instituto Moreira Salles · Domínio público · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Rua popular: cordões, ranchos, blocos */}
      <section className="section" aria-labelledby="rua-title">
        <div className="container editorial">
          <div className="editorial__body">
            <span className="section-head__eyebrow">
              A rua popular · Cordões, ranchos e blocos
            </span>
            <h2 id="rua-title">A rua que respondia com alegria</h2>
            <p className="lead">
              Enquanto a elite ensaiava um carnaval de salão, a cidade negra e
              popular inventava formas próprias de festa — que o tempo provou
              serem as mais fortes.
            </p>
            <p>
              No fim do século XIX, os cordões reuniam grupos de moradores dos
              bairros populares em cortejos de rua, com música, dança e muita
              irreverência. Os ranchos nacionais deram um passo adiante:
              organizados a partir da última década do oitocentos, com
              fundadores como o lendário Hilário Jovino Ferreira, misturavam
              teatro, cortejo e devoção em desfiles de grande beleza.
            </p>
            <p>
              Já os blocos — que os jornais de 1846 noticiam com o Zé Pereira —
              eram a brincadeira mais simples e mais popular de todas: um grupo,
              um estandarte, um tambor e a rua inteira. A diversidade dessas
              formas é a espinha dorsal da folia: cada uma afirmava, à sua
              maneira, o direito de quem ainda não tinha vez.
            </p>
          </div>
          <ZoomablePhoto
            src="/assets/images/historia/hilario-jovino.jpg"
            alt="Retrato antigo de Hilário Jovino Ferreira, criador dos ranchos carnavalescos"
            sizes="(max-width: 900px) 100vw, 40vw"
            mediaClassName="hist-media hist-media--portrait"
            caption="Hilário Jovino Ferreira, personagem central da criação dos ranchos carnavalescos."
            credit="Arquivo público · Domínio público · via Wikimedia Commons"
          />
        </div>

        <div className="container">
          <ZoomablePhoto
            src="/assets/images/historia/rancho-pierrots-1966.jpg"
            alt="Rancho Pierrots da Caverna desfila pelas ruas do Rio em 1966"
            sizes="100vw"
            mediaClassName="hist-media hist-media--wide"
            figureStyle={{ marginTop: 40 }}
            caption="Os ranchos não desapareceram: o Pierrots da Caverna, fundado em 1896, desfilando ainda em 1966."
            credit="Geraldo Viola · CC BY 2.0 · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Pequena África */}
      <section className="section section--sand" aria-labelledby="pequena-africa-title">
        <div className="container editorial editorial--invert">
          <ZoomablePhoto
            src="/assets/images/historia/praca-onze-chafariz.jpg"
            alt="A Praça Onze de Junho e seu chafariz, no começo do século XX"
            sizes="(max-width: 900px) 100vw, 45vw"
            mediaClassName="hist-media hist-media--landscape"
            caption="A Praça Onze de Junho e o chafariz do Rocio Pequeno: por décadas, o coração de uma cidade negra."
            credit="Acervo do Instituto Moreira Salles · Domínio público · via Wikimedia Commons"
          />

          <div className="editorial__body">
            <span className="section-head__eyebrow">
              A Pequena África · Pós-abolição
            </span>
            <h2 id="pequena-africa-title">A cidade negra que criou o samba</h2>
            <p className="lead">
              Após a abolição, milhares de baianos e baianas chegaram ao
              centro do Rio e transformaram a região em um território cultural
              potente.
            </p>
            <p>
              Na Saúde, na Praça Onze e na Cidade Nova, formou-se a chamada
              Pequena África: uma rede de cortiços, casas e terreiros onde a
              cultura negra circulava livremente — até onde a repressão
              permitia. A Pedra do Sal, na Saúde, virou ponto de encontro dos
              trabalhadores e das rodas; os quintais das tias baianas, lugar de
              festa, fé e cozinha.
            </p>
            <p>
              Foi ali que o samba — que dava os primeiros passos do samba de
              roda baiano para a forma carioca — encontrou gente, música e
              rua para crescer. E foi ali também que uma mulher se tornou o
              centro de tudo.
            </p>
          </div>
        </div>

        <div className="container">
          <ZoomablePhoto
            src="/assets/images/historia/escadaria-pedra-do-sal.jpg"
            alt="Escadaria da Pedra do Sal, ponto histórico de encontro do samba na Saúde"
            sizes="100vw"
            mediaClassName="hist-media hist-media--landscape"
            figureStyle={{ marginTop: 40 }}
            caption="A escadaria da Pedra do Sal, na Saúde: marco da Pequena África e do nascimento do samba carioca."
            credit="Ana Beatriz da Silva de Freitas · CC0 · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Tia Ciata */}
      <section className="section section--navy" aria-labelledby="tia-ciata-title">
        <div className="container hist-feature">
          <ZoomablePhoto
            src="/assets/images/historia/tia-ciata.jpg"
            alt="Retrato de Tia Ciata, baiana, cozinheira e ìyálórìṣa, por volta de 1900"
            sizes="(max-width: 900px) 100vw, 40vw"
            mediaClassName="hist-feature__media"
            caption="Tia Ciata (Hilária Batista de Almeida, 1854–1924), por volta de 1900."
            credit="Arquivo MinC · Domínio público · via Wikimedia Commons"
          />

          <div className="hist-feature__body">
            <span className="section-head__eyebrow">Um retrato no samba</span>
            <h2 id="tia-ciata-title">
              Tia Ciata: a cozinha onde tudo começou
            </h2>
            <p className="lead">
              Nascida em Salvador, Hilária Batista de Almeida chegou ao Rio
              ainda jovem e se tornou cozinheira, quituteira e ìyálórìṣa —
              líder religiosa e comunitária.
            </p>
            <p>
              Sua casa, na Rua Visconde de Itaúna, era um ponto de encontro
              entre mundos: músicos como Pixinguinha, Donga e Heitor dos
              Prazeres, sambistas, políticos e vizinhos. Na cozinha e no
              quintal, o samba encontrava a religiosidade — e a perseguição da
              polícia à fé afro-brasileira não impedia a festa de acontecer.
            </p>
            <p>
              É dessa memória que vem o episódio canônico: em 1916, &ldquo;Pelo
              Telefone&rdquo;, registrado por Donga e Mauro de Almeida, nasce das
              rodas da casa de Tia Ciata e é consagrado como o primeiro samba
              gravado. Mais do que um episódio, uma síntese: as mulheres —
              cozinheiras, ìyálórìṣas e mestras da festa — estiveram no centro
              da construção que o século XX consagraria com o nome de&nbsp;
              <em>escola de samba</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Deixa Falar */}
      <section className="section" aria-labelledby="deixa-falar-title">
        <div className="container editorial">
          <div className="editorial__body">
            <span className="section-head__eyebrow">O samba e a avenida · 1928</span>
            <h2 id="deixa-falar-title">
              Estácio e o Deixa Falar: o samba vira escola
            </h2>
            <p className="lead">
              Em 12 de agosto de 1928, sambistas do Estácio fundaram o Deixa
              Falar — e batizaram uma ideia que mudaria o carnaval para sempre:
              a escola de samba.
            </p>
            <p>
              O grupo — de baluartes como Ismael Silva, Bide e Armando Marçal —
              criou o ritmo novo do Estácio, com a batida sincopada que dava
              para pular por sobre a perna torta do novo samba. O surdo
              &ldquo;empurrava&rdquo; a bateria, e o tamborim completava o desenho. O
              nome &ldquo;escola&rdquo; veio de brincadeira, uma referência às escolas
              do bairro: ali se ensinava a arte de sambar.
            </p>
            <p>
              É preciso contextualizar: cordões, ranchos e blocos já existiam
              havia décadas, e o samba não nasceu no Estácio por geração
              espontânea — bebeu das rodas da Pequena África e de toda a
              tradição negra que a precedeu. Mas o Estácio fixou o modelo: o
              desfile em alas, a ala das baianas, o samba-enredo e a escola
              como instituição. O que veio depois — avenida, concurso,
              Sambódromo — é filho direto dessa invenção.
            </p>
            <figure style={{ margin: "18px 0 0" }}>
              <blockquote className="hist-quote">
                <p>
                  &ldquo;O nosso samba era uma coisa enorme; não é? Nós dizíamos bum bum
                  paticumbumprugururundum.&rdquo;
                </p>
              </blockquote>
              <figcaption className="hist-quote__source">
                Ismael Silva, citado no Dossiê das Matrizes do Samba (IPHAN)
              </figcaption>
            </figure>
          </div>

          <ZoomablePhoto
            src="/assets/images/historia/ismael-silva.jpg"
            alt="Retrato de Ismael Silva, fundador do Deixa Falar"
            sizes="(max-width: 900px) 100vw, 40vw"
            mediaClassName="hist-media hist-media--portrait"
            caption="Ismael Silva, compositor e fundador do Deixa Falar."
            credit="Acervo Correio da Manhã · Domínio público · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* 1932 */}
      <section className="section section--navy" aria-labelledby="concurso-title">
        <div className="container center">
          <span className="hist-document" aria-hidden>
            1932
          </span>
          <span className="section-head__eyebrow">O concurso · Praça Onze</span>
          <h2 id="concurso-title" style={{ color: "var(--c-paper)", marginTop: "clamp(12px, 2vw, 22px)" }}>
            A rua vira espetáculo: o primeiro desfile comentado
          </h2>
          <p style={{ color: "#d6dff0", maxWidth: "64ch", marginInline: "auto" }}>
            Na década de 1930, o samba deixou os quintais e foi para a praça
            disputar. O jornal Mundo Sportivo, sob impulso do jornalista Mário
            Filho, promoveu em 1932 um desfile competitivo de escolas na Praça
            Onze — marco amplamente consagrado pela historiografia, ainda que
            alguns pesquisadores debatam datas e critérios. Começava ali a
            tradição de transformar o samba em espetáculo avaliado, comparado e
            celebrado diante da cidade.
          </p>
        </div>
      </section>

      {/* Praça Onze desaparece */}
      <section className="section" aria-labelledby="praca-onze-title">
        <div className="container editorial editorial--invert">
          <ZoomablePhoto
            src="/assets/images/historia/praca-onze-vargas.jpg"
            alt="A Praça Onze reconstruída depois da abertura da Avenida Presidente Vargas"
            sizes="(max-width: 900px) 100vw, 45vw"
            mediaClassName="hist-media hist-media--landscape"
            caption="A Praça Onze já transformada: a foto, do acervo do Instituto Moreira Salles, é dos anos 1940–1950."
            credit="Acervo do Instituto Moreira Salles · Domínio público · via Wikimedia Commons"
          />

          <div className="editorial__body">
            <span className="section-head__eyebrow">
              A cidade muda · 1941–1942
            </span>
            <h2 id="praca-onze-title">A Praça Onze some, o samba se espalha</h2>
            <p className="lead">
              Para abrir a Avenida Presidente Vargas, a reforma urbana derrubou
              a Praça Onze — e com ela um pedaço inteiro da Pequena África.
            </p>
            <p>
              Entre 1941 e 1942, o chafariz saiu do caminho da nova avenida e a
              praça desapareceu do mapa. As famílias e as rodas se
              dispersaram: muitos subiram os morros da Mangueira, do Salgueiro
              e de Madureira, levando o samba para os bairros que se tornariam
              o novo coração das escolas.
            </p>
            <p>
              Onde antes cabia uma praça, coube uma avenida. Mas a memória — e
              o argumento musical — já tinha se transferido para a cidade
              inteira. A Praça Onze não acabou: virou dezenas de Praças Onzes,
              uma em cada morro, em cada subúrbio, em cada terreiro.
            </p>
          </div>
        </div>
      </section>

      {/* Consolidação */}
      <section className="section section--sand" aria-labelledby="consolidacao-title">
        <div className="container">
          <div className="editorial">
            <div className="editorial__body">
              <span className="section-head__eyebrow">
                A consolidação · Século XX
              </span>
              <h2 id="consolidacao-title">
                Dos ensaios nos morros à grande festa
              </h2>
              <p className="lead">
                Nas décadas seguintes, as escolas deixaram de ser uma invenção de
                um bairro para se tornar a instituição central do carnaval
                carioca.
              </p>
              <p>
                Os desfiles cresceram e percorreram a cidade: da Praça Onze para
                a Avenida Rio Branco, depois para a Presidente Vargas e para a
                Presidente Antônio Carlos, até se firmar na Marquês de Sapucaí.
                Nos anos 1940 e 1950 surgiram as primeiras ligas e federações de
                escolas; nos anos 1960, o samba ganhou as telas. Alegorias,
                enredos e figurinos tornaram-se ofícios cada vez mais
                elaborados — sem nunca deixar de ser, na base, o batuque da
                comunidade.
              </p>
              <p>
                E, importante: as formas antigas não morreram. As Grandes
                Sociedades, herdeiras do carnaval do século XIX, desfilavam ainda
                nos anos 1960, lado a lado com as escolas que haviam tornado o
                carnaval do Rio famoso no mundo.
              </p>
            </div>

            <ZoomablePhoto
              src="/assets/images/historia/portela-1960.jpg"
              alt="Escola de samba Portela desfilando em 1960"
              sizes="(max-width: 900px) 100vw, 45vw"
              mediaClassName="hist-media hist-media--landscape"
              caption="A Portela, do subúrbio de Oswaldo Cruz e Madureira, desfilando em 1960: escola de morro tornada instituição nacional."
              credit="Eugênio H Silva · CC BY-SA 2.0 · via Wikimedia Commons"
            />
          </div>

          <ZoomablePhoto
            src="/assets/images/historia/grandes-sociedades-1960.jpg"
            alt="Desfile das Grandes Sociedades no Rio de Janeiro em 1960"
            sizes="100vw"
            mediaClassName="hist-media hist-media--wide"
            figureStyle={{ marginTop: 40 }}
            caption="Desfile das Grandes Sociedades em 1960: a memória do carnaval do século XIX ainda circulava quando o samba já dominava a avenida."
            credit="Eugênio H Silva · CC BY-SA 2.0 · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Sambódromo */}
      <section className="section section--navy" aria-labelledby="sambodromo-title">
        <div className="container editorial editorial--invert">
          <ZoomablePhoto
            src="/assets/images/historia/sambodromo-1985.jpg"
            alt="O Sambódromo na alvorada, nos primeiros anos de funcionamento, em 1985"
            sizes="(max-width: 900px) 100vw, 45vw"
            mediaClassName="hist-media hist-media--landscape"
            caption="O Sambódromo na alvorada, em 1985: os primeiros anos da passarela dedicada ao samba."
            credit="Dan Lundberg · CC BY-SA 2.0 · via Wikimedia Commons"
          />

          <div className="hist-feature__body">
            <span className="section-head__eyebrow">1984 · O Sambódromo</span>
            <h2 id="sambodromo-title" style={{ color: "var(--c-paper)" }}>
              A cidade constrói a sua passarela
            </h2>
            <p className="lead">
              Em 2 de março de 1984 era inaugurado o Sambódromo da Marquês de
              Sapucaí: o samba ganhava, enfim, uma casa permanente.
            </p>
            <p>
              Projetado por Oscar Niemeyer a partir da ideia de Darcy Ribeiro,
              o conjunto erguido no governo de Leonel Brizola levou pouco mais
              de cem dias para ficar pronto e reuniu cerca de 60 mil
              espectadores nas arquibancadas. Batizado de Passarela do Samba e
              depois Passarela Professor Darcy Ribeiro, virou símbolo mundial
              do carnaval.
            </p>
            <p>
              Não foi uma criação do nada: desde 1978 os desfiles já se
              realizavam na mesma Marquês de Sapucaí, com estruturas
              provisórias montadas e desmontadas todo ano. Com o Sambódromo, o
              espetáculo mudou de escala — e o samba, que nascera em quintais,
              mostrou que cabia perfeitamente em uma avenida de concreto feita
              sob medida para ele.
            </p>
          </div>
        </div>
      </section>

      {/* Contemporâneo */}
      <section className="section" aria-labelledby="contemporaneo-title">
        <div className="container editorial">
          <div className="editorial__body">
            <span className="section-head__eyebrow">Hoje · Século XXI</span>
            <h2 id="contemporaneo-title">A cidade inteira desfila</h2>
            <p className="lead">
              O carnaval contemporâneo do Rio é plural: escolas no Sambódromo,
              milhares de blocos nas ruas, cordões, ranchos e bandas em todos
              os bairros.
            </p>
            <p>
              O Cordão da Bola Preta — fundado em 1918, o mais antigo bloco
              ainda ativo da cidade — segue arrastando multidões pela Avenida
              Rio Branco, prova viva de que a rua nunca deixou de ser o palco
              original da festa. Nos anos 2000, o carnaval de rua viveu uma
              explosão de renovação: blocos novos e antigos ocuparam parques,
              largos e avenidas, e o Rio voltou a se reconhecer na folia mais
              democrática.
            </p>
            <p>
              É dessa festa plural — escolas grandes, blocos gigantes e blocos
              de vizinhança — que cuida hoje, de forma organizada e
              representativa, a liga que reúne os blocos de enredo e embalo do
              estado do Rio de Janeiro. Mas isso já é outra história: a história
              que ainda está sendo escrita.
            </p>
          </div>
          <ZoomablePhoto
            src="/assets/images/historia/bola-preta-2009.jpg"
            alt="O Cordão da Bola Preta desfila em bloco de rua no centro do Rio"
            sizes="(max-width: 900px) 100vw, 45vw"
            mediaClassName="hist-media hist-media--landscape"
            caption="O Cordão da Bola Preta em 2009: o bloco fundado em 1918 ainda é um dos maiores do carnaval de rua."
            credit="OsvaldoROVE · CC BY 2.0 · via Wikimedia Commons"
          />
        </div>

        <div className="container">
          <ZoomablePhoto
            src="/assets/images/historia/desfile-2009.jpg"
            alt="Desfile de escola de samba no Sambódromo em 2009"
            sizes="100vw"
            mediaClassName="hist-media hist-media--wide"
            figureStyle={{ marginTop: 40 }}
            caption="No Sambódromo, em 2009: as escolas seguem dando o tom da grande noite — enquanto a rua, lá fora, nunca parou de desfilar."
            credit="Regina Santos · CC BY 2.0 · via Wikimedia Commons"
          />
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="section section--sand" aria-labelledby="linha-title">
        <div className="container">
          <span className="section-head__eyebrow">Em poucas datas</span>
          <h2 id="linha-title">Uma linha do tempo da folia</h2>
          <p className="muted" style={{ maxWidth: "64ch", margin: "10px 0 0" }}>
            Os marcos mais lembrados da história do carnaval carioca, segundo
            as fontes citadas ao final desta página — lembrando que a
            historiografia ainda debate pontos pontuais.
          </p>
          <ol className="hist-timeline">
            {TIMELINE.map((item) => (
              <li key={item.year}>
                <span className="hist-timeline__year">{item.year}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--navy" aria-labelledby="faca-parte-title">
        <div className="container center">
          <span className="section-head__eyebrow">Faça parte</span>
          <h2 id="faca-parte-title" style={{ color: "var(--c-paper)" }}>
            A história continua na rua
          </h2>
          <p style={{ color: "#d6dff0", maxWidth: "60ch", marginInline: "auto" }}>
            O carnaval de rua é uma história aberta, e ela se escreve com novos
            blocos a cada ano. Se o seu bloco de enredo ou embalo quer fazer
            parte dela — com calendário, estrutura e representação — a LIBEERJ
            recebe pré-inscrições o ano inteiro.
          </p>
          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <ButtonLink href="/a-liga#filiacao">
              Fazer pré-inscrição de bloco
            </ButtonLink>
            <ButtonLink href="/blocos" variant="ghost">
              Conhecer os blocos
            </ButtonLink>
          </div>
          <p className="hist-credit" style={{ marginTop: 28 }}>
            Ilustrações e fotografias: acervos públicos e autores citados nas
            legendas, via Wikimedia Commons — ver créditos completos.
          </p>
        </div>
      </section>
    </>
  );
}