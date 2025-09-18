import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-colecoes-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colecoes-section.html',
  styleUrl: './colecoes-section.css'
})
export class ColecoesSection {
  @Output() navegarParaColecoes = new EventEmitter<void>();

  sobreData = {
    title: 'A Alma do Design Autoral',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    description2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

  onNavegarParaColecoes(): void {
    this.navegarParaColecoes.emit();
  }
}
