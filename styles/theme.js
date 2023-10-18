import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#003A9B",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#37C898",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#101A36",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#101A36",
      paper: "#373B47"
    },
    primary: {
      main: "#003A9B",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#37C898",
      contrastText: "#FFFFFF"
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

export { lightTheme, darkTheme };
