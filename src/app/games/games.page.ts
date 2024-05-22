import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonSegmentCustomEvent, SegmentChangeEventDetail } from '@ionic/core';
import { GameService } from '@store/game/game.service';
import { SwiperContainer, register } from 'swiper/element/bundle';

register();

@Component({
  templateUrl: './games.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class GamesPage {
  gameService = inject(GameService);
  swiper = viewChild<ElementRef<SwiperContainer>>('swiper');
  segments = ['Active', 'Finished'];

  onSegmentChange(event: IonSegmentCustomEvent<SegmentChangeEventDetail>) {
    const value = event.target.value!.toString();
    const index = this.segments.indexOf(value);
    this.swiper()?.nativeElement.swiper.slideTo(index);
  }
}
