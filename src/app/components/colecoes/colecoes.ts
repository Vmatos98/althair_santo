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
      id: 'london-fashion-week',
      title: 'LONDON FASHION WEEK',
      description: 'A vanguarda britânica e a sofisticação do design autoral com a nobreza da Renda Irlandesa de Sergipe, unindo tradição, elegância e projeção internacional.',
      image: 'https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.34.11.jpg',
      imagePosition: 'left'
    },
    {
      id: 'befw-2023',
      title: 'Brasil Eco Fashion Week 2023',
      description: 'Brasil Eco Fashion é uma plataforma que promove as boas práticas do mercado e de marcas inseridas na indústria da moda que vem se desenvolvendo com foco nos atributos de sustentabilidade e artesanato de luxo.',
      image: 'https://i.postimg.cc/VL0KfpmW/altair-santo-befw23-011.jpg',
      imagePosition: 'right'
    },
    {
      id: 'paris-fashion-week',
      title: 'PARIS FASHION WEEK',
      description: 'Peças exclusivas apresentadas durante a Semana de Moda de Paris, onde o design contemporâneo encontra a arte em cada detalhe.',
      image: 'https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.34.37.jpg',
      imagePosition: 'left'
    },
    {
      id: 'milan-fashion-week',
      title: 'MILAN FASHION WEEK',
      description: 'Inspiração italiana em cada linha, combinando a elegância clássica de Milão com inovações em design e técnica artesanal.',
      image: 'https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.35.14.jpg',
      imagePosition: 'right'
    },
    {
      id: 'new-york-fashion-week',
      title: 'NEW YORK FASHION WEEK',
      description: 'A energia pulsante de Nova York traduzida em moda, onde cada peça conta uma história de inovação e sofisticação urbana.',
      image: 'https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.35.02.jpg',
      imagePosition: 'left'
    }
  ];

  constructor(private router: Router) { }

  verColecao(collectionId: string): void {
    this.router.navigate(['/galeria'], { fragment: collectionId });
  }
}
