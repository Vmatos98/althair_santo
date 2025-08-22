import { Component, HostListener, Inject, PLATFORM_ID, Renderer2, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Hero } from './components/hero/hero';
import { SobreSection } from './components/sobre-section/sobre-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navigation, Hero, SobreSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  isMobileMenuOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {}

  navegarParaSobre(): void {
    this.router.navigate(['/sobre']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const heroSection = this.el.nativeElement.querySelector('#home');
      console.log('Elemento encontrado:', heroSection); // Debug

      if (heroSection) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        let opacity = 1 - (scrollPosition / (windowHeight * 0.8));
        opacity = Math.max(0, opacity);

        // Usar setProperty como no exemplo original
        heroSection.style.setProperty('--hero-bg-opacity', opacity.toString());

        // Aplicar também como atributo de dados para garantir
        this.renderer.setAttribute(heroSection, 'data-opacity', opacity.toString());

        // Log para debug (remover depois)
        console.log('Scroll:', scrollPosition, 'Opacity:', opacity);
        console.log('CSS aplicado:', heroSection.style.getPropertyValue('--hero-bg-opacity'));
        console.log('Data attribute:', heroSection.getAttribute('data-opacity'));
      } else {
        console.log('Elemento #home não encontrado!');
      }
    }
  }
}
