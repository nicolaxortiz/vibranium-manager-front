import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Title from "../../Title";
import SearchClient from "./SearchClient";
import ClientInformation from "./ClientInformation";
import ClientModal from "./ClientModal";

export default function ClientBox({
  selectedClient,
  setSelectedClient,
  order,
  setAlertMessage,
  setAlertSeverity,
  handleClick,
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
      <Title text="Informacion del cliente" />

      <SearchClient
        handleClickOpen={handleClickOpen}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        order={order}
      />
      <ClientInformation selectedClient={selectedClient} />
      <ClientModal
        handleClose={handleClose}
        open={open}
        setSelectedClient={setSelectedClient}
        selectedClient={selectedClient}
        setAlertMessage={setAlertMessage}
        setAlertSeverity={setAlertSeverity}
        handleClick={handleClick}
      />
    </Box>
  );
}
