import { Component, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;

  heroData = {
    title: 'ALTHAIR SANTO',
    subtitle: 'Estilismo que transcende tendências, criando moda atemporal'
  };

  videoOpacity = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.videoPlayerRef) {
      const video = this.videoPlayerRef.nativeElement;
      video.muted = true;
      video.playsInline = true;
      video.defaultMuted = true;
      
      const playVideo = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            video.muted = true;
            setTimeout(() => video.play().catch(() => {}), 300);
          });
        }
      };

      playVideo();

      // Caso a página tenha atraso no carregamento inicial devido à splash screen
      setTimeout(playVideo, 1000);
      setTimeout(playVideo, 2600);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      let opacity = 1 - (scrollPosition / (windowHeight * 0.8));
      opacity = Math.max(0, opacity);
      this.videoOpacity = opacity;
    }
  }
}
