import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlayerService } from '@store/player/player.service';
import { ScoreService } from '@store/score/score.service';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

addIcons({ chevronForwardOutline });

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  standalone: true,
  imports: [IonicModule, KeyValuePipe],
})
export class ScoringComponent {
  scoreService = inject(ScoreService);
  playerService = inject(PlayerService);
}
