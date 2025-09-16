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
      title: 'MET GALA 2024',
      description: 'Coleção inspirada no tema "Sleeping Beauties: Reawakening Fashion" do Met Gala, explorando a interseção entre tecnologia e tradição têxtil.',
      image: 'https://images.unsplash.com/photo-1594736797933-d0b9c7c8c8c8?w=600&h=800&fit=crop&crop=center',
      imagePosition: 'left'
    },
    {
      id: 'paris-fashion-week',
      title: 'PARIS FASHION WEEK',
      description: 'Peças exclusivas apresentadas durante a Semana de Moda de Paris, onde a alta costura encontra a arte contemporânea em cada detalhe.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=800&fit=crop&crop=center',
      imagePosition: 'right'
    },
    {
      id: 'milan-fashion-week',
      title: 'MILAN FASHION WEEK',
      description: 'Inspiração italiana em cada linha, combinando a elegância clássica de Milão com inovações em design e técnica artesanal.',
      image: 'https://images.unsplash.com/photo-1571513722275-4b8c4e6c4e6c?w=600&h=800&fit=crop&crop=center',
      imagePosition: 'left'
    },
    {
      id: 'london-fashion-week',
      title: 'LONDON FASHION WEEK',
      description: 'A vanguarda britânica em sua forma mais pura, onde tradição e rebeldia se encontram em peças únicas e atemporais.',
      image: 'https://images.unsplash.com/photo-1566479179817-c0d9d6d6d6d6?w=600&h=800&fit=crop&crop=center',
      imagePosition: 'right'
    },
    {
      id: 'new-york-fashion-week',
      title: 'NEW YORK FASHION WEEK',
      description: 'A energia pulsante de Nova York traduzida em moda, onde cada peça conta uma história de inovação e sofisticação urbana.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop&crop=center',
      imagePosition: 'left'
    },
    {
      id: 'tokyo-fashion-week',
      title: 'TOKYO FASHION WEEK',
      description: 'A estética minimalista japonesa reimaginada através da renda, criando peças que celebram a beleza da simplicidade e do artesanato.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&crop=center',
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
