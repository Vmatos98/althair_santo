import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-intro-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-splash.html',
  styleUrl: './intro-splash.css'
})
export class IntroSplash implements OnInit, OnDestroy {
  @Output() introFinished = new EventEmitter<void>();

  isVisible = true;
  isFadingOut = false;
  private fadeTimer: any;
  private removeTimer: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Exibe a logo em destaque por 2.2 segundos
      this.fadeTimer = setTimeout(() => {
        this.startFadeOut();
      }, 2200);
    }
  }

  startFadeOut(): void {
    if (this.isFadingOut) return;
    // 2. Inicia o fade-out suave de 1.2s via classe CSS
    this.isFadingOut = true;
    this.cdr.detectChanges();

    // 3. Remove completamente do DOM após os 1.2s de fade-out
    this.removeTimer = setTimeout(() => {
      this.finishAndRemove();
    }, 1300);
  }

  onTransitionEnd(event: TransitionEvent): void {
    // Quando a transição de opacidade termina
    if (event.propertyName === 'opacity' && this.isFadingOut) {
      this.finishAndRemove();
    }
  }

  private finishAndRemove(): void {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.introFinished.emit();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.fadeTimer) clearTimeout(this.fadeTimer);
    if (this.removeTimer) clearTimeout(this.removeTimer);
  }
}
