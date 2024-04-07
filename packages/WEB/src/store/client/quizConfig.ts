import { create } from "zustand";

type States = {
  count: QuizCount;
  level: QuizLevel;
};

type Actions = {
  setCount: (count: QuizCount) => void;
  setLevel: (level: QuizLevel) => void;
};

export const useQuizConfig = create<States & Actions>((set) => ({
  count: null,
  level: null,
  setCount: (count: QuizCount) => set({ count }),
  setLevel: (level: QuizLevel) => set({ level }),
}));
