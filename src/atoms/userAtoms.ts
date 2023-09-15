import { atom } from 'jotai';

export type UserAtoms = {
  id: string;
  username: string;
  isAdmin: boolean;
};
export const userAtom = atom<UserAtoms | null>(null);
