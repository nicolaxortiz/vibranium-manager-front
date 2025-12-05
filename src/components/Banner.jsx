import React from "react";
import { AppBar, Toolbar, Button, Grid, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo-vibranium.png";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";

export default function Banner({ setOpen, user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center", display: "flex" }}
      >
        <Grid
          size={{ xs: 4, md: 4 }}
          sx={{ display: "flex", justifyContent: "start" }}
        >
          <Button
            onClick={() => setOpen(true)}
            color="menuButton"
            variant="contained"
          >
            <MenuIcon />
          </Button>
        </Grid>
        <Grid
          size={{ xs: 4, md: 4 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={logo}
            style={{
              height: "45px",
              width: "auto",
              maxWidth: "180px",
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 4, md: 4 }}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt={user?.name} src="/static/images/avatar/1.jpg" />
          </IconButton>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              width: "auto",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Mi perfil
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
