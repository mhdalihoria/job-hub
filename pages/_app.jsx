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
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps }) => {
  const { isLightTheme } = useThemeStore();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const { userData, setUserData, resetUserData } = useUserStore();
  const { isPageLoading, setIsPageLoading } = useLoaderStore();
  const { isLoggedIn, logout, login } = useAuthStore();
  console.log("userData Store", userData);
  console.log("UserInfoComplete", !!userData.isUserInfoComplete);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsPageLoading(true);
      if (user) {
        // User is signed in
        const firstName = user.displayName;
        const lastName = user.displayName;
        const email = user.email;
        const uid = user.uid;
        const profileImg = user.photoURL;
        login();
        console.log("from _app, user logged in", user.displayName);

        try {
          const docRef = doc(firestore, "users", uid);
          const userDocSnap = await getDoc(docRef);

          if (userDocSnap.exists()) {
            // User data exists; return it
            console.log(userDocSnap.data());
            setUserData({...userDocSnap.data()});
          } else {
            // setUserData({ firstName, lastName, email, uid, profileImg });
            return null;
          }
        } catch (error) {
          // Handle any potential errors here
          console.error("Error fetching user data:", error);
          throw error;
        }
      } else {
        // User is signed out
        logout();
        resetUserData();
        console.log("from _app, user logged out");
      }
      setIsPageLoading(false);
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
};

export default appWithTranslation(App);
