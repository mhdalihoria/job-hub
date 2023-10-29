import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/theme";
import "@/styles/globals.css";
import useThemeStore from "@/stores/themeStore";
import useUserStore from "@/stores/userStore";

export default function App({ Component, pageProps }) {
  const { isLightTheme } = useThemeStore();
  const theme = isLightTheme ? lightTheme : darkTheme;
  const { userData } = useUserStore();
  console.log(userData);
  
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
