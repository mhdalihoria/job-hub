import { create } from "zustand";

const useThemeStore = create((set) => ({
  isLightTheme: false,
  switchTheme: () =>
    set((state) => ({
      isLightTheme: !state.isLightTheme,
    })),
}));

export default useThemeStore;