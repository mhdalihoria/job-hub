import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/theme";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const theme = lightTheme;
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  );
}
