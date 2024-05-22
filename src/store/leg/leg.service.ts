import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@store/navigation/navigation.service';

@Injectable({ providedIn: 'root' })
export class LegService {
  router = inject(Router);
  navigationService = inject(NavigationService);

  goToNextLeg() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    const leg = this.navigationService.currentLeg();
    this.router.navigate(['games', gid, set, +leg + 1, 0]);
  }

  goToPreviousLeg() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    const leg = this.navigationService.currentLeg();
    this.router.navigate(['games', gid, set, +leg - 1, 0]);
  }
}
