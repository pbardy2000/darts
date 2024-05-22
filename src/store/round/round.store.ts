import { patchState, signalStore, withMethods } from '@ngrx/signals';
import {
  addEntity,
  removeEntities,
  removeEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { nanoid } from 'nanoid';

export type RoundStub = {
  total: number;
  rnd: number;
  leg: number;
  set: number;
  gid: string;
  playerId: string;
};

export type Round = RoundStub & {
  id: string;
  createdAt: string;
};

export const RoundStore = signalStore(
  { providedIn: 'root' },
  withEntities<Round>(),
  withMethods((store) => ({
    addOne: (round: RoundStub) => {
      const id = nanoid();
      const now = new Date().toISOString();
      patchState(store, addEntity({ ...round, id, createdAt: now }));
    },
    removeRound: (id: Round['id']) => {
      patchState(store, removeEntity(id));
    },
    removeLeg: (id: Round['leg']) => {
      const entities = store.entities();
      const rounds = entities.filter((round) => round.leg === id);
      const roundIds = rounds.map((round) => round.id);
      patchState(store, removeEntities(roundIds));
    },
    removeSet: (id: Round['set']) => {
      const entities = store.entities();
      const rounds = entities.filter((round) => round.set === id);
      const roundIds = rounds.map((round) => round.id);
      patchState(store, removeEntities(roundIds));
    },
    removeGame: (gid: Round['gid']) => {
      const entities = store.entities();
      const rounds = entities.filter((round) => round.gid === gid);
      const roundIds = rounds.map((round) => round.id);
      patchState(store, removeEntities(roundIds));
    },
  })),
);
