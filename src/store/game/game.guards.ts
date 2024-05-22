import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameStore } from './game.store';

export const gameExists: CanActivateFn = (route) => {
  const router = inject(Router);
  const gameStore = inject(GameStore);
  const games = gameStore.entityMap();
  const gid = route.paramMap.get('gid')!;
  const game = games[gid];

  // Game doesn't exist in state, so go back to home
  if (game === undefined) {
    router.navigate(['home']);
    return false;
  }

  return true;
};
