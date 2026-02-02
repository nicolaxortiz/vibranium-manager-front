import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },

  palette: {
    inputs: {
      main: "#1a1a1a",
      contrastText: "#ffffff",
    },
    mainButton: {
      main: "#1a1a1a",
      light: "#3c3c3cff",
      dark: "#000000ff",
      contrastText: "#ffffffff",
    },
    secondaryButton: {
      main: "#5f5f5f",
      light: "#b6b6b6ff",
      dark: "#5c5c5cff",
      contrastText: "#ffffffff",
    },
    saveOptionButton: {
      main: "#1a64d3ff",
      light: "#5590ffff",
      dark: "#0042a6ff",
      contrastText: "#ffffffff",
    },
    downloadButton: {
      main: "#be2f2fff",
      light: "#e04b4bff",
      dark: "#8c1f1fff",
      contrastText: "#ffffffff",
    },
    menuButton: {
      main: "#ffffffff",
      contrastText: "#141414ff",
    },
    alertwarning: {
      main: "#fcda1cff",
      light: "#ffec66ff",
      dark: "#caa800ff",
      contrastText: "#000000ff",
    },
    alertsuccess: {
      main: "#1a64d3ff",
      light: "#5590ffff",
      dark: "#0042a6ff",
      contrastText: "#ffffffff",
    },
  },
});

export default theme;
