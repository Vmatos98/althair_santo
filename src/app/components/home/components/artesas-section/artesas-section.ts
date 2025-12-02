import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artesas-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artesas-section.html',
  styleUrl: './artesas-section.css'
})
export class ArtesasSection {
  @Output() navegarParaArtesas = new EventEmitter<void>();

  onNavegarParaArtesas(): void {
    this.navegarParaArtesas.emit();
  }
}
