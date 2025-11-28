import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function ClientInformation({ selectedClient }) {
  return (
    <Grid container spacing={2} sx={{ mt: "20px" }}>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Nombre"
          variant="outlined"
          size="small"
          fullWidth
          value={selectedClient?.name || ""}
          disabled
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="NIT / CC"
          variant="outlined"
          size="small"
          fullWidth
          value={selectedClient?.document || ""}
          disabled
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Celular"
          variant="outlined"
          size="small"
          fullWidth
          value={selectedClient?.phone || ""}
          disabled
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Correo Electronico"
          variant="outlined"
          size="small"
          fullWidth
          value={selectedClient?.email || ""}
          disabled
        />
      </Grid>
      <Grid size={{ md: 4, xs: 12 }}>
        <TextField
          label="Direccion"
          variant="outlined"
          size="small"
          fullWidth
          value={selectedClient?.address || ""}
          disabled
        />
      </Grid>
    </Grid>
  );
}
