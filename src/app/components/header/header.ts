import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isMobileMenuOpen = false;
  isOnHomePage = false;

  menuItems = [
    { href: '/sobre', label: 'Sobre', sectionId: 'sobre' },
    { href: '/colecoes', label: 'Coleções', sectionId: 'colecoes' },
    { href: '/artesas', label: 'Artesãs', sectionId: 'artesas' },
    { href: '/galeria', label: 'Galeria', sectionId: 'galeria' },
    { href: '/videos', label: 'Vídeos', sectionId: 'videos' },
    { href: '/noticias', label: 'Notícias', sectionId: 'noticias' },
    { href: '/contato', label: 'Contato', sectionId: 'contato', isButton: true }
  ];

  constructor(private router: Router) {
    // Detectar mudanças de rota para saber se estamos na página inicial
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOnHomePage = event.url === '/' || event.url === '/home';
      });

    // Verificar rota inicial
    this.isOnHomePage = this.router.url === '/' || this.router.url === '/home';
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateToPage(item: any): void {
    if (this.isOnHomePage && item.sectionId) {
      const targetElement = document.getElementById(item.sectionId);
      if (targetElement) {
        this.smoothScrollToSection(item.sectionId);
        this.closeMobileMenu();
        return;
      }
    }

    // Se não há elemento com id correspondente na página ou se estamos em outra rota, navega para a página
    this.router.navigate([item.href]).then(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    this.closeMobileMenu();
  }

  navigateToHome(): void {
    if (this.isOnHomePage) {
      this.smoothScrollToSection('home');
    } else {
      this.router.navigate(['/']).then(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
    this.closeMobileMenu();
  }

  smoothScrollToSection(sectionId: string): void {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
