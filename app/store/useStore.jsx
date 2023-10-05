import { create } from "zustand";

export const useStore = create((set) => ({
  searchitem: null,
  setSearchItem: (data) => set({ searchitem: data }),
}));
