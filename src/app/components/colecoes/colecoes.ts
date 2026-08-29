import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colecoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colecoes.html',
  styleUrl: './colecoes.css'
})
export class Colecoes {
  collections = [
    {
      id: 'londres',
      title: 'LONDRES',
      description: 'A vanguarda britânica e a sofisticação do design autoral com a nobreza da Renda Irlandesa de Sergipe, unindo tradição, elegância e projeção internacional.',
      image: 'https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.34.11.jpg',
      imagePosition: 'left'
    },
    {
      id: 'paris-fashion-week',
      title: 'PRÊT-À-PORTER PARIS',
      description: 'Peças exclusivas apresentadas no Salão do Prêt-à-Porter de Paris, onde a tradição da Renda Irlandesa sergipana encontra a vanguarda e o requinte da moda internacional.',
      image: 'https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.19_2.jpg',
      imagePosition: 'right'
    },
    {
      id: 'befw-2023',
      title: 'Brasil Eco Fashion Week 2023',
      description: 'Brasil Eco Fashion é uma plataforma que promove as boas práticas do mercado e de marcas inseridas na indústria da moda que vem se desenvolvendo com foco nos atributos de sustentabilidade e artesanato de luxo.',
      image: 'https://i.postimg.cc/VL0KfpmW/altair-santo-befw23-011.jpg',
      imagePosition: 'left'
    }
  ];

  constructor(private router: Router) { }

  verColecao(collectionId: string): void {
    this.router.navigate(['/galeria'], { fragment: collectionId });
  }
}
