import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/theme";
import "@/styles/globals.css";
import useThemeStore from "@/stores/themeStore";
import useUserStore from "@/stores/userStore";
import useLoaderStore from "@/stores/loaderStore";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import FullPageLoader from "@/components/loader/FullPageLoader";
import useAuthStore from "@/stores/authStore";
import { onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {
  const { isLightTheme } = useThemeStore();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const { userData, setUserData, resetUserData } = useUserStore();
  const { isPageLoading, setIsPageLoading } = useLoaderStore();
  const { isLoggedIn, logout } = useAuthStore();
  console.log(userData);

  useEffect(() => {
    setIsPageLoading(true);

    const fetchUserDataFromFirestore = async (userUID) => {
      try {
        const docRef = doc(firestore, "users", userUID);
        const userDocSnap = await getDoc(docRef);

        if (userDocSnap.exists()) {
          // User data exists; return it
          console.log(userDocSnap.data());

          setUserData(userDocSnap.data());
          login();
          setIsPageLoading(false);
        } else {
          setIsPageLoading(false);
          // Handle the case where the user document doesn't exist
          return null;
        }
      } catch (error) {
        // Handle any potential errors here
        console.error("Error fetching user data:", error);
        throw error;
      }
    };

    //------------------------------------------------------

    // If there's no userData means user is either not logged in, or doesn't have an account. So we figure out which
    if (Object.keys(userData).length === 0) {
      //Object.keys here is used to check for content of userData object without comparing the value, but by reference, like how objects should be compared as
      //  Fetch UID from localStorage to see if user is logged in before and selected the "remember me" option
      const storedID = window.localStorage.getItem("user")
        ? window.localStorage.getItem("user")
        : null;
      if (storedID) {
        fetchUserDataFromFirestore(storedID);
      } else {
        setIsPageLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("from _app, user logged in")
        // ...
      } else {
        logout();
        resetUserData();
        window.localStorage.removeItem("user");
        console.log("from _app, user logged out")
        // User is signed out
        // ...
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isPageLoading && <FullPageLoader size={60} loading={isPageLoading} />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
