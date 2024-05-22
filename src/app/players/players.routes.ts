import { Routes } from '@angular/router';

export const playerRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./player-new/player-new.component').then(
        (m) => m.PlayerNewComponent,
      ),
  },
  {
    path: ':playerId',
    children: [
      {
        path: 'edit',
        pathMatch: 'full',
        loadComponent: () =>
          import('./player-edit/player-edit.component').then(
            (m) => m.PlayerEditComponent,
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./player/player.page').then((m) => m.PlayerPage),
      },
    ],
  },
  {
    path: '',
    title: 'Players',
    loadComponent: () => import('./players.page').then((m) => m.PlayersPage),
  },
];
