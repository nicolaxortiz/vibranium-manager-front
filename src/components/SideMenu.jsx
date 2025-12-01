import React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Title from "./Title";

export default function SideMenu({ open, toggleDrawer }) {
  const navigate = useNavigate();
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250, pt: 2 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <Title text="Menu" />
        <Divider />
        <List>
          <ListItem key={1} disablePadding onClick={() => navigate("/")}>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Crear documento" />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={2}
            disablePadding
            onClick={() => navigate("/document-list")}
          >
            <ListItemButton>
              <ListItemIcon>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary="Lista de documentos" />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={3}
            disablePadding
            onClick={() => navigate("/customers")}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>

          <ListItem
            key={4}
            disablePadding
            onClick={() => navigate("/products")}
          >
            <ListItemButton>
              <ListItemIcon>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
