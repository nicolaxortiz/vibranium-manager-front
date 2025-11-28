import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";
import { searchProducts } from "../../../API/ProductAPI";
import debounce from "lodash.debounce";

export default function SearchProduct({
  handleClickOpen,
  selectedProduct,
  setSelectedProduct,
  order,
}) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

  const fetchProducts = async (searchTerm) => {
    if (!searchTerm) {
      setOptions([]);
      return;
    }

    try {
      const res = await searchProducts(searchTerm);

      setOptions(res);
    } catch (error) {
      setOptions([]);
    }
  };

  const debouncedSearch = debounce((value) => {
    fetchProducts(value);
  }, 1000);

  const handleInputChange = (event, value) => {
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Autocomplete
          value={selectedProduct}
          onChange={(event, newValue) => {
            setSelectedProduct(newValue);
          }}
          disablePortal
          disabled={order}
          options={options}
          fullWidth
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nombre / código"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
      </Grid>

      {selectedProduct ? (
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            startIcon={<EditIcon />}
            onClick={handleClickOpen}
          >
            Editar producto
          </Button>
        </Grid>
      ) : (
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button
            variant="contained"
            fullWidth
            disabled={order}
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Crear producto
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
