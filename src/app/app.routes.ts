import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Sobre } from './components/sobre/sobre';
import { Artesas } from './components/artesas/artesas';
import { Colecoes } from './components/colecoes/colecoes';
import { Galeria } from './components/galeria/galeria';
import { Videos } from './components/videos/videos';
import { Contato } from './components/contato/contato';

export const routes: Routes = [
  { path: '', component: Home }, // Página inicial
  { path: 'home', component: Home },
  { path: 'sobre', component: Sobre },
  { path: 'artesas', component: Artesas },
  { path: 'colecoes', component: Colecoes },
  { path: 'galeria', component: Galeria },
  { path: 'videos', component: Videos },
  { path: 'contato', component: Contato },
  { path: '**', redirectTo: '' } // Redireciona qualquer rota não encontrada para home
];
