import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@store/navigation/navigation.service';

@Injectable({ providedIn: 'root' })
export class SetService {
  router = inject(Router);
  navigationService = inject(NavigationService);

  goToNextSet() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    this.router.navigate(['games', gid, +set + 1, 0, 0]);
  }

  goToPreviousSet() {
    const gid = this.navigationService.currentGid();
    const set = this.navigationService.currentSet();
    this.router.navigate(['games', gid, +set + 1, 0, 0]);
  }
}
