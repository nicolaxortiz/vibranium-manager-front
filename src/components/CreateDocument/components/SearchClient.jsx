import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { searchCustomers } from "../../../API/CustomerAPI";
import debounce from "lodash.debounce";

export default function SearchClient({
  handleClickOpen,
  selectedClient,
  setSelectedClient,
  order,
}) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

  const fetchCustomers = async (searchTerm) => {
    if (!searchTerm) {
      setOptions([]);
      return;
    }

    try {
      const res = await searchCustomers({ search: searchTerm, limit: 100 });

      setOptions(res.customers);
    } catch (error) {
      setOptions([]);
    }
  };

  const debouncedSearch = debounce((value) => {
    fetchCustomers(value);
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
          lg: 4,
        }}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Autocomplete
          value={selectedClient}
          onChange={(event, newValue) => {
            setSelectedClient(newValue);
          }}
          disablePortal
          disabled={order}
          options={options}
          fullWidth
          getOptionLabel={(option) => `${option.document} - ${option.name}`}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="NIT / Nombre"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
      </Grid>

      {selectedClient ? (
        <Grid
          size={{
            xs: 12,
            md: 4,
            lg: 4,
          }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            disabled={order}
            startIcon={<EditIcon />}
            onClick={handleClickOpen}
          >
            Editar cliente
          </Button>
        </Grid>
      ) : (
        <Grid
          size={{
            xs: 12,
            md: 4,
            lg: 4,
          }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Crear cliente
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
