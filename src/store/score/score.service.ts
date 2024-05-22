import { Injectable, inject } from '@angular/core';
import { GameStore } from '@store/game/game.store';
import { NavigationService } from '@store/navigation/navigation.service';
import { PlayerService } from '@store/player/player.service';
import { Player } from '@store/player/player.store';
import { RoundStore } from '@store/round/round.store';
import { chain } from 'underscore';
import { checkOuts } from './score.data';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  gameStore = inject(GameStore);
  roundStore = inject(RoundStore);
  playerService = inject(PlayerService);
  navigationService = inject(NavigationService);

  getScores() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    const leg = this.navigationService.currentLeg();
    const rnd = this.navigationService.currentRnd();
    const games = this.gameStore.entityMap();
    const game = games[gid];

    // Get rounds sorted chronologically
    const rounds = chain(this.roundStore.entities())
      .filter((round) => round.gid === gid)
      .sortBy((round) => +new Date(round.createdAt))
      .value();

    // Initialise player stats
    const scores: Record<string, Score> = game.players.reduce(
      (acc, player) => ({
        ...acc,
        [player.id]: {
          sets: 0,
          legs: 0,
          total: game.config.target,
          won: false,
          player,
        },
      }),
      {},
    );

    // Play game from beginning of match
    for (const round of rounds) {
      if (round.set > set) break;
      if (round.set === set && round.leg > leg) break;
      if (round.set === set && round.leg === leg && round.rnd > rnd) break;

      scores[round.playerId].total -= round.total;
      if (scores[round.playerId].total === 0) {
        scores[round.playerId].legs++;
        for (const player in scores) {
          scores[player].total = game.config.target;
        }
      }

      if (scores[round.playerId].legs === game.config.legs) {
        scores[round.playerId].sets++;
      }

      if (scores[round.playerId].sets === game.config.sets) {
        scores[round.playerId].won = true;
      }
    }

    return scores;
  }

  getScoreValidity(score: number): boolean {
    if (score < 0) return false;
    if (score > 180) return false;

    const scores = this.getScores();
    const player = this.playerService.getCurrentPlayer();
    const remaining = scores[player.id].total;
    if (remaining > score) return true;
    if (remaining < score) return false;

    // When remaining === score, ensure its reachable via a valid double
    const checkouts = this.getScoreCheckouts(remaining);
    return checkouts.length > 0;
  }

  getScoreCheckouts(target: number): string[] {
    return checkOuts.get(target) ?? [];
  }
}

export type Score = {
  sets: number;
  legs: number;
  total: number;
  won: boolean;
  player: Player;
};
