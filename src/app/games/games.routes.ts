import { Routes } from '@angular/router';
import { gameExists } from '@store/game/game.guards';

export const gameRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Games',
    loadComponent: () => import('./games.page').then((m) => m.GamesPage),
  },
  {
    path: 'new',
    title: 'New Game',
    loadComponent: () =>
      import('./game-new/game-new.page').then((m) => m.GameNewPage),
  },
  {
    path: ':gid/:set/:leg/:rnd',
    canActivate: [gameExists],
    loadComponent: () => import('./game/game.page').then((m) => m.GamePage),
  },
];
