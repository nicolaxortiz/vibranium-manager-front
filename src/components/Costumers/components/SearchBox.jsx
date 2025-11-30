import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Title from "../../Title";
import CustomerFilter from "./CustomerFilter";

export default function SearchBox({
  search,
  setSearch,
  fetchCustomers,
  handleClickOpen,
  setSelectedClient,
  rowsPerPage,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <Title text="Filtros de busqueda" />

      <CustomerFilter
        search={search}
        setSearch={setSearch}
        fetchCustomers={fetchCustomers}
        handleClickOpen={handleClickOpen}
        setSelectedClient={setSelectedClient}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
}
