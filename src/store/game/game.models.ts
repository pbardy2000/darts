import { EntityId } from '@ngrx/signals/entities';
import { Player } from '@store/player/player.models';
import { Round } from '@store/round';

export type GameConfig = {
  sets: number;
  legs: number;
  target: number;
};

export type GameStub = {
  config: GameConfig;
  players: Record<EntityId, Player>;
};

export type Game = GameStub & {
  id: EntityId;
  title: string;
  completedAt?: string;
  history: Round[];
  createdAt: string;
  updatedAt: string;
};

export type GameState = {
  filter: string;
  selected: string[];
};
