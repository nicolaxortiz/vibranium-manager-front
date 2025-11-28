import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { createCustomer, updateCustomer } from "../../../API/CustomerAPI";

export default function ClientModal({
  handleClose,
  open,
  setSelectedClient,
  selectedClient,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      let response = "";
      if (selectedClient) {
        response = await updateCustomer(selectedClient._id, formJson);
        setSelectedClient(response);
      } else {
        response = await createCustomer(formJson);
        setSelectedClient(response);
      }
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
      <DialogTitle>
        {selectedClient ? "Actualizar cliente" : "Crear cliente"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Registre los datos del cliente</DialogContentText>
        <form onSubmit={handleSubmit} id="subscription-form">
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              required
              id="name"
              name="name"
              label="Nombre"
              fullWidth
              variant="standard"
              defaultValue={selectedClient?.name || ""}
            />

            <TextField
              required
              id="document"
              name="document"
              label="NIT / CC"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={selectedClient?.document || ""}
            />

            <TextField
              required
              id="phone"
              name="phone"
              label="Celular"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={selectedClient?.phone || ""}
            />

            <TextField
              required
              id="email"
              name="email"
              label="Correo Electronico"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={selectedClient?.email || ""}
            />

            <TextField
              required
              id="address"
              name="address"
              label="Dirección"
              fullWidth
              variant="standard"
              defaultValue={selectedClient?.address || ""}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit" form="subscription-form">
          {selectedClient ? "Editar cliente" : "Guardar cliente"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
