import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PressDirective } from '@directives/press/press.directive';
import { IonicModule, NavController } from '@ionic/angular';
import { Game, GameStore } from '@store/game';

@Component({
  templateUrl: './games.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PressDirective],
})
export class GamesPage {
  router = inject(Router);
  gameStore = inject(GameStore);
  cdr = inject(ChangeDetectorRef);
  navController = inject(NavController);

  onShortPress(game: Game, event: MouseEvent | null) {
    this.gameStore.selected().length > 0
      ? this.onLongPress(game, event)
      : this.router.navigate(['games', game.id]);
  }

  onLongPress(game: Game, event: MouseEvent | null) {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    this.gameStore.toggle(game.id);
    this.cdr.detectChanges();
  }

  onToggleAll(state: boolean) {
    this.gameStore.toggleAll(state);
    this.cdr.detectChanges();
  }

  onToggleAllActive(state: boolean) {
    this.gameStore.toggleAllActive(state);
    this.cdr.detectChanges();
  }

  onToggleAllCompleted(state: boolean) {
    this.gameStore.toggleAllCompleted(state);
    this.cdr.detectChanges();
  }

  onRemoveAll() {
    this.gameStore.removeAll();
    this.cdr.detectChanges();
  }

  onRemoveSelection() {
    this.gameStore.removeSelection();
    this.cdr.detectChanges();
  }

  onCancelSelection() {
    this.gameStore.toggleAll(false);
    this.cdr.detectChanges();
  }
}
