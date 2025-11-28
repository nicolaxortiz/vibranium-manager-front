import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

export default function ProductInformation({
  selectedProduct,
  setSelectedProduct,
  setProducts,
}) {
  const [priceInput, setPriceInput] = useState("");
  const [quantityInput, setQuantityInput] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setPriceInput(selectedProduct.price.toLocaleString("es-CO"));
    }

    if (!selectedProduct) {
      setPriceInput("");
    }
  }, [selectedProduct]);
  return (
    <Grid container spacing={2} sx={{ mt: "20px" }}>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Nombre del producto"
          variant="outlined"
          size="small"
          value={selectedProduct?.name || ""}
          fullWidth
          disabled
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Valor unitario"
          variant="outlined"
          size="small"
          fullWidth
          disabled={selectedProduct == null}
          value={priceInput}
          onChange={(e) => {
            let raw = e.target.value;

            if (raw === "") {
              setPriceInput("");
              setSelectedProduct({ ...selectedProduct, price: 0 });
              return;
            }

            const numericString = raw.replace(/[.,\s]/g, "");

            if (!/^\d+$/.test(numericString)) return;

            const numericValue = Number(numericString);

            setSelectedProduct({
              ...selectedProduct,
              price: numericValue,
            });

            setPriceInput(numericValue.toLocaleString("es-CO"));
          }}
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Cantidad"
          type="number"
          variant="outlined"
          disabled={selectedProduct == null}
          size="small"
          fullWidth
          value={quantityInput}
          onChange={(e) => {
            let raw = e.target.value;

            if (raw === "") {
              setQuantityInput("");
              return;
            }

            const numericString = raw.replace(/[.,\s]/g, "");

            if (!/^\d+$/.test(numericString)) return;

            setQuantityInput(e.target.value);
          }}
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!selectedProduct || !quantityInput || quantityInput <= 0}
          startIcon={<CheckIcon />}
          onClick={() => {
            setProducts((prevProducts) => {
              const quantityToAdd = Number(quantityInput) || 1;

              const productExists = prevProducts.some(
                (p) =>
                  p._id === selectedProduct._id &&
                  p.price === selectedProduct.price
              );

              if (productExists) {
                return prevProducts.map((p) =>
                  p._id === selectedProduct._id
                    ? { ...p, quantity: p.quantity + quantityToAdd }
                    : p
                );
              } else {
                return [
                  ...prevProducts,
                  { ...selectedProduct, quantity: quantityToAdd },
                ];
              }
            });

            setSelectedProduct(null);
            setQuantityInput(1);
            setPriceInput("");
          }}
        >
          Confirmar producto
        </Button>
      </Grid>
    </Grid>
  );
}
