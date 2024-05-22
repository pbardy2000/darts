import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./games/games.routes').then((m) => m.gameRoutes),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./players/players.routes').then((m) => m.playerRoutes),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./statistics/statistics.page').then((m) => m.StatisticsPage),
  },
  {
    path: 'rankings',
    loadComponent: () =>
      import('./statistics/rankings/rankings.page').then((m) => m.RankingsPage),
  },
  {
    path: 'overall',
    loadComponent: () =>
      import('./statistics/overall/overall.page').then((m) => m.OverallPage),
  },
];
