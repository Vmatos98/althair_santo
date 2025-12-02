import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-artesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artesas.html',
  styleUrl: './artesas.css'
})
export class Artesas {
  constructor(private sanitizer: DomSanitizer) { }
  estrutura = {
    video: {
      url: "http://www.youtube.com/watch?v=_gzK4s9jGR4",
      descricao: "Você pode encontrar o vídeo na integra aqui: Boas histórias - Divina Pastora."
    },

    artesanato: {
      titulo: "A Arte: Renda Irlandesa – O Patrimônio da Alta Costura Brasileira",
      texto: `A Renda Irlandesa de Divina Pastora, Sergipe, é mais do que um artesanato; é um Patrimônio Vivo reconhecido e elevado à categoria de arte. Este saber ancestral é meticulosamente preservado pelas mãos de nossas rendeiras, sendo transmitido de geração para geração, vizinha para vizinha.
              A técnica é singular e sua execução é totalmente manual. Em um mundo de produção em massa, cada peça de Renda Irlandesa é um objeto de Alta Costura (Haute Couture). Assim como os ateliês de Paris, honramos a tradição de que 80% a 90% da peça é feita artesanalmente. Não se trata de uma produção em série, mas de uma criação singular que carrega a alma e a história de quem a teceu.
              Para o Ateliê Altair Santo, a Renda Irlandesa é o nosso tecido mais nobre, conferindo exclusividade, atemporalidade e um valor intrínseco que transcende as tendências efêmeras da moda.`
    },
    artesas: {
      titulo: "As Artesãs: Guardiãs de um Legado Vivo",
      texto: `As Rendeiras de Divina Pastora são as verdadeiras guardiãs do nosso legado. São mulheres orgulhosas que, historicamente, transformaram a necessidade de subsistência em uma forma de expressão e união comunitária. O fazer manual da renda atua como uma terapia e um refúgio, sendo um catalisador de bem-estar social.

              Nosso compromisso não é apenas com a arte, mas com a ética e o preço justo. A gestão da associação é profissionalizada e transparente, com uma nova liderança que alia a habilidade de fazer renda ao conhecimento em administração, direito e psicologia, garantindo a sustentabilidade do negócio e o pagamento justo e rastreável.

              Acreditamos na continuidade. Por meio da Escola de Renda, investimos na formação da nova geração – filhas e jovens da comunidade – para que essa arte milenar jamais se perca, assegurando que o ofício seja passado com a mesma excelência do passado para o futuro.`
    },
    althair: {
      titulo: "Althair Santo: Visão, Ética e o Respeito ao Tempo",
      texto: `Seu propósito inicial, fundamentado nos princípios de sustentabilidade e responsabilidade social, é usar sua lupa criativa para projetar o brilho da Renda Irlandesa de Divina Pastora para o mundo. Ao incorporar o artesanato em peças de moda autoral, Altair Santo:

            Promove o Preço Justo: Respeita o tempo da artesã, que não é o tempo de uma máquina. Garante que o valor final da peça reflita o esforço, a habilidade e a raridade do trabalho manual.

            Garante a Autoria: Em um gesto de transparência e reconhecimento, cada peça carrega uma tag especial onde constam o local de origem da renda e o nome de todas as artesãs que participaram da sua confecção.

            Criação em Colaboração: O processo é uma cocriação com o cliente. Através de um acompanhamento detalhado e transparente (via chamadas de vídeo), o cliente testemunha a evolução de sua peça, desde a escolha do desenho e dos pontos até a montagem final, criando um vínculo afetivo e um profundo entendimento sobre o valor da obra.

            Altair Santo estabelece uma ponte entre a tradição mais pura e a moda global, provando que é possível unir a exclusividade da Alta Costura com a ética e a sustentabilidade.`
    }
  }

  getVideoUrl(): SafeResourceUrl {
    // Extrair o ID do vídeo do YouTube e adicionar o parâmetro de início em 11:30 (690 segundos) com autoplay
    const videoId = '_gzK4s9jGR4';
    const embedUrl = `https://www.youtube.com/embed/${videoId}?start=690&autoplay=1&rel=0&modestbranding=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getParagrafos(texto: string): string[] {
    return texto.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
