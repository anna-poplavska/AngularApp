import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Article } from './pages/article/article';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'article/:id', component: Article },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
