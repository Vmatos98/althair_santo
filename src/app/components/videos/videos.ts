import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.html',
  styleUrl: './videos.css'
})
export class Videos implements OnInit, AfterViewInit {
  private fragmentToScroll: string | null = null;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  videos = [
    {
      titulo: "Desfiles",
      id: "desfiles",
      links: [
        { titulo: "BEFW 7ª edição - Ecoinovação e Desenvolvimento Sustentável", url: "https://www.youtube.com/embed/D8mP5jpEbLU?si=9N0ETOZQJcAfJrte&amp;start=225" }
      ]
    },
    {
      titulo: "Reportagens",
      id: "reportagens",
      links: [
        { titulo: "Boas histórias - Divina Pastora.", url: "https://www.youtube.com/embed/_gzK4s9jGR4?si=5KSolsgH49Jjdn_N&amp;start=693" }
      ]
    }
  ];

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.fragmentToScroll = fragment;
    });
  }

  ngAfterViewInit(): void {
    if (this.fragmentToScroll) {
      setTimeout(() => {
        const element = document.getElementById(this.fragmentToScroll!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
