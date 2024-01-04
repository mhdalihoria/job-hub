import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F0F8FF",
      paper: "#EDF2F8",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    primary: {
      main: "#003A9B",
      light: "rgb(51, 97, 175)",
      dark: "rgb(0, 40, 108)",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3A9B00",
      light: "rgb(97, 175, 51)",
      dark: "rgb(40, 108, 0)",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1a1a1a",
      paper: "#2f2f2f"
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
    },
    primary: {
      main: "#2f2f2f",
      light: "rgba(47, 47, 47, .8)",
      dark: "#1f1f1f",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3A9B00",
      light: "rgb(97, 175, 51)",
      dark: "rgb(40, 108, 0)",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#FFFFFF",
    },
  },
});

export { lightTheme, darkTheme };
