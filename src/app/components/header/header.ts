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
    if (this.isOnHomePage) {
      // Se estamos na página inicial, fazer scroll suave para a seção
      this.smoothScrollToSection(item.sectionId);
    } else {
      // Se estamos em outra página, navegar para a página de destino
      this.router.navigate([item.href]);
    }
    this.closeMobileMenu();
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
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
