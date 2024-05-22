import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getRouterSelectors } from '@ngrx/router-store';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeEntities,
  removeEntity,
  setEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Store } from '@ngrx/store';
import { players } from './player.data';

const { selectRouteParam } = getRouterSelectors();

export type Player = {
  id: string;
  name: string;
};

export const PlayerStore = signalStore(
  { providedIn: 'root' },
  withEntities<Player>(),
  withComputed((store, routeStore = inject(Store)) => ({
    getPlayerFromRoute: computed(() => {
      const players = store.entityMap();
      const playerId = routeStore.selectSignal(selectRouteParam('playerId'))();
      return players[playerId!];
    }),
  })),
  withMethods((store, router = inject(Router)) => ({
    addOne: (player: Player) => {
      patchState(store, addEntity(player));
      router.navigate(['players']);
    },
    addMany: (players: Player[]) => {
      patchState(store, addEntities(players));
      router.navigate(['players']);
    },
    updateOne: (id: Player['id'], changes: Partial<Player>) => {
      patchState(store, updateEntity({ id, changes }));
      router.navigate(['players']);
    },
    removeOne: (id: Player['id']) => {
      patchState(store, removeEntity(id));
    },
    removeAll: () => {
      patchState(store, removeEntities(store.ids()));
    },
    removeMany: (ids: Player['id'][]) => {
      patchState(store, removeEntities(ids));
    },
    seed: () => {
      patchState(store, setEntities(players));
    },
  })),
  withHooks({
    onInit: (store) => {
      store.seed();
    },
  }),
);
