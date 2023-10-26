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
    //---------------------!! For now the above code is for user credentials name, and id. but it will be saved in local and fire store storage and it will be replaced with the code below
    userData: null, 
    setUserData: (data) => set({userData: data})
}));

export default useUserStore;
