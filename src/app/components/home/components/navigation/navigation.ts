import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class Navigation {
  @Input() isMobileMenuOpen = false;
  @Output() toggleMobileMenu = new EventEmitter<void>();
  @Output() closeMobileMenu = new EventEmitter<void>();

  menuItems = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#colecoes', label: 'Coleções' },
    { href: '#artesas', label: 'Artesãs' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#videos', label: 'Vídeos' },
    { href: '#contato', label: 'Contato', isButton: true }
  ];

  onToggleMobileMenu(): void {
    this.toggleMobileMenu.emit();
  }

  onCloseMobileMenu(): void {
    this.closeMobileMenu.emit();
  }

  smoothScrollTo(href: string): void {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
