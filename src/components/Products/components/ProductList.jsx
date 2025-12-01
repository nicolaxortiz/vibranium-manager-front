import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "../../ConfirmModal";
import Title from "../../Title";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ProductTable from "./ProductTable";

export default function ProductList({
  products,
  totalProducts,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  selectedProduct,
  setSelectedProduct,
  handleClickOpen,
  handleDeleteProduct,
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
      <Title text="Lista de productos" />

      <ProductTable
        products={products}
        totalProducts={totalProducts}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setSelectedProduct={setSelectedProduct}
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
        modalTitle={`¿Desea eliminar ${
          selectedProduct !== null ? selectedProduct.name : ""
        } de los productos?`}
        modalContent={"Esta acción no se puede deshacer"}
        open={openModal}
        handleClose={handleCloseModal}
        handleFunction={() => handleDeleteProduct(selectedProduct._id)}
      />
    </Box>
  );
}
