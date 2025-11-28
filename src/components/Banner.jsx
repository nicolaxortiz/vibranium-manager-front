import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo-vibranium.png";

export default function Banner({ setOpen }) {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffffff",
        borderBottom: "1px solid #e0e0e0",
        py: { xs: 1.5, md: 2 },
        px: { xs: 2, md: 2 },
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "center" }}>
        <Box
          sx={{
            position: "relative",
            width: { xs: 140, sm: 160, md: 180 },
            height: { xs: 50, sm: 56, md: 64 },
          }}
        >
          <img
            src={logo}
            style={{
              height: "56px",
              width: "auto",
              maxWidth: "180px",
            }}
          />
        </Box>
      </Toolbar>

      <Button
        onClick={() => setOpen(true)}
        color="menuButton"
        variant="contained"
        sx={{ position: "absolute", top: { xs: 20, md: 25 }, left: 20 }}
      >
        <MenuIcon />
      </Button>
    </AppBar>
  );
}
