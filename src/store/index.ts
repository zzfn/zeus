import { Models, init, RematchDispatch, RematchRootState } from '@rematch/core';
import { count } from './count';
import { user } from './user';
import { menu } from './menu';

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  user: typeof user;
  menu: typeof menu;
}

const models: RootModel = { count, user, menu };

export const store = init({
  models,
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
