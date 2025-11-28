import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },

  palette: {
    filterOptionButton: {
      main: "#868686ff",
      light: "#a6a6a6ff",
      dark: "#606060ff",
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
