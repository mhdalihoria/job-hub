import { create } from "zustand";

const useUserStore = create((set) => ({
  userCredentials: {
    firstName: null,
    lastName: null,
    id: null,
  },
  setUserCredentials: (firstName, lastName, id) =>
    set((state) => ({
      userCredentials: { ...state.userCredentials, firstName, lastName, id },
    })),
}));

export default useUserStore;
