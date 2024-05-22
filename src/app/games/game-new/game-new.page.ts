import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { GameConfig, GameStore } from '@store/game/game.store';
import { Player, PlayerStore } from '@store/player/player.store';
import { TypedForm } from '@types';
import { difference } from 'underscore';

@Component({
  templateUrl: './game-new.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class GameNewPage {
  fb = inject(FormBuilder);
  gameStore = inject(GameStore);
  playerStore = inject(PlayerStore);
  actionSheet = inject(ActionSheetController);

  form = this.fb.nonNullable.group({
    config: this.fb.nonNullable.group<TypedForm<GameConfig>>({
      sets: this.fb.nonNullable.control(1),
      legs: this.fb.nonNullable.control(1),
      target: this.fb.nonNullable.control(301),
    }),
    players: this.fb.nonNullable.array<Player>([]),
  });

  formValue = toSignal(this.form.valueChanges);

  get players() {
    return this.form.controls.players;
  }

  async onAddPlayer() {
    const all = this.playerStore.entities();
    const added = this.players.value;
    const available = difference(all, added);
    const buttons = available.map((player) => ({
      text: player.name,
      data: player,
    }));

    const actionSheet = await this.actionSheet.create({
      header: 'Add Player',
      buttons,
    });

    await actionSheet.present();

    const action = await actionSheet.onDidDismiss();
    if (action.data) {
      this.players.push(this.fb.nonNullable.control<Player>(action.data));
    }
  }

  onConfirm() {
    this.gameStore.addOne(this.form.getRawValue());
  }

  onRemove(player: Player) {
    this.players.removeAt(this.players.value.indexOf(player));
  }
}
