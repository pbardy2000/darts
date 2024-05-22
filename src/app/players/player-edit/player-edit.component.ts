import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Player, PlayerStore } from '@store/player/player.store';
import { TypedForm } from '@types';

@Component({
  templateUrl: './player-edit.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class PlayerEditComponent {
  fb = inject(FormBuilder);
  store = inject(PlayerStore);

  form = this.fb.nonNullable.group<TypedForm<Omit<Player, 'id'>>>({
    name: this.fb.nonNullable.control(this.store.getPlayerFromRoute().name),
  });
}
