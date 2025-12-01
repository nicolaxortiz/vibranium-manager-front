import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function ProductFilter({
  search,
  setSearch,
  fetchProducts,
  handleClickOpen,
  setSelectedProduct,
  rowsPerPage,
}) {
  return (
    <Grid container spacing={2} sx={{ mt: "20px" }}>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Código / Nombre"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <Button
          variant="outlined"
          color="filterOptionButton"
          disabled={!search}
          fullWidth
          startIcon={<BackspaceIcon />}
          onClick={() => {
            setSearch("");

            fetchProducts({
              search: "",
              page: 1,
              limit: rowsPerPage,
            });
          }}
        >
          Eliminar filtros
        </Button>
      </Grid>

      <Grid size={{ md: 4, xs: 12 }}>
        <Button
          variant="contained"
          disabled={!search}
          fullWidth
          startIcon={<SearchIcon />}
          onClick={() => {
            fetchProducts();
          }}
        >
          Realizar búsqueda
        </Button>
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedProduct(null);
            handleClickOpen();
          }}
        >
          Crear nuevo producto
        </Button>
      </Grid>
    </Grid>
  );
}
