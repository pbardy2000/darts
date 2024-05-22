import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@store/navigation/navigation.service';
import { RoundStore } from '@store/round/round.store';
import { GameStore } from './game.store';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  router = inject(Router);
  gameStore = inject(GameStore);
  roundStore = inject(RoundStore);
  navigationService = inject(NavigationService);

  getActiveGames() {
    return this.gameStore
      .entities()
      .filter((game) => game.finishedAt === undefined)
      .sort((a, b) => +new Date(a.startedAt) - +new Date(b.startedAt));
  }

  getFinishedGames() {
    return this.gameStore
      .entities()
      .filter((game) => game.finishedAt !== undefined)
      .sort((a, b) => +new Date(a.finishedAt!) - +new Date(b.finishedAt!));
  }

  finishGame() {
    const gid = this.navigationService.currentGid();
    const rounds = this.roundStore.entities();
    const history = rounds.filter((round) => round.gid === gid);
    this.gameStore.updateOne(gid, { history });
    this.router.navigate(['stats', gid]);
  }
}
