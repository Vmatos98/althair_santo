import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos-section.html',
  styleUrl: './videos-section.css'
})
export class VideosSection {
  @Output() navegarParaVideos = new EventEmitter<void>();

  onNavegarParaVideos(): void {
    this.navegarParaVideos.emit();
  }
}
