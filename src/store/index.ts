import {Models, init, RematchDispatch, RematchRootState} from '@rematch/core';
import {count} from './count';
import {user} from './user';

export interface RootModel extends Models<RootModel> {
    count: typeof count;
    user: typeof user;
}

const models: RootModel = {count, user};

export const store = init({
    models,
});
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
