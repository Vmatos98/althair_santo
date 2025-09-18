import { Component, HostListener, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  heroData = {
    title: 'ALTHAIR SANTO',
    subtitle: 'Estilismo que transcende tendências, criando moda atemporal'
  };

  videoOpacity = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const heroSection = this.el.nativeElement.querySelector('.hero-section');
      if (heroSection) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        let opacity = 1 - (scrollPosition / (windowHeight * 0.8));
        opacity = Math.max(0, opacity);
        this.videoOpacity = opacity;
      }
    }
  }
}
