import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false, // This is our "is logged in" state
  login: () => set({ isLoggedIn: true }), // This function sets isLoggedIn to true
  logout: () => set({ isLoggedIn: false }), // This function sets isLoggedIn to false
}));

export default useAuthStore;
