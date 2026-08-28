import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Noticia {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'exposicoes' | 'reportagens' | 'televisao' | 'internacional' | 'artigos';
  categoriaNome: string;
  data: string;
  veiculo: string;
  imagem: string; // Imagem de capa ou principal
  tipo?: 'digital' | 'artigo_impresso';
  paginas?: string[]; // Lista com todas as páginas digitalizadas do artigo
  numeroPaginas?: number;
  resumo: string;
  paragrafos: string[];
  citacao?: {
    texto: string;
    autor: string;
  };
  videoUrl?: string;
  tags: string[];
  linkExterno?: {
    url: string;
    label: string;
  };
  destaque?: boolean;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css'
})
export class Noticias implements OnInit {
  categoriaAtiva: string = 'todas';
  noticiaSelecionada: Noticia | null = null;
  isModalOpen: boolean = false;
  
  // Controles do leitor multi-página do modal
  paginaAtivaIndex: number = 0;
  isSpreadView: boolean = false; // Modo revista (lado a lado) para 2 páginas em telas grandes
  isZoomModal: boolean = false; // Zoom em alta definição
  imagemZoomUrl: string = '';

  categorias = [
    { id: 'todas', nome: 'Todas' },
    { id: 'artigos', nome: 'Artigos & Revistas' },
    { id: 'exposicoes', nome: 'Exposições & Mostras' },
    { id: 'reportagens', nome: 'Reportagens em Vídeo' },
    { id: 'televisao', nome: 'Televisão & G1 Globo' },
    { id: 'internacional', nome: 'Carreira Internacional' }
  ];

  noticias: Noticia[] = [
    {
      id: 'exposicao-palacio-museu-fanf1',
      titulo: 'Artista Sergipano Althair Santo Celebra a Renda Irlandesa em Exposição que Une Tradição, Moda e Economia Criativa',
      subtitulo: 'Mostra no Palácio-Museu Luiz Antônio Barreto, em Aracaju, homenageia o legado das mulheres rendeiras e a projeção nacional e internacional do design autoral.',
      categoria: 'exposicoes',
      categoriaNome: 'Exposições & Mostras',
      data: '03 de Julho de 2026',
      veiculo: 'Portal Fan F1 / Assessoria de Imprensa',
      imagem: 'assets/content/noticias/fanf1-exposicao.jpeg',
      tipo: 'digital',
      destaque: true,
      resumo: 'Das mãos das mulheres rendeiras de Sergipe para galerias, passarelas e importantes eventos de moda no Brasil e no exterior. A exposição "Da Tradição à Economia Criativa" celebra o encontro entre memória, território e moda autoral contemporânea.',
      paragrafos: [
        'Das mãos das mulheres rendeiras de Sergipe para galerias, passarelas e importantes eventos de moda no Brasil e no exterior. Essa é a trajetória que inspira a exposição “Da Tradição à Economia Criativa”, do artista sergipano Althair Santo, realizada no Centro Cultural de Aracaju, no Palácio Museu Luiz Antônio Barreto.',
        'Reconhecido por transformar a renda irlandesa em linguagem contemporânea por meio da arte, da moda e do design, Althair construiu sua carreira valorizando um dos maiores patrimônios culturais de Sergipe. Seu trabalho nasce da convivência com as mulheres rendeiras, guardiãs de um saber transmitido entre gerações e responsáveis por preservar uma das mais importantes expressões do artesanato sergipano.',
        'Formado em Moda pela Faculdade do Centro de Tecnologia da Indústria Química e Têxtil (SENAI CETIQT), no Rio de Janeiro, Althair Santo possui trajetória que passou por Guess U.S.E., TV Globo, SPFW, Fashion Rio, Prêt-à-Porter de Paris e consultoria na Rede Sergipe Design com o IED de Milão.',
        'A mostra ressalta que a tradição não é um ponto de chegada, mas de partida: a renda irlandesa ganha novas leituras sem perder sua essência, reafirmando o papel da cultura como instrumento de preservação da memória e construção de futuros possíveis.'
      ],
      citacao: {
        texto: 'A tradição não é algo estático do passado; ela se transforma em economia criativa viva quando há respeito, remuneração digna e reconhecimento autoral.',
        autor: 'Althair Santo para o Fan F1'
      },
      tags: ['Fan F1', 'Exposição', 'Divina Pastora', 'Palácio-Museu', 'Renda Irlandesa', 'Economia Criativa'],
      linkExterno: {
        url: 'https://fanf1.com.br/2026/07/03/artista-sergipano-althair-santo-celebra-a-renda-irlandesa-em-exposicao-que-une-tradicao-moda-e-economia-criativa/',
        label: 'Ler Matéria no Portal Fan F1'
      }
    },
    // 1º ARTIGO (2 PÁGINAS)
    {
      id: 'revista-sergipe-para-o-mundo',
      titulo: 'Altair Santo – "De Sergipe para o Mundo"',
      subtitulo: 'A trajetória do menino que desenhava escondido e se transformou em estilista aclamado por atrizes, diretores de teledramaturgia e semanas de moda.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Coluna de Perfil',
      veiculo: 'Revista de Moda (Por Taís Leite | Fotos Justo Ruiz)',
      imagem: 'assets/content/artigos/sergipe-para-o-mundo-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 2,
      paginas: [
        'assets/content/artigos/sergipe-para-o-mundo-pag1.jpg',
        'assets/content/artigos/sergipe-para-o-mundo-pag2.jpg'
      ],
      resumo: 'Reportagem fotográfica em 2 páginas assinada pela jornalista Taís Leite, documentando a criação do icônico vestido de noiva de Açucena (personagem de Ísis Valverde na novela Cordel Encantado) e desfiles autorais.',
      paragrafos: [
        'A matéria escrita por Taís Leite com fotos de Justo Ruiz homenageia a persistência e a sensibilidade do estilista sergipano.',
        'A publicação narra a criação do vestido de casamento da personagem Açucena na novela Cordel Encantado da TV Globo, que encantou milhões de telespectadores e projetou a renda irlandesa em escala nacional.',
        'O artigo também ressalta as mostras em galerias de arte e o trabalho de consultoria que capacitou novas gerações de artesãs sergipanas.'
      ],
      citacao: {
        texto: 'Para ser moda não precisa estar na moda; precisa ter verdade e identidade.',
        autor: 'Althair Santo para Taís Leite'
      },
      tags: ['Perfil', 'Artigo Impresso', '2 Páginas', 'Cordel Encantado', 'Ísis Valverde', 'TV Globo']
    },
    // 2º ARTIGO (2 PÁGINAS)
    {
      id: 'revista-universo-particular',
      titulo: 'Altair Santo: "Um Universo Particular"',
      subtitulo: '"Costurar tem que ser por amor. A moda me escolheu." Um bate-papo sincero sobre a carreira, os bastidores da TV e o futuro do design sustentável.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Entrevista Exclusiva',
      veiculo: 'Revista de Estilo & Cultura',
      imagem: 'assets/content/artigos/universo-particular-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 2,
      paginas: [
        'assets/content/artigos/universo-particular-pag1.jpg',
        'assets/content/artigos/universo-particular-pag2.jpg'
      ],
      resumo: 'Em entrevista de 2 páginas no formato clássico de perguntas e respostas, Althair Santo abre as portas do seu ateliê e revela suas memórias de infância, opiniões sobre moda praia, parcerias na TV e visão sobre o mercado de luxo brasileiro.',
      paragrafos: [
        'Em formato dinâmico de bate-papo de página dupla, Althair Santo reflete com franqueza e leveza sobre sua trajetória artística e pessoal.',
        'O estilista conta bastidores de sua participação no programa da apresentadora Xuxa Meneghel no quadro Estilista Revelação, suas experiências com grandes marcas e seu apego intransigente à preservação do patrimônio sergipano.',
        'Ele defende que a moda brasileira tem o dever de apoiar suas rendeiras e comunidades locais com remuneração justa e investimentos contínuos.'
      ],
      citacao: {
        texto: 'Sucesso é você deixar um legado de sua existência. Ser lembrado pela obra e pelo respeito às pessoas.',
        autor: 'Althair Santo'
      },
      tags: ['Entrevista', 'Artigo Impresso', '2 Páginas', 'TV Xuxa', 'Neópolis', 'Alta Costura']
    },
    // 3º ARTIGO (4 PÁGINAS)
    {
      id: 'revista-fashionista-milagres',
      titulo: 'Revista Fashionista: "Santo de Casa Faz Milagres, Sim"',
      subtitulo: 'O estilista que carrega o Santo no nome vem encantando uma via crucis e despertando os olhares mais atentos do mundo da moda.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Edição Especial de Moda',
      veiculo: 'Revista Fashionista (Por Roberta Nascimento e Renata Ribeiro | Fotos Fábio Pamplona)',
      imagem: 'assets/content/artigos/fashionista-milagres-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 4,
      paginas: [
        'assets/content/artigos/fashionista-milagres-pag1.jpg',
        'assets/content/artigos/fashionista-milagres-pag2.jpg',
        'assets/content/artigos/fashionista-milagres-pag3.jpg',
        'assets/content/artigos/fashionista-milagres-pag4.jpg'
      ],
      resumo: 'Emocionante matéria de capa em 4 páginas na Revista Fashionista narra a trajetória de Althair Santo: a infância no interior de Sergipe, a bolsa na faculdade SENAI CETIQT (RJ), a criação de figurinos aclamados para novelas da TV Globo (Cordel Encantado e Mad Maria) e a projeção internacional de suas peças em renda irlandesa.',
      paragrafos: [
        'Em reportagem especial de 4 páginas assinada pelas jornalistas Roberta Nascimento e Renata Ribeiro, com ensaio fotográfico de Fábio Pamplona, a Revista Fashionista mergulhou na essência poética e artesanal do estilista Althair Santo.',
        'O artigo relembra sua paixão precoce pelos tecidos na cidade natal de Neópolis, às margens do Rio São Francisco, onde desenhava escondido do pai e ajudava a mãe costureira, até conquistar uma cobiçada bolsa de estudos na prestigiada Faculdade SENAI CETIQT, no Rio de Janeiro.',
        'A matéria detalha o sucesso arrebatador de suas coleções autorais inspiradas em Maria Bonita e Arthur Bispo do Rosário, sua pesquisa aprofundada com as mestras rendeiras de Divina Pastora e sua atuação consagrada na TV Globo, criando vestidos icônicos para personagens célebres de minisséries e telenovelas.',
        'O texto conclui celebrando o estilista como um dos maiores expoentes do design sustentável e da alta costura artesanal no Brasil.'
      ],
      citacao: {
        texto: 'A renda irlandesa é uma joia brasileira que une técnica secular e alma contemporânea.',
        autor: 'Revista Fashionista'
      },
      tags: ['Revista Fashionista', 'Artigo Impresso', '4 Páginas', 'TV Globo', 'SENAI CETIQT', 'Renda Irlandesa']
    },
    // 4º ARTIGO (4 PÁGINAS)
    {
      id: 'revista-moda-altair-criador',
      titulo: 'Revista Moda: "Altair Santo Criador"',
      subtitulo: 'A união entre o rigor da modelagem autoral e a tradição dos bordados: como o designer sergipano conquistou Paris e o circuito da alta moda.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Edição Especial Moda & Arte',
      veiculo: 'Revista Moda (Por Jaci Rosa Cruz)',
      imagem: 'assets/content/artigos/altair-criador-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 4,
      paginas: [
        'assets/content/artigos/altair-criador-pag4.jpg',
        'assets/content/artigos/altair-criador-pag1.jpg',
        'assets/content/artigos/altair-criador-pag2.jpg',
        'assets/content/artigos/altair-criador-pag3.jpg'
      ],
      resumo: 'Artigo aprofundado em 4 páginas assinado pela jornalista Jaci Rosa Cruz retrata a maturidade criativa de Althair Santo, suas apresentações no Salão do Prêt-à-Porter de Paris, parcerias com Monique Evans e consultorias com o IED de Milão.',
      paragrafos: [
        'A conceituada jornalista de moda Jaci Rosa Cruz assina uma análise primorosa de 4 páginas sobre o trabalho autoral de Althair Santo na Revista Moda.',
        'O texto explora como o estilista consegue aliar a riqueza artesanal dos pontos de renda irlandesa, renascença e bilro a cortes estruturados de alta alfaiataria, evitando clichês e projetando o Nordeste com sofisticação universal.',
        'A matéria traz ainda imagens de editoriais com a modelo Natalia Gaspar, a recepção calorosa da crítica francesa no Salão do Prêt-à-Porter de Paris e a consultoria prestada junto à Rede Sergipe Design com o Instituto Europeu de Design (IED Milão).',
        'Uma retrospectiva visual completa da formação técnica, estética e humana do artista sergipano.'
      ],
      citacao: {
        texto: 'O que me encanta é a autenticidade: levar a identidade da sua terra natal para o mundo com rigor e respeito.',
        autor: 'Jaci Rosa Cruz na Revista Moda'
      },
      tags: ['Revista Moda', 'Artigo Impresso', '4 Páginas', 'Paris', 'Prêt-à-Porter', 'Divina Pastora']
    },
    // 5º ARTIGO (2 PÁGINAS)
    {
      id: 'world-fashion-sergipe-fashion',
      titulo: 'World Fashion: "Bordados e Rendas Sergipanas Ganham a Moda"',
      subtitulo: 'Feiras & Eventos: a consagração das rendas tradicionais do sertão no circuito comercial e editorial de moda nacional.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Edição World Fashion Feiras',
      veiculo: 'Revista World Fashion Magazine',
      imagem: 'assets/content/artigos/world-fashion-sergipe-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 2,
      paginas: [
        'assets/content/artigos/world-fashion-sergipe-pag1.jpg',
        'assets/content/artigos/world-fashion-sergipe-pag2.jpg'
      ],
      resumo: 'Cobertura em página dupla na revista especializada World Fashion destacando o Sergipe Fashion e o impacto socioeconômico das criações de Althair Santo junto às comunidades artesãs de Tobias Barreto e Divina Pastora.',
      paragrafos: [
        'A prestigiada publicação de negócios e estilo World Fashion Magazine dedicou reportagem especial de 2 páginas ao movimento "Sergipe Fashion".',
        'O texto pontua como o talento de Althair Santo foi catalisador para reposicionar o artesanato tradicional em vestuário refinado de alto valor agregado, impulsionando a geração de renda e valorização cultural.',
        'A matéria acompanha desfiles e mostras que reuniram estilistas, empresários e imprensa especializada para aplaudir a inventividade têxtil do estado de Sergipe.'
      ],
      citacao: {
        texto: 'Bordados e rendas sergipanas deixam as roupas regionais e ganham o mercado global da moda.',
        autor: 'World Fashion Magazine'
      },
      tags: ['World Fashion', 'Artigo Impresso', '2 Páginas', 'Sergipe Fashion', 'Bordados', 'Desfiles']
    },
    // 6º ARTIGO (1 PÁGINA)
    {
      id: 'world-fashion-estetica-made-in-brazil',
      titulo: 'World Fashion: "Estética Made in Brazil"',
      subtitulo: 'Estilista sergipano utiliza tradicional trançado do século 18 e exalta suas criações com a arte da renda irlandesa.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Abril / Maio',
      veiculo: 'Revista World Fashion (Por Cleine de Castro)',
      imagem: 'assets/content/artigos/world-fashion-estilo-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 1,
      paginas: [
        'assets/content/artigos/world-fashion-estilo-pag1.jpg'
      ],
      resumo: 'Artigo da crítica de moda Cleine de Castro na revista World Fashion analisando o rigor conceitual da coleção de Althair Santo e a transposição das técnicas do século XVIII para vestidos cosmopolitas.',
      paragrafos: [
        'Na coluna de estilo da World Fashion, a especialista Cleine de Castro discorre sobre a força estética da identidade brasileira expressa nas peças de Althair Santo.',
        'A matéria ressalta a complexidade de adaptação dos trançados seculares da renda de agulha e bilro em silhuetas fluidas, celebrando o nascimento de uma genuína alta costura autoral no Nordeste.'
      ],
      citacao: {
        texto: 'Uma estética refinada que prova a riqueza inesgotável da cultura sergipana.',
        autor: 'Cleine de Castro na World Fashion'
      },
      tags: ['World Fashion', 'Artigo Impresso', '1 Página', 'Made in Brazil', 'Século XVIII', 'Alta Costura']
    },
    // 7º ARTIGO (1 PÁGINA)
    {
      id: 'pret-a-porter-paris-abit-apex',
      titulo: 'Prêt-à-Porter Paris: Catálogo Oficial "From Brazil"',
      subtitulo: 'ABIT e ApexBrasil selecionam Althair Santo para representar o design brasileiro na capital mundial da moda.',
      categoria: 'internacional',
      categoriaNome: 'Carreira Internacional',
      data: 'Salão do Prêt-à-Porter – Paris',
      veiculo: 'Catálogo Oficial Prêt-à-Porter Paris / ApexBrasil / ABIT',
      imagem: 'assets/content/artigos/pret-a-porter-paris-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 1,
      paginas: [
        'assets/content/artigos/pret-a-porter-paris-pag1.jpg'
      ],
      resumo: 'Publicação oficial do pavilhão brasileiro no Salão Internacional do Prêt-à-Porter de Paris apresentando o estilista Althair Santo aos maiores compradores, críticos e galeristas europeus.',
      paragrafos: [
        'A Associação Brasileira da Indústria Têxtil (ABIT) e a Agência Brasileira de Promoção de Exportações e Investimentos (ApexBrasil) selecionaram Althair Santo para a delegação de ponta no Salão do Prêt-à-Porter de Paris.',
        'O catálogo internacional destaca a originalidade do trabalho com a renda irlandesa e o acabamento impecável das peças, colocando a moda sergipana no mapa do luxo internacional.'
      ],
      citacao: {
        texto: 'From Brazil to the World: the unmatched elegance of handmade Irish lace.',
        autor: 'Prêt-à-Porter Paris Official Catalogue'
      },
      tags: ['Paris', 'Prêt-à-Porter', 'ApexBrasil', 'ABIT', 'Internacional', '1 Página']
    },
    // 8º ARTIGO (3 PÁGINAS)
    {
      id: 'espetaculo-reverso-danca',
      titulo: 'Espetáculo "REVERSO" & Ensaio Dança (Prêmio Klauss Vianna)',
      subtitulo: 'Programa oficial, ficha técnica e ensaio de moda com figurinos assinados por Altair Santo para a Cubos Companhia de Dança.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Programa Oficial de Dança & Revista Aracaju',
      veiculo: 'Cubos Cia de Dança / Prêmio Funarte Klauss Vianna / Aracaju Magazine',
      imagem: 'assets/content/artigos/reverso-danca-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 3,
      paginas: [
        'assets/content/artigos/reverso-danca-pag1.jpg',
        'assets/content/artigos/reverso-danca-pag2.jpg',
        'assets/content/artigos/aracaju-magazine-pag1.jpg'
      ],
      resumo: 'Publicação de 3 páginas reunindo o programa oficial do espetáculo "REVERSO", vencedor do Prêmio Funarte Klauss Vianna, com figurinos concebidos por Altair Santo, e o ensaio fotográfico editorial da revista Aracaju Magazine.',
      paragrafos: [
        'O espetáculo "REVERSO", com direção de Rodolpho Sandes e direção convidada de Lindolfo Amaral, contou com a concepção de figurinos de Altair Santo e confecção das rendeiras Maria Custódia e Selma dos Santos.',
        'Inspirado no gestual e na força das lavadeiras, o espetáculo transformou tecidos rústicos e bordados em poesia corporal em movimento, sendo ovacionado pelo público e pela crítica especializada.',
        'O ensaio fotográfico editorial retrata a fluidez das peças em movimento, realçando a expressividade cenográfica e a riqueza tátil do figurino.'
      ],
      citacao: {
        texto: 'Reverso é o rever o verso da nossa gente, que constrói com o seu cotidiano versos extraídos da força da água, da arte e da festa.',
        autor: 'Programa do Espetáculo Reverso'
      },
      tags: ['Dança Contemporânea', 'Figurino', '3 Páginas', 'Prêmio Klauss Vianna', 'Teatro', 'Ensaio']
    },
    // 9º ARTIGO (2 PÁGINAS)
    {
      id: 'teatro-respire-globo-projac',
      titulo: 'Teatro & Teledramaturgia: "Respire... E Conte Até 10!" e Documento TV Globo',
      subtitulo: 'Cartaz da montagem do Grupo Caixa Cênica e documento histórico de movimentação de figurinos na Rede Globo / Projac.',
      categoria: 'televisao',
      categoriaNome: 'Televisão & G1 Globo',
      data: 'Acervo Histórico de Artes Cênicas e TV',
      veiculo: 'Grupo Caixa Cênica / TV Globo Projac',
      imagem: 'assets/content/artigos/respire-teatro-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 2,
      paginas: [
        'assets/content/artigos/respire-teatro-pag1.jpg',
        'assets/content/artigos/globo-figurino-doc-pag1.jpg'
      ],
      resumo: 'Publicação de 2 páginas combinando o cartaz original do espetáculo teatral "Respire... E Conte Até 10!" e a guia oficial de movimentação de figurinos em renda do Projac (TV Globo).',
      paragrafos: [
        'Com texto do escritor premiado Marcelino Freire e direção de Sidney Cruz, a montagem teatral "Respire... E Conte Até 10!" teve seus figurinos conceituais criados por Altair Santo para os atores Diane Velôso e Leandro Goddinho.',
        'Ao lado, o registro histórico de 2004 emitido pelo departamento de figurinos da TV Globo (Projac) documenta a entrada de peças variadas de tecidos de renda e retalhos bordados confeccionados por Altair Santo para a teledramaturgia nacional.'
      ],
      citacao: {
        texto: 'A criação de figurinos exige mergulhar na alma dos personagens para vestir suas emoções.',
        autor: 'Altair Santo'
      },
      tags: ['Teatro', 'TV Globo', 'Projac', 'Figurinos', '2 Páginas', 'Documento Histórico']
    },
    // 10º ARTIGO (1 PÁGINA)
    {
      id: 'jornal-do-brasil-mulheres-rendadas',
      titulo: 'Jornal do Brasil (Caderno B): "Mulheres Rendadas"',
      subtitulo: 'Estilista sergipano valoriza na moda o artesanato do sertão em reportagem especial do principal caderno cultural do país.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Acervo Jornal do Brasil',
      veiculo: 'Jornal do Brasil – Caderno B (Rio de Janeiro)',
      imagem: 'assets/content/artigos/jornal-do-brasil-pag1.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 1,
      paginas: [
        'assets/content/artigos/jornal-do-brasil-pag1.jpg'
      ],
      resumo: 'Página histórica do Caderno B do Jornal do Brasil celebrando o trabalho pioneiro de Althair Santo em levar os saberes das rendeiras do sertão sergipano para o centro do debate fashion no Rio de Janeiro.',
      paragrafos: [
        'O célebre Caderno B do tradicional Jornal do Brasil dedicou página inteira à cobertura do desfile e da coleção autoral de Althair Santo.',
        'A reportagem enaltece a sensibilidade com que o estilista une o savoir-faire das mulheres rendeiras às exigências do corte moderno, gerando reconhecimento cultural e desenvolvimento social para Sergipe.',
        'Um marco incontornável na historiografia da moda contemporânea sergipana.'
      ],
      citacao: {
        texto: 'O encanto da renda é saber que cada centímetro guarda a história e o tempo de uma mulher rendeira.',
        autor: 'Jornal do Brasil'
      },
      tags: ['Jornal do Brasil', 'Caderno B', 'Artigo Impresso', '1 Página', 'Rio de Janeiro', 'Imprensa Nacional']
    },
    // 11º ARTIGO (2 PÁGINAS)
    {
      id: 'bastidores-gisele-altair',
      titulo: 'Acervo de Bastidores: Altair Santo & Gisele Bündchen',
      subtitulo: 'Registros fotográficos de bastidores nos grandes eventos da moda brasileira e no processo de criação de noivas autorais.',
      categoria: 'artigos',
      categoriaNome: 'Artigos & Revistas',
      data: 'Acervo Pessoal Althair Santo',
      veiculo: 'Arquivo Histórico de Moda',
      imagem: 'assets/content/artigos/bastidores-gisele-pag2.jpg',
      tipo: 'artigo_impresso',
      numeroPaginas: 2,
      paginas: [
        'assets/content/artigos/bastidores-noiva-pag1.jpg',
        'assets/content/artigos/bastidores-gisele-pag2.jpg'
      ],
      resumo: 'Fotografias históricas de arquivo pessoal reunindo o estilista Althair Santo e a supermodelo Gisele Bündchen nos bastidores de desfiles, além de registros de processos de confecção de noivas.',
      paragrafos: [
        'Registros do acervo pessoal de Althair Santo capturam encontros memoráveis com grandes ícones da moda mundial, como a top model Gisele Bündchen durante as semanas de moda nacionais.',
        'As fotos também ilustram a dedicação minuciosa do ateliê na montagem de vestidos de noiva e figurinos de gala esculpidos em legítima renda sergipana.'
      ],
      tags: ['Gisele Bündchen', 'Bastidores', '2 Páginas', 'Moda Brasileira', 'Acervo Pessoal']
    },
    // VÍDEOS & REPORTAGENS DIGITAIS
    {
      id: 'balanco-geral-tv-atalaia',
      titulo: 'Balanço Geral Sergipe: Exposição de Althair Santo Valoriza a Moda e a Cultura Sergipana',
      subtitulo: 'Reportagem da TV Atalaia (Record TV) destaca a abertura da mostra e o impacto da renda irlandesa na arte e no design contemporâneo.',
      categoria: 'reportagens',
      categoriaNome: 'Reportagens em Vídeo',
      data: '07 de Julho de 2026',
      veiculo: 'TV Atalaia / Record TV – Balanço Geral SE',
      imagem: 'assets/content/noticias/balanco-geral.jpg',
      tipo: 'digital',
      videoUrl: 'https://www.youtube.com/embed/XSTv-xD_cJo',
      destaque: false,
      resumo: 'Em matéria especial, o programa Balanço Geral Sergipe exibe as criações de Althair Santo, ressaltando a delicadeza dos bordados manuais e a repercussão da mostra em Aracaju.',
      paragrafos: [
        'A equipe do Balanço Geral Sergipe (TV Atalaia / Record TV) visitou a exposição do estilista e artista plástico Althair Santo, trazendo depoimentos e imagens detalhadas das peças confeccionadas com a legítima renda irlandesa.',
        'A matéria jornalística evidencia como o estilista consegue elevar o artesanato do interior sergipano a um padrão de refinamento digno das maiores semanas de moda do mundo, incentivando as novas gerações a valorizarem o patrimônio do estado.',
        'Assista à reportagem completa no player abaixo e confira a entrevista com Althair Santo.'
      ],
      citacao: {
        texto: 'Ver o nosso artesanato valorizado em rede de televisão é a certeza de que a cultura sergipana é grandiosa.',
        autor: 'Althair Santo no Balanço Geral'
      },
      tags: ['Balanço Geral', 'TV Atalaia', 'Record TV', 'Vídeo', 'Reportagem', 'Renda Irlandesa'],
      linkExterno: {
        url: 'https://youtu.be/XSTv-xD_cJo',
        label: 'Assistir no YouTube'
      }
    },
    {
      id: 'g1-bom-dia-sergipe',
      titulo: 'G1 / Bom Dia Sergipe: Exposição do Artista Althair Santo Celebra Renda Irlandesa',
      subtitulo: 'Telejornal matinal da TV Sergipe (Rede Globo) traz os destaques da exposição e a união entre tradição e contemporaneidade.',
      categoria: 'televisao',
      categoriaNome: 'Televisão & G1 Globo',
      data: 'Julho de 2026',
      veiculo: 'G1 Sergipe / TV Sergipe (Rede Globo)',
      imagem: 'assets/content/noticias/g1-bom-dia-sergipe.jpg',
      tipo: 'digital',
      destaque: false,
      resumo: 'O portal G1 e o telejornal Bom Dia Sergipe exibiram reportagem exclusiva celebrando o talento de Althair Santo e a maestria das artesãs de Divina Pastora.',
      paragrafos: [
        'O Bom Dia Sergipe, telejornal da TV Sergipe / Rede Globo, dedicou espaço nobre para noticiar a exposição do artista e estilista Althair Santo no Palácio-Museu Luiz Antônio Barreto.',
        'A reportagem destacou a técnica refinada da renda irlandesa e a sensibilidade do estilista em transformar tradições populares em obras de arte apreciadas pelo público e pela crítica.',
        'A matéria completa e os trechos em vídeo podem ser conferidos no portal G1 Sergipe.'
      ],
      citacao: {
        texto: 'A renda irlandesa é patrimônio do Brasil que floresce em Sergipe e ganha o mundo.',
        autor: 'G1 Sergipe'
      },
      tags: ['G1', 'Globo', 'Bom Dia Sergipe', 'TV Sergipe', 'Exposição', 'Aracaju'],
      linkExterno: {
        url: 'https://g1.globo.com/se/sergipe/videos-bom-dia-sergipe/video/exposicao-do-artista-althair-santos-celebra-renda-irlandesa-14756297.ghtml',
        label: 'Assistir Vídeo no G1 Globo'
      }
    },
    {
      id: 'tv-camara-aracaju',
      titulo: 'TV Câmara Aracaju: Mostra "Da Tradição à Economia Criativa" no Palácio-Museu',
      subtitulo: 'Cobertura especial aborda a importância das políticas de incentivo cultural e a força da sergipanidade na moda autoral.',
      categoria: 'reportagens',
      categoriaNome: 'Reportagens em Vídeo',
      data: '15 de Julho de 2026',
      veiculo: 'TV Câmara Aracaju',
      imagem: 'assets/content/noticias/tv-camara.jpg',
      tipo: 'digital',
      videoUrl: 'https://www.youtube.com/embed/ooN-Zc1g_ss',
      destaque: false,
      resumo: 'A TV Câmara Aracaju registrou os momentos mais marcantes da exposição, ouvindo visitantes, especialistas e o próprio Althair Santo sobre o futuro do design sustentável.',
      paragrafos: [
        'A TV Câmara Aracaju produziu uma reportagem aprofundada sobre a mostra "Da Tradição à Economia Criativa", realizada com o apoio da Lei Paulo Gustavo e Fundação Cultural de Aracaju (Funcaju).',
        'O vídeo contextualiza a evolução da Renda Irlandesa desde as oficinas familiares até os grandes desfiles, demonstrando como a valorização cultural gera oportunidades reais para as comunidades artesãs.',
        'Confira a cobertura televisiva completa no player integrado a seguir.'
      ],
      citacao: {
        texto: 'A cultura se torna economia criativa quando reconhecemos o valor histórico e humano em cada peça.',
        autor: 'TV Câmara Aracaju'
      },
      tags: ['TV Câmara', 'Aracaju', 'Vídeo', 'Funcaju', 'Economia Criativa', 'Cultura'],
      linkExterno: {
        url: 'https://youtu.be/ooN-Zc1g_ss',
        label: 'Assistir no YouTube'
      }
    },
    {
      id: 'g1-setv-1-edicao',
      titulo: 'G1 / SETV 1ª Edição: Estilista Althair Santo Realiza na Capital Exposição de Trabalhos Criados por Ele',
      subtitulo: 'Cobertura do telejornal vespertino da Rede Globo destaca a trajetória de moda autoral, figurinos para teledramaturgia e design.',
      categoria: 'televisao',
      categoriaNome: 'Televisão & G1 Globo',
      data: 'Acervo TV Sergipe / Globo',
      veiculo: 'G1 Sergipe / SETV 1ª Edição',
      imagem: 'assets/content/noticias/g1-setv.jpg',
      tipo: 'digital',
      destaque: false,
      resumo: 'O SETV 1ª Edição levou ao público sergipano um panorama completo das criações de Althair Santo, relembrando peças marcantes de sua trajetória artística.',
      paragrafos: [
        'Em reportagem do telejornal SETV 1ª Edição, da TV Sergipe (Globo), os telespectadores puderam acompanhar a apresentação dos vestidos e composições icônicas assinadas por Althair Santo.',
        'A matéria ressalta a versatilidade do estilista na criação de figurinos autorais e sua participação em momentos históricos da moda brasileira, como as passarelas de São Paulo e o figurino de novelas consagradas.',
        'O conteúdo está disponível na íntegra no acervo digital do G1 Sergipe.'
      ],
      citacao: {
        texto: 'Criar moda em Sergipe é conectar as mãos do artesão ao olhar do mundo.',
        autor: 'Althair Santo no SETV'
      },
      tags: ['G1', 'SETV', 'TV Sergipe', 'Rede Globo', 'Figurinos', 'Moda Autoral'],
      linkExterno: {
        url: 'https://g1.globo.com/se/sergipe/videos-setv-1-edicao/video/estilista-altair-santo-realiza-na-capital-uma-exposicao-de-trabalhos-criados-por-ele-2349223.ghtml',
        label: 'Assistir Vídeo no G1 Globo'
      }
    },
    {
      id: 'heloisa-tolipan-senai-cetiqt',
      titulo: 'SENAI CETIQT: Produzindo Sonhos – O Ex-Aluno Althair Santo Possui Carreira de Renome Internacional',
      subtitulo: 'A conceituada jornalista de moda Heloisa Tolipan detalha a trajetória do designer, seu estágio na Guess (EUA), Paris e figurinos da TV Globo.',
      categoria: 'internacional',
      categoriaNome: 'Carreira Internacional',
      data: 'Coluna Heloisa Tolipan',
      veiculo: 'Portal Heloisa Tolipan – Moda',
      imagem: 'assets/content/noticias/heloisa-tolipan.jpg',
      tipo: 'digital',
      destaque: false,
      resumo: 'Artigo detalha como o designer lapidou seu talento na conceituada faculdade SENAI CETIQT e conquistou espaço na moda internacional, em Paris e na televisão brasileira.',
      paragrafos: [
        'Em matéria especial no prestigiado portal de moda de Heloisa Tolipan, a trajetória de Althair Santo é contada como um grande exemplo de sucesso e excelência profissional.',
        'O artigo narra como a formação técnica e criativa na Faculdade SENAI CETIQT (RJ) foi decisiva para o estilista, impulsionando experiências internacionais na Guess (Estados Unidos), no Salão do Prêt-à-Porter de Paris e na criação de figurinos aclamados para produções da TV Globo.',
        'A publicação homenageia a dedicação de Althair em unir o rigor da modelagem autoral com a riqueza identitária da renda irlandesa e das tradições sergipanas.'
      ],
      citacao: {
        texto: 'A faculdade lapidou o meu talento e me deu a base técnica para levar a identidade brasileira para o cenário internacional.',
        autor: 'Althair Santo para Heloisa Tolipan'
      },
      tags: ['Heloisa Tolipan', 'SENAI CETIQT', 'Paris', 'Guess', 'Internacional', 'Moda'],
      linkExterno: {
        url: 'https://heloisatolipan.com.br/moda/senai-cetiqt-produzindo-sonhos-o-ex-aluno-da-faculdade-altair-santo-possui-carreira-de-renome-internacional/',
        label: 'Ler Artigo no Portal Heloisa Tolipan'
      }
    },
    {
      id: 'reportagem-video-boas-historias-artesas',
      titulo: 'Programa Boas Histórias: As Rendeiras de Divina Pastora e a Arte de Althair Santo',
      subtitulo: 'Documentário especial revela o saber ancestral das mestras rendeiras e a cocriação na moda autoral brasileira.',
      categoria: 'reportagens',
      categoriaNome: 'Reportagens em Vídeo',
      data: 'Especial Televisivo',
      veiculo: 'Programa Boas Histórias',
      imagem: 'assets/content/noticias/boas-historias-artesas.jpg',
      tipo: 'digital',
      videoUrl: 'https://www.youtube.com/embed/_gzK4s9jGR4?start=690',
      destaque: false,
      resumo: 'Emocionante reportagem que acompanha as mestras rendeiras de Divina Pastora no processo de confecção manual da renda irlandesa e a valorização dessa tradição pelo estilista Althair Santo.',
      paragrafos: [
        'O programa "Boas Histórias" produziu um registro aprofundado e sensível sobre o município de Divina Pastora, no sertão sergipano, evidenciando o ofício da Renda Irlandesa como Patrimônio Cultural Imaterial do Brasil.',
        'A reportagem traz depoimentos das artesãs que preservam cada ponto e demonstra a importância do trabalho de Althair Santo em conectar o saber secular dessas mulheres às passarelas e ao circuito da alta moda.',
        'Assista ao vídeo da reportagem na íntegra no player integrado abaixo.'
      ],
      citacao: {
        texto: 'A renda irlandesa é mais do que um artesanato; é a identidade e o coração do nosso povo bordados à mão.',
        autor: 'Depoimento no Programa Boas Histórias'
      },
      tags: ['Boas Histórias', 'Divina Pastora', 'Artesãs', 'Renda Irlandesa', 'Vídeo', 'Documentário'],
      linkExterno: {
        url: 'https://www.youtube.com/watch?v=_gzK4s9jGR4&t=690s',
        label: 'Assistir no YouTube'
      }
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Inicialização
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get noticiasFiltradas(): Noticia[] {
    if (this.categoriaAtiva === 'todas') {
      return this.noticias;
    }
    return this.noticias.filter(noticia => noticia.categoria === this.categoriaAtiva);
  }

  get noticiaDestaque(): Noticia | undefined {
    return this.noticias.find(n => n.destaque);
  }

  get outrasNoticias(): Noticia[] {
    const filtradas = this.noticiasFiltradas;
    if (this.categoriaAtiva === 'todas') {
      return filtradas.filter(n => !n.destaque);
    }
    return filtradas;
  }

  setCategoria(categoriaId: string): void {
    this.categoriaAtiva = categoriaId;
  }

  abrirNoticia(noticia: Noticia): void {
    this.noticiaSelecionada = noticia;
    this.paginaAtivaIndex = 0;
    this.isSpreadView = false;
    this.isZoomModal = false;
    this.isModalOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.noticiaSelecionada = null;
    this.isZoomModal = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  // Navegação no leitor de páginas
  irParaPagina(index: number): void {
    if (!this.noticiaSelecionada?.paginas) return;
    if (index >= 0 && index < this.noticiaSelecionada.paginas.length) {
      this.paginaAtivaIndex = index;
    }
  }

  proximaPagina(): void {
    if (!this.noticiaSelecionada?.paginas) return;
    if (this.paginaAtivaIndex < this.noticiaSelecionada.paginas.length - 1) {
      this.paginaAtivaIndex++;
    }
  }

  paginaAnterior(): void {
    if (!this.noticiaSelecionada?.paginas) return;
    if (this.paginaAtivaIndex > 0) {
      this.paginaAtivaIndex--;
    }
  }

  alternarSpreadView(): void {
    this.isSpreadView = !this.isSpreadView;
  }

  abrirZoom(imagemUrl: string): void {
    this.imagemZoomUrl = imagemUrl;
    this.isZoomModal = true;
  }

  fecharZoom(): void {
    this.isZoomModal = false;
    this.imagemZoomUrl = '';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isModalOpen) return;

    if (event.key === 'Escape') {
      if (this.isZoomModal) {
        this.fecharZoom();
      } else {
        this.fecharModal();
      }
    } else if (event.key === 'ArrowRight') {
      this.proximaPagina();
    } else if (event.key === 'ArrowLeft') {
      this.paginaAnterior();
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

