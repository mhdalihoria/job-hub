import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/theme";
import "@/styles/globals.css";
import useThemeStore from "@/stores/themeStore";

export default function App({ Component, pageProps }) {
  const { isLightTheme } = useThemeStore();
  const theme = isLightTheme ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
