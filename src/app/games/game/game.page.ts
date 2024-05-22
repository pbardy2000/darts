import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { KeyboardComponent } from '@components/keyboard/keyboard.component';
import { ScoringComponent } from '@components/scoring/scoring.component';
import { AlertController, IonicModule } from '@ionic/angular';
import { GameService } from '@store/game/game.service';
import { LegService } from '@store/leg/leg.service';
import { PlayerService } from '@store/player/player.service';
import { RoundService } from '@store/round/round.service';
import { ScoreService } from '@store/score/score.service';
import { SetService } from '@store/set/set.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScoringComponent,
    KeyboardComponent,
  ],
})
export class GamePage {
  router = inject(Router);
  gameService = inject(GameService);
  setService = inject(SetService);
  legService = inject(LegService);
  roundService = inject(RoundService);
  scoreService = inject(ScoreService);
  playerService = inject(PlayerService);
  alertController = inject(AlertController);

  addScore(total: number) {
    const scoresA = this.scoreService.getScores();
    const player = this.playerService.getCurrentPlayer();
    const scoreA = scoresA[player.id];

    this.roundService.addRound(total);

    const scoresB = this.scoreService.getScores();
    const scoreB = scoresB[player.id];

    // Game won
    if (scoreB.won) {
      this.gameService.finishGame();
      return;
    }

    // Set won
    if (scoreB.sets > scoreA.sets) {
      this.setService.goToNextSet();
      return;
    }

    // Leg won
    if (scoreB.legs > scoreA.legs) {
      this.legService.goToNextLeg();
      return;
    }

    this.roundService.goToNextRound();
  }

  async onConfirm(total: number) {
    // Score is valid so continue to add score
    if (this.scoreService.getScoreValidity(total)) {
      this.addScore(total);
      return;
    }

    // Score is invalid, show warning to indicate this
    const alert = await this.alertController.create({
      header: 'Invalid',
      message: `The score ${total} is invalid`,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
