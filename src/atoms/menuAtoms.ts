import { atom } from 'jotai';

export type MenuAtoms = {
  id: string;
  username: string;
  isAdmin: boolean;
};
export const menuAtom = atom<MenuAtoms[]>([]);
