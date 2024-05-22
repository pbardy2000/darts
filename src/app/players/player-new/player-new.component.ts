import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Player, PlayerStore } from '@store/player/player.store';
import { TypedForm } from '@types';
import { nanoid } from 'nanoid';

@Component({
  templateUrl: './player-new.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class PlayerNewComponent {
  fb = inject(FormBuilder);
  store = inject(PlayerStore);
  router = inject(Router);

  form = this.fb.nonNullable.group<TypedForm<Player>>({
    id: this.fb.nonNullable.control(nanoid()),
    name: this.fb.nonNullable.control(''),
  });
}
