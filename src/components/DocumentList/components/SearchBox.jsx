import React from "react";
import { Box, useMediaQuery, useTheme, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import Title from "../../Title";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import BackspaceIcon from "@mui/icons-material/Backspace";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox(props) {
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

      <Grid container spacing={2} sx={{ mt: "20px" }}>
        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            label="Nombre del cliente"
            variant="outlined"
            size="small"
            fullWidth
            value={props.customerName}
            onChange={(e) => {
              props.setCustomerName(e.target.value);
            }}
          />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <TextField
            label="NIT / CC del cliente"
            variant="outlined"
            size="small"
            fullWidth
            value={props.customerDocument}
            onChange={(e) => {
              props.setCustomerDocument(e.target.value);
            }}
          />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" size="small">
              Tipo de documento
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              label="Tipo de documento"
              value={props.documentType}
              onChange={(e) => {
                props.setDocumentType(e.target.value);
              }}
            >
              <MenuItem value={"CC"}>Cuenta de cobro</MenuItem>
              <MenuItem value={"CO"}>Cotización</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Fecha inicio"
              format="DD-MM-YYYY"
              size="small"
              fullWidth
              value={props.fromDate}
              onChange={(newValue) => {
                props.setFromDate(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Fecha final"
              format="DD-MM-YYYY"
              size="small"
              fullWidth
              value={props.toDate}
              onChange={(newValue) => {
                props.setToDate(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <Button
            variant="outlined"
            color="filterOptionButton"
            disabled={
              !props.documentType &&
              !props.fromDate &&
              !props.toDate &&
              !props.customerName &&
              !props.customerDocument
            }
            fullWidth
            startIcon={<BackspaceIcon />}
            onClick={() => {
              props.setDocumentType("");
              props.setFromDate(null);
              props.setToDate(null);
              props.setCustomerName("");
              props.setCustomerDocument("");

              props.fetchDocuments({
                customerName: "",
                customerDocument: "",
                documentType: "",
                fromDate: null,
                toDate: null,
                page: 1,
                limit: props.rowsPerPage,
              });
            }}
          >
            Eliminar filtros
          </Button>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <Button
            variant="contained"
            disabled={
              !props.documentType &&
              !props.fromDate &&
              !props.toDate &&
              !props.customerName &&
              !props.customerDocument
            }
            fullWidth
            startIcon={<SearchIcon />}
            onClick={() => {
              props.fetchDocuments();
            }}
          >
            Realizar búsqueda
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
