import { create } from "zustand";

const useLoaderStore = create((set) => ({
  isPageLoading: true,
  setIsPageLoading: (value) => set({ isPageLoading: value }),
  isSectionLoading: false,
  setIsSectionLoading: (value) => set({ isSectionLoading: value }),
}));

export default useLoaderStore