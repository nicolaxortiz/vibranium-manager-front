import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import Title from "../../Title";
import TextfField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ConfirmModal from "../../ConfirmModal";

export default function ProductSummary({ setProducts, products, order }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [editingIndex, setEditingIndex] = useState(null); // <- cuál fila está en edición
  const [tempProduct, setTempProduct] = useState({}); // <- datos temporales mientras se edita

  // Iniciar edición
  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempProduct({ ...products[index] }); // copia del producto actual
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditingIndex(null);
    setTempProduct({});
  };

  // Guardar cambios
  const handleSave = () => {
    const updatedProducts = [...products];
    updatedProducts[editingIndex] = tempProduct;
    setProducts(updatedProducts);
    setEditingIndex(null);
    setTempProduct({});
  };

  const handleInputChange = (field, value) => {
    setTempProduct({ ...tempProduct, [field]: value });
  };

  const handleDeleteProduct = () => {
    const newProducts = products.filter((_, i) => i !== selectedIndex);
    setProducts(newProducts);
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
      <Title text="Resumen de productos" />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Codigo
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Descripcion
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Cantidad
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 100 }}
              >
                Valor unitario
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 100 }}
              >
                Valor total
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index) => {
              const isEditing = editingIndex === index;
              return (
                <TableRow tabIndex={-1} key={index}>
                  <TableCell align="center">
                    {isEditing ? (
                      <TextfField
                        size="small"
                        variant="standard"
                        value={tempProduct.code || ""}
                        onChange={(e) =>
                          handleInputChange("code", e.target.value)
                        }
                        sx={{ width: "100px", fontSize: "0.875rem" }}
                      />
                    ) : (
                      row.code
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {isEditing ? (
                      <TextfField
                        variant="standard"
                        value={tempProduct.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        sx={{ width: "200px" }}
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {isEditing ? (
                      <TextfField
                        variant="standard"
                        type="number"
                        value={tempProduct.quantity || ""}
                        onChange={(e) =>
                          handleInputChange("quantity", Number(e.target.value))
                        }
                        sx={{ width: "70px" }}
                      />
                    ) : (
                      row.quantity
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {isEditing ? (
                      <TextfField
                        variant="standard"
                        type="number"
                        value={tempProduct.price || ""}
                        onChange={(e) =>
                          handleInputChange("price", Number(e.target.value))
                        }
                        sx={{ width: "100px" }}
                      />
                    ) : (
                      "$ " + row.price.toLocaleString("es-CO")
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {"$ " + (row.price * row.quantity).toLocaleString("es-CO")}
                  </TableCell>
                  <TableCell align="center">
                    {isEditing ? (
                      <>
                        <IconButton
                          aria-label="save"
                          disabled={order}
                          onClick={handleSave}
                        >
                          <SaveIcon />
                        </IconButton>
                        <IconButton
                          aria-label="cancel"
                          disabled={order}
                          onClick={handleCancel}
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          aria-label="edit"
                          disabled={order}
                          onClick={() => handleEdit(index)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          disabled={order}
                          onClick={() => {
                            setSelectedIndex(index);
                            handleClickOpen();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow tabIndex={-1}>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: "Bold" }}>
                Total a pagar:
              </TableCell>
              <TableCell align="center">
                {"$ " +
                  products
                    .reduce((acc, row) => acc + row.price * row.quantity, 0)
                    .toLocaleString("es-CO")}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmModal
        modalTitle={`¿Desea eliminar el producto ${
          selectedIndex !== null ? products[selectedIndex]?.name : ""
        }?`}
        modalContent={"Esta acción no se puede deshacer"}
        open={open}
        handleClose={handleClose}
        handleFunction={handleDeleteProduct}
      />
    </Box>
  );
}
