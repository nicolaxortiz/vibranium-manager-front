import { Box, Typography, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#1a1a1a",
        color: "white",
        pb: 3,
        mt: "auto",
        borderTop: "1px solid #333",
        position: "relative",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{ display: "block", my: 2, textAlign: "center", opacity: 0.9 }}
      >
        Sistema de órdenes y facturación v1.0
      </Typography>

      <Divider sx={{ bgcolor: "#444", mb: 2 }} />

      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          © {new Date().getFullYear()} • <strong>Vibranium Fitness</strong> •
          Todos los derechos reservados
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.7, fontSize: "0.85rem" }}>
          Hecho por <strong>Nicolas Santiago Ortiz Pedraza</strong>
        </Typography>
      </Box>
    </Box>
  );
}
