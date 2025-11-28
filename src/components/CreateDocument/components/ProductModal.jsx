import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { createProduct, updateProduct } from "../../../API/ProductAPI";

export default function ProductModal({
  handleClose,
  open,
  setSelectedProduct,
  selectedProduct,
}) {
  const [priceInput, setPriceInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const array = formJson.specifications
      .split(/\r?\n|[,;]/)
      .map((linea) => linea.trim())
      .filter((linea) => linea);

    formJson.specifications = array;
    formJson.price = Number(formJson.price.replace(/[.,\s]/g, ""));

    try {
      let response = "";
      if (selectedProduct) {
        response = await updateProduct(selectedProduct._id, formJson);
        setSelectedProduct(response);
      } else {
        response = await createProduct(formJson);
        setSelectedProduct(response);
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }

    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
      <DialogTitle>
        {selectedProduct ? "Actualizar producto" : "Crear producto"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Registre los datos del producto</DialogContentText>
        <form onSubmit={handleSubmit} id="subscription-form">
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              required
              id="code"
              name="code"
              label="Codigo"
              fullWidth
              variant="standard"
              defaultValue={selectedProduct?.code || ""}
            />

            <TextField
              required
              id="name"
              name="name"
              label="Nombre del producto"
              fullWidth
              variant="standard"
              defaultValue={selectedProduct?.name || ""}
            />

            {selectedProduct ? (
              <TextField
                required
                id="price"
                name="price"
                label="Precio unitario"
                fullWidth
                variant="standard"
                defaultValue={selectedProduct?.price}
              />
            ) : (
              <TextField
                required
                id="price"
                name="price"
                label="Precio unitario"
                fullWidth
                variant="standard"
                value={priceInput}
                onChange={(e) => {
                  let raw = e.target.value;

                  if (raw === "") {
                    setPriceInput("");
                    return;
                  }

                  const numericString = raw.replace(/[.,\s]/g, "");

                  if (!/^\d+$/.test(numericString)) return;

                  const numericValue = Number(numericString);

                  setPriceInput(numericValue.toLocaleString("es-CO"));
                }}
              />
            )}

            <TextField
              required
              id="specifications"
              name="specifications"
              label="Especificaciones"
              multiline
              minRows={3}
              maxRows={8}
              defaultValue={selectedProduct?.specifications.join("\n") || ""}
              variant="standard"
              fullWidth
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" form="subscription-form">
          {selectedProduct ? "Editar producto" : "Guardar producto"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
