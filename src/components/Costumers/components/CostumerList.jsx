import React from "react";
import { Box, useMediaQuery, useTheme, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmModal from "../../ConfirmModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Title from "../../Title";
import CustomerTable from "./CustomerTable";

export default function CostumerList({
  customers,
  totalCustomers,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  selectedClient,
  setSelectedClient,
  handleClickOpen,
  handleDeleteCustomer,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        my: 4,
        mx: "auto",
        width: "80%",
        borderRadius: 2,
        bgcolor: "#ffffff",
        boxShadow: 3,
        py: "20px",
        px: isMobile ? "5%" : "2%",
      }}
    >
      <Title text="Lista de clientes" />

      <CustomerTable
        customers={customers}
        totalCustomers={totalCustomers}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setSelectedClient={setSelectedClient}
        handleClickMenu={handleClickMenu}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClickOpen();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpenModal();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>

      <ConfirmModal
        modalTitle={`¿Desea eliminar a ${
          selectedClient !== null ? selectedClient.name : ""
        } de los clientes?`}
        modalContent={"Esta acción no se puede deshacer"}
        open={openModal}
        handleClose={handleCloseModal}
        handleFunction={() => handleDeleteCustomer(selectedClient._id)}
      />
    </Box>
  );
}
