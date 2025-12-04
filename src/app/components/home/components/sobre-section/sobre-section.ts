import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-section.html',
  styleUrl: './sobre-section.css'
})
export class SobreSection {
  @Output() navegarParaSobre = new EventEmitter<void>();

  sobreData = {
    title: 'A Alma do Design Autoral',
    description: 'Quando se olha para o trabalho de Althair Santo, a força criativa sergipana aparece de imediato. Formado em Design de Moda e em Português/Francês pela UFS, ele enxerga a moda como linguagem e obra de arte.  Um caminho para contar histórias e valorizar o território que o formou.',
    description2: 'Sua produção nasce de uma rede colaborativa de artesãos de Sergipe, que fortalece cada etapa e imprime sentido às peças. Ele valoriza as múltiplas vidas de uma roupa: das mãos que bordam à presença de quem veste, carregando cultura e identidade.',
    description3: 'Com trajetória que cruzou marcas como Guess U.S.E., TV Globo, SPFW, Fashion Rio, Innovamoda e o Prêt-à-Porter de Paris, Althair também foi consultor da Rede Sergipe Design com o IED de Milão, estudou moulage em Paris, orientou coleção premiada no DFB Festival, coordenou o curso de estilista do SENAC Sergipe e lecionou moda na Áustria. Hoje, como embaixador do Fashion Revolution Brasil em São Paulo e integrante do Brasil Eco Fashion Week, segue criando uma moda que une arte, território e pensamento contemporâneo.',
    features: [
      {
        icon: 'fas fa-award',
        title: 'Design Premiado',
        description: 'Reconhecimento internacional.'
      },
      {
        icon: 'fas fa-hand-sparkles',
        title: '100% Artesanal',
        description: 'Peças feitas à mão com alma.'
      }
    ]
  };

  onNavegarParaSobre(): void {
    this.navegarParaSobre.emit();
  }
}
