import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@store/navigation/navigation.service';
import { PlayerService } from '@store/player/player.service';
import { RoundStore } from './round.store';

@Injectable({ providedIn: 'root' })
export class RoundService {
  router = inject(Router);
  roundStore = inject(RoundStore);
  playerService = inject(PlayerService);
  navigationService = inject(NavigationService);

  addRound(total: number) {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    const leg = this.navigationService.currentLeg();
    const rnd = this.navigationService.currentRnd();
    const player = this.playerService.getCurrentPlayer();
    const playerId = player.id;

    this.roundStore.addOne({ gid, set, leg, rnd, playerId, total });
  }

  goToNextRound() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    const leg = this.navigationService.currentLeg();
    const rnd = this.navigationService.currentRnd();
    this.router.navigate(['games', gid, set, leg, +rnd + 1]);
  }

  goToPreviousRound() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    const leg = this.navigationService.currentLeg();
    const rnd = this.navigationService.currentRnd();
    this.router.navigate(['games', gid, set, leg, +rnd - 1]);
  }
}
