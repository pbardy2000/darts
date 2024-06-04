import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { KeyboardComponent } from '@components/keyboard/keyboard.component';
import { ScoresComponent } from '@components/scores/scores.component';
import {
  AlertController,
  IonPopover,
  IonicModule,
  NavController,
} from '@ionic/angular';
import { GameService } from '@store/game';
import { RoundService } from '@store/round/round.service';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline, refreshOutline } from 'ionicons/icons';

addIcons({ ellipsisVerticalOutline, refreshOutline });

@Component({
  templateUrl: './game.page.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScoresComponent,
    KeyboardComponent,
  ],
})
export class GamePage {
  router = inject(Router);
  gameService = inject(GameService);
  roundService = inject(RoundService);
  navController = inject(NavController);
  alertController = inject(AlertController);
  cdr = inject(ChangeDetectorRef);

  popover = viewChild<IonPopover>('popover');

  async onUndo() {
    const round = this.gameService.round();
    if (!round || this.roundService.getIsFirstRound(round)) return;

    this.roundService.removeRound(round.id);
  }

  async onCancel() {
    const game = this.gameService.game();

    // Show are you sure alert
    if (game) {
      const alert = await this.alertController.create({
        header: 'Cancel game?',
        message: `Are you sure you want to cancel this game? Any scores will be permanently 
        lost and will not contribute to statistics`,
        buttons: [
          { text: 'DISMISS', role: 'cancel' },
          {
            text: 'CONFIRM',
            role: 'destructive',
            handler: () => {
              this.gameService.cancel(game);
              this.router.navigate(['home']);
              this.popover()?.dismiss();
            },
          },
        ],
      });

      await alert.present();
    }
  }

  async onConfirm(score: number) {
    const game = this.gameService.game();
    const round = this.gameService.round();
    const player = this.gameService.player();

    if (game && round && player) {
      if (this.roundService.getScoreValidity(round, player, score)) {
        const x = this.roundService.createRound(game, round, player, score);
        this.cdr.detectChanges();

        if (x === null) {
          // Game won
          const alert = await this.alertController.create({
            header: `${player.name} wins`,
            buttons: ['CONTINUE'],
          });

          await alert.present();
          await alert.onDidDismiss();

          this.gameService.complete(game);
          this.router.navigate(['games', game.id, 'stats']);
        }

        return;
      }

      // Score is invalid, show warning to indicate this
      const alert = await this.alertController.create({
        header: 'Invalid',
        message: `The score ${score} is invalid`,
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
