import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  updateEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Player } from '@store/player/player.store';
import { Round } from '@store/round/round.store';
import { nanoid } from 'nanoid';

export type GameStub = {
  config: GameConfig;
  players: Player[];
};

export type Game = GameStub & {
  id: string;
  history?: Round[];
  startedAt: string;
  finishedAt?: string;
};

export type GameConfig = {
  sets: number;
  legs: number;
  target: number;
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withEntities<Game>(),
  withMethods((store, router = inject(Router)) => ({
    addOne: (game: GameStub) => {
      const id = nanoid();
      const now = new Date().toISOString();
      patchState(store, addEntity({ ...game, id, startedAt: now }));
      router.navigate(['games', id, 0, 0, 0]);
    },
    updateOne: (id: Game['id'], changes: Partial<Game>) => {
      patchState(store, updateEntity({ id, changes }));
    },
    removeOne: (id: Game['id']) => {
      patchState(store, removeEntity(id));
    },
    completeOne: (id: Game['id']) => {
      const now = new Date().toISOString();
      patchState(store, updateEntity({ id, changes: { finishedAt: now } }));
    },
    completeAll: () => {
      const ids = store.ids();
      const now = new Date().toISOString();
      patchState(store, updateEntities({ ids, changes: { finishedAt: now } }));
    },
  })),
);
