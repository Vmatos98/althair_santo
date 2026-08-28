import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css'
})
export class Galeria implements OnInit, AfterViewInit {
  private fragmentToScroll: string | null = null;

  constructor(private route: ActivatedRoute) { }

  galeria = [
    {
      titulo: "Londres",
      id: "londres",
      imagens: [
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.34.11.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.34.37.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.34.47.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.35.02.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.35.14.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.36.21.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.36.22.jpg"
      ]
    },
    {
      titulo: "Prêt-à-Porter Paris – Coleção Paris",
      id: "paris-fashion-week",
      imagens: [
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.19_2.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.19_1.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.19.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.18_2.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.18_1.jpg",
        "https://res.cloudinary.com/xbovcgmp/image/upload/WhatsApp_Image_2026-08-26_at_17.46.18.jpg"
      ]
    },
    {
      titulo: "Brasil Eco Fashion Week 2023",
      id: "befw-2023",
      imagens: [
        "https://i.postimg.cc/MZFyw7c3/altair-santo-befw23-002.jpg",
        "https://i.postimg.cc/59RwJBHP/altair-santo-befw23-003.jpg",
        "https://i.postimg.cc/SQvW46Xt/altair-santo-befw23-004.jpg",
        "https://i.postimg.cc/wTRDj1J0/altair-santo-befw23-005.jpg",
        "https://i.postimg.cc/SNYcxn8g/altair-santo-befw23-006.jpg",
        "https://i.postimg.cc/654Cp8Rm/altair-santo-befw23-007.jpg",
        "https://i.postimg.cc/3J02xkpf/altair-santo-befw23-008.jpg",
        "https://i.postimg.cc/8PfLz7W3/altair-santo-befw23-009.jpg",
        "https://i.postimg.cc/7YJSZ50v/altair-santo-befw23-010.jpg",
        "https://i.postimg.cc/QxKcdF1s/altair-santo-befw23-011.jpg",
        "https://i.postimg.cc/8PfLz7MP/altair-santo-befw23-015.jpg",
        "https://i.postimg.cc/0ygDM90g/altair-santo-befw23-016.jpg",
        "https://i.postimg.cc/CxykBwsT/altair-santo-befw23-017.jpg",
        "https://i.postimg.cc/7Zv0GqnD/altair-santo-befw23-018.jpg",
        "https://i.postimg.cc/rw6x0qNM/altair-santo-befw23-019.jpg",
        "https://i.postimg.cc/9Q3ZRcYW/altair-santo-befw23-020.jpg",
        "https://i.postimg.cc/2SphbC78/altair-santo-befw23-021.jpg",
        "https://i.postimg.cc/zGmKbqFG/altair-santo-befw23-022.jpg",
        "https://i.postimg.cc/Gm0G8bx2/altair-santo-befw23-023.jpg",
        "https://i.postimg.cc/6psn2BfT/altair-santo-befw23-024.jpg",
        "https://i.postimg.cc/HkGXcT98/altair-santo-befw23-025.jpg",
        "https://i.postimg.cc/BnWHLJB1/altair-santo-befw23-026.jpg",
        "https://i.postimg.cc/Sx0C2mf9/altair-santo-befw23-027.jpg",
        "https://i.postimg.cc/zGmKbqFW/altair-santo-befw23-028.jpg",
        "https://i.postimg.cc/Qdp5cvfH/altair-santo-befw23-029.jpg",
        "https://i.postimg.cc/13xwnyrG/altair-santo-befw23-030.jpg",
        "https://i.postimg.cc/qv8n2W1N/altair-santo-befw23-031.jpg",
        "https://i.postimg.cc/Dwqs1RxJ/altair-santo-befw23-032.jpg",
        "https://i.postimg.cc/CxjDb9cb/altair-santo-befw23-033.jpg",
        "https://i.postimg.cc/Dwqs1Rxg/altair-santo-befw23-034.jpg",
        "https://i.postimg.cc/CxjDb9cm/altair-santo-befw23-035.jpg",
        "https://i.postimg.cc/fRxXY181/altair-santo-befw23-039.jpg",
        "https://i.postimg.cc/Xv45LxPx/altair-santo-befw23-040.jpg"
      ]
    }
  ];

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.fragmentToScroll = fragment;
      if (fragment) {
        setTimeout(() => this.scrollToFragment(fragment), 200);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.fragmentToScroll) {
      setTimeout(() => {
        this.scrollToFragment(this.fragmentToScroll!);
      }, 300);
    }
  }

  private scrollToFragment(fragment: string): void {
    // Suporte a alias se necessário (ex: london-fashion-week -> londres)
    const targetId = fragment === 'london-fashion-week' ? 'londres' : fragment;
    const element = document.getElementById(targetId) || document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
