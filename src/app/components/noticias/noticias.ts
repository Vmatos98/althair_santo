import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Noticia {
  id: string;
  titulo: string;
  subtitulo?: string;
  categoria: 'exposicoes' | 'reportagens' | 'televisao' | 'internacional';
  categoriaNome: string;
  data: string;
  veiculo: string;
  imagem: string;
  resumo: string;
  paragrafos: string[];
  citacao?: {
    texto: string;
    autor: string;
  };
  videoUrl?: string;
  tags: string[];
  linkExterno: {
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

  categorias = [
    { id: 'todas', nome: 'Todas' },
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
    {
      id: 'balanco-geral-tv-atalaia',
      titulo: 'Balanço Geral Sergipe: Exposição de Althair Santo Valoriza a Moda e a Cultura Sergipana',
      subtitulo: 'Reportagem da TV Atalaia (Record TV) destaca a abertura da mostra e o impacto da renda irlandesa na arte e no design contemporâneo.',
      categoria: 'reportagens',
      categoriaNome: 'Reportagens em Vídeo',
      data: '07 de Julho de 2026',
      veiculo: 'TV Atalaia / Record TV – Balanço Geral SE',
      imagem: 'assets/content/noticias/balanco-geral.jpg',
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
      destaque: false,
      resumo: 'Artigo detalha como o designer, filho de costureira, lapidou seu talento na conceituada faculdade SENAI CETIQT e conquistou espaço na moda internacional, em Paris e na televisão brasileira.',
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
    this.isModalOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  fecharModal(): void {
    this.isModalOpen = false;
    this.noticiaSelecionada = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
