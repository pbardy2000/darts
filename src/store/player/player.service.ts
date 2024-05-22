import { Injectable, inject } from '@angular/core';
import { GameStore } from '@store/game/game.store';
import { NavigationService } from '@store/navigation/navigation.service';
import { Player } from './player.store';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  gameStore = inject(GameStore);
  navigationService = inject(NavigationService);

  getCurrentPlayer(): Player {
    const gid = this.navigationService.currentGid();
    const rnd = this.navigationService.currentRnd();
    const games = this.gameStore.entityMap();
    const game = games[gid];
    const players = game.players;
    return game.players[+rnd % players.length];
  }

  getIsCurrentPlayer(playerId: Player['id']): boolean {
    return this.getCurrentPlayer().id === playerId;
  }
}
