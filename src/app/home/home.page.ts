import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  peopleOutline,
  refreshOutline,
  settingsOutline,
  statsChartOutline,
} from 'ionicons/icons';

addIcons({
  addOutline,
  refreshOutline,
  peopleOutline,
  statsChartOutline,
  settingsOutline,
});

@Component({
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    IonList,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    RouterLink,
  ],
})
export class HomePage {}
