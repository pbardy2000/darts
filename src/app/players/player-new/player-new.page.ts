import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { PlayerStore } from '@store/player';

@Component({
  templateUrl: './player-new.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class PlayerNewPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  playerStore = inject(PlayerStore);
  navController = inject(NavController);

  form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.playerStore.addOne(this.form.getRawValue());
      this.router.navigate(['players']);
    }
  }
}
