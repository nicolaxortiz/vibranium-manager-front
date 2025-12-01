import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Title from "../../Title";
import ProductFilter from "./ProductFilter";

export default function SearchBox({
  search,
  setSearch,
  fetchProducts,
  handleClickOpen,
  setSelectedProduct,
  rowsPerPage,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        mt: 4,
        mx: "auto",
        width: "80%",
        borderRadius: 2,
        bgcolor: "#ffffff",
        boxShadow: 3,
        py: "20px",
        px: isMobile ? "5%" : "2%",
      }}
    >
      <Title text="Filtros de busqueda" />

      <ProductFilter
        search={search}
        setSearch={setSearch}
        fetchProducts={fetchProducts}
        handleClickOpen={handleClickOpen}
        setSelectedProduct={setSelectedProduct}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
}
