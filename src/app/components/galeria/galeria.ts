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

  constructor(private route: ActivatedRoute) {}

  galeria = [
    {
      titulo:"Brasil Eco Fashion Week 2023",
      id:"eco_Fashion_2023",
      imagens: ["https://i.postimg.cc/nVPvx4sP/altair-santo-befw23-001.jpg",
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
                "https://i.postimg.cc/sDG5gM7z/altair-santo-befw23-012.jpg",
                "https://i.postimg.cc/RVJwZWK4/altair-santo-befw23-013.jpg",
                "https://i.postimg.cc/gkL32x8Y/altair-santo-befw23-014.jpg",
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
                "https://i.postimg.cc/MpyR1g9s/altair-santo-befw23-036.jpg",
                "https://i.postimg.cc/T3rmnBt7/altair-santo-befw23-037.jpg",
                "https://i.postimg.cc/qv8n2W1Y/altair-santo-befw23-038.jpg",
                "https://i.postimg.cc/fRxXY181/altair-santo-befw23-039.jpg",
                "https://i.postimg.cc/Xv45LxPx/altair-santo-befw23-040.jpg",
                "https://i.postimg.cc/tgp6kDc2/altair-santo-befw23-041.jpg",
                "https://i.postimg.cc/Zq4NHjQw/altair-santo-befw23-042.jpg",
                "https://i.postimg.cc/W4TZ8Sy9/altair-santo-befw23-043.jpg",
                "https://i.postimg.cc/g0mhs47Q/altair-santo-befw23-044.jpg",
                "https://i.postimg.cc/FKNSpG66/altair-santo-befw23-045.jpg"
                ]
    }
  ]

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
