import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-section.html',
  styleUrl: './galeria-section.css'
})
export class GaleriaSection {
  @Output() navegarParagaleria = new EventEmitter<void>();

  galeriaData = {
    title: 'Galeria',
    description: 'Explore os momentos marcantes e os detalhes das coleções de Althair Santo',
    features: [
      {
        image: 'https://i.postimg.cc/MpR3D4Lp/altair-santo-befw23-001.jpg',
        id: 'befw23_001',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/TYBHnGCs/altair-santo-befw23-002.jpg',
        id: 'befw23_002',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/rynHF5WM/altair-santo-befw23-003.jpg',
        id: 'befw23_003',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/J4s2ytcJ/altair-santo-befw23-004.jpg',
        id: 'befw23_004',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/TP67H08q/altair-santo-befw23-005.jpg',
        id: 'befw23_005',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/jj4gVftV/altair-santo-befw23-006.jpg',
        id: 'befw23_006',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/XJN2nvYr/altair-santo-befw23-007.jpg',
        id: 'befw23_007',
        categoria:'befw23'
      },
      {
        image: 'https://i.postimg.cc/vBP0Td43/altair-santo-befw23-008.jpg',
        id: 'befw23_008',
        categoria:'befw23'
      }
    ]
  };

  onNavegarParagaleria(): void {
    this.navegarParagaleria.emit();
  }
}
