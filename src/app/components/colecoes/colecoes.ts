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
      id: 'met-gala-2024',
      title: 'Desfile 2023',
      description: 'Coleção inspirada no tema "Sleeping Beauties: Reawakening Fashion" do Met Gala, explorando a interseção entre tecnologia e tradição têxtil.',
      image: 'https://i.postimg.cc/VL0KfpmW/altair-santo-befw23-011.jpg',
      imagePosition: 'left'
    },
    {
      id: 'paris-fashion-week',
      title: 'PARIS FASHION WEEK',
      description: 'Peças exclusivas apresentadas durante a Semana de Moda de Paris, onde a alta costura encontra a arte contemporânea em cada detalhe.',
      image: 'https://i.postimg.cc/DZzctYxs/altair-santo-befw23-016.jpg',
      imagePosition: 'right'
    },
    {
      id: 'milan-fashion-week',
      title: 'MILAN FASHION WEEK',
      description: 'Inspiração italiana em cada linha, combinando a elegância clássica de Milão com inovações em design e técnica artesanal.',
      image: 'https://i.postimg.cc/TP67H08q/altair-santo-befw23-005.jpg',
      imagePosition: 'left'
    },
    {
      id: 'london-fashion-week',
      title: 'LONDON FASHION WEEK',
      description: 'A vanguarda britânica em sua forma mais pura, onde tradição e rebeldia se encontram em peças únicas e atemporais.',
      image: 'https://i.postimg.cc/W45yFZKG/altair-santo-befw23-026.jpg',
      imagePosition: 'right'
    },
    {
      id: 'new-york-fashion-week',
      title: 'NEW YORK FASHION WEEK',
      description: 'A energia pulsante de Nova York traduzida em moda, onde cada peça conta uma história de inovação e sofisticação urbana.',
      image: 'https://i.postimg.cc/tg4SjTTY/altair-santo-befw23-035.jpg',
      imagePosition: 'left'
    },
    {
      id: 'tokyo-fashion-week',
      title: 'TOKYO FASHION WEEK',
      description: 'A estética minimalista japonesa reimaginada através da renda, criando peças que celebram a beleza da simplicidade e do artesanato.',
      image: 'https://i.postimg.cc/QNH276jH/altair-santo-befw23-020.jpg',
      imagePosition: 'right'
    }
  ];

  constructor(private router: Router) {}

  verColecao(collectionId: string): void {
    // Aqui você pode implementar a lógica para mostrar detalhes da coleção
    console.log('Ver coleção:', collectionId);
    // Por exemplo: this.router.navigate(['/colecao', collectionId]);
  }
}
