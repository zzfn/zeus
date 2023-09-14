import { atom } from 'jotai';

export type UserAtoms = {
  id: string;
  username: string;
};
export const userAtom = atom<UserAtoms | null>(null);
