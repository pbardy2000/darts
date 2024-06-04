import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  EntityId,
  addEntity,
  removeAllEntities,
  removeEntities,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Round } from '@store/round';
import { nanoid } from 'nanoid';
import { chain, values } from 'underscore';
import { Game, GameState, GameStub } from './game.models';

const setTitle = (game: Game): Game => {
  game.title = values(game.players)
    .map((player) => player.name)
    .join(' vs ');

  return game;
};

const factory = (overrides: Partial<Game> = {}): Game => {
  const game = {
    id: nanoid(),
    title: '',
    config: { sets: 1, legs: 1, target: 301 },
    players: {},
    history: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: undefined,
    ...overrides,
  };

  setTitle(game);

  return game;
};

const gameInitialState: GameState = {
  filter: '',
  selected: [],
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withEntities<Game>(),
  withState(gameInitialState),
  withComputed((store) => ({
    filtered: computed(() =>
      chain(store.entities())
        .filter((game) => game.title.toLowerCase().includes(store.filter()))
        .value(),
    ),
    active: computed(() =>
      chain(store.entities())
        .filter((game) => game.title.toLowerCase().includes(store.filter()))
        .filter((game) => game.completedAt == null)
        .value(),
    ),
    completed: computed(() =>
      chain(store.entities())
        .filter((game) => game.title.toLowerCase().includes(store.filter()))
        .filter((game) => game.completedAt != null)
        .value(),
    ),
  })),
  withMethods((s) => ({
    addOne(stub: GameStub) {
      const game = factory(stub);
      patchState(s, addEntity(game));
      return game;
    },
    removeOne(id: EntityId) {
      patchState(s, removeEntity(id));
    },
    removeAll() {
      patchState(s, removeAllEntities());
    },
    complete: (id: EntityId, history: Round[]) => {
      const completedAt = new Date().toISOString();
      patchState(s, updateEntity({ id, changes: { history, completedAt } }));
    },
    removeSelection() {
      patchState(s, removeEntities(s.selected()));
      patchState(s, { selected: [] });
    },
    search(filter: string) {
      patchState(s, { filter });
    },
    toggle(id: EntityId) {
      const selected = s.selected();
      const index = selected.indexOf(id);
      index > -1 ? selected.splice(index, 1) : selected.push(id);
      patchState(s, { selected });
    },
    toggleAll(state: boolean) {
      patchState(s, { selected: state ? s.ids() : [] });
    },
    toggleAllActive(state: boolean) {
      const ids = s
        .entities()
        .filter((entity) => entity.completedAt == null)
        .map((entity) => entity.id);

      patchState(s, { selected: state ? ids : [] });
    },
    toggleAllCompleted(state: boolean) {
      const ids = s
        .entities()
        .filter((entity) => entity.completedAt != null)
        .map((entity) => entity.id);

      patchState(s, { selected: state ? ids : [] });
    },
  })),
);
