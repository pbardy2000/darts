import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRouteNestedParam } from './navigation.selectors';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  store = inject(Store);

  currentGid = this.store.selectSignal(selectRouteNestedParam('gid'));
  currentSet = this.store.selectSignal(selectRouteNestedParam('set'));
  currentLeg = this.store.selectSignal(selectRouteNestedParam('leg'));
  currentRnd = this.store.selectSignal(selectRouteNestedParam('rnd'));
}
