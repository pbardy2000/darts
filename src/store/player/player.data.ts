import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import { Player } from './player.store';

export const createPlayer = (): Player => ({
  id: nanoid(),
  name: faker.person.firstName(),
});

export const players = faker.helpers.multiple(createPlayer, { count: 10 });
