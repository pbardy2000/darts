import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  templateUrl: './rankings.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RankingsPage {}
