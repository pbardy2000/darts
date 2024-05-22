import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlayerStore } from '@store/player/player.store';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

addIcons({ addOutline });

@Component({
  templateUrl: './players.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class PlayersPage {
  store = inject(PlayerStore);
}
