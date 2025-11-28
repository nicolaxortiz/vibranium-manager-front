import React, { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, useMediaQuery, useTheme, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Title from "../../Title";
import ConfirmModal from "../../ConfirmModal";

export default function Specifications({
  setDocumentInformation,
  documentInformation,
  order,
  handledownloadPDF,
  handleSaveDocument,
  mode,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (documentInformation?.type === "CO") {
      setDocumentInformation((prev) => ({
        ...prev,
        paid: 0,
      }));
    }
  }, [documentInformation?.type]);

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
      <Title text="Especificaciones" />

      <Grid container spacing={2} sx={{ mt: "10px" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" size="small">
              Tipo de documento
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              disabled={order}
              size="small"
              label="Tipo de documento"
              value={documentInformation?.type || ""}
              onChange={(e) => {
                setDocumentInformation((prev) => ({
                  ...prev,
                  type: e.target.value,
                }));
              }}
            >
              <MenuItem value={"CC"}>Cuenta de cobro</MenuItem>
              <MenuItem value={"CO"}>Cotización</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {documentInformation?.type === "CC" && (
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Abono del pago total"
              size="small"
              disabled={order}
              value={documentInformation?.paid.toLocaleString("es-CO")}
              onChange={(e) => {
                let raw = e.target.value;

                if (raw === "") {
                  setDocumentInformation((prev) => ({
                    ...prev,
                    paid: 0,
                  }));
                  return;
                }

                const numericString = raw.replace(/[.,\s]/g, "");

                if (!/^\d+$/.test(numericString)) return;

                const numericValue = Number(numericString);

                setDocumentInformation((prev) => ({
                  ...prev,
                  paid: numericValue,
                }));
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Descripcion"
            disabled={order}
            multiline
            minRows={3}
            maxRows={8} // máximo 8 líneas antes de scroll
            value={documentInformation?.description || ""}
            onChange={(e) => {
              setDocumentInformation((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>

        {order ? (
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<DoneIcon />}
              disabled={!order}
              onClick={() => {
                mode === "edit" ? navigate(`/document-list`) : navigate(0);
              }}
            >
              Finalizar
            </Button>
          </Grid>
        ) : (
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<SaveIcon />}
              disabled={
                documentInformation?.type === "" ||
                documentInformation?.description === "" ||
                (documentInformation?.type === "CC" &&
                  documentInformation?.paid === "")
              }
              onClick={handleClickOpen}
            >
              {mode === "edit" ? "Actualizar" : "Guardar"}
            </Button>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            color="downloadButton"
            disabled={!order}
            fullWidth
            startIcon={<FileDownloadIcon />}
            onClick={handledownloadPDF}
          >
            Descargar
          </Button>
        </Grid>
      </Grid>

      <ConfirmModal
        modalTitle={`Finalizar el registro de la orden de productos`}
        modalContent={
          "Revise que toda la información esté correcta antes de guardar"
        }
        open={open}
        handleClose={handleClose}
        handleFunction={handleSaveDocument}
      />
    </Box>
  );
}
