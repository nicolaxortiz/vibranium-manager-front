import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Title from "../../Title";
import SearchProduct from "./SearchProduct";
import ProductInformation from "./ProductInformation";
import ProductModal from "./ProductModal";

export default function ProductBox({
  selectedProduct,
  setSelectedProduct,
  setProducts,
  order,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Title text="Añadir producto" />

      <SearchProduct
        handleClickOpen={handleClickOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        order={order}
      />
      <ProductInformation
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setProducts={setProducts}
      />
      <ProductModal
        handleClose={handleClose}
        open={open}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
}
