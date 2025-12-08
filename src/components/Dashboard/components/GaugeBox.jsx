import React from "react";
import { Box, useMediaQuery, useTheme, Typography, Grid } from "@mui/material";
import { rainbowSurgePalette } from "@mui/x-charts/colorPalettes";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

export default function GaugeBox({
  title,
  color,
  totalPaid,
  totalInvoiced,
  totalPending,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const palette = rainbowSurgePalette(theme.palette.mode);

  const formmatedTotalPaid =
    totalPaid >= 1000000
      ? `$${(totalPaid / 1000000).toFixed(1)}M`
      : `$${(totalPaid / 1000).toFixed(0)}K`;

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "#ffffff",
        borderBottom: `3px solid ${color}`,
        py: "10px",
        px: "15px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              color: "#929292ff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item size={{ md: 12, xs: 12 }}>
          <PieChart
            hideLegend={true}
            series={[
              {
                arcLabel: (item) =>
                  `${((item.value * 100) / totalInvoiced).toFixed(2)}%`,
                innerRadius: 0,
                outerRadius: 80,
                data: [
                  {
                    label: "Abonos",
                    value: totalPaid,
                    color: palette[2],
                  },
                  {
                    label: "Pendiente",
                    value: totalPending,
                    color: palette[1],
                  },
                ],
                highlightScope: { fade: "global", highlight: "item" },
              },
              {
                id: "outer",
                innerRadius: 100,
                outerRadius: 120,
                data: [
                  {
                    label: "Ventas",
                    value: totalInvoiced,
                    color: palette[0],
                  },
                ],
                highlightScope: { fade: "global", highlight: "item" },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "bold",
                fontFamily: "Montserrat",
                color: "white",
              },
            }}
            height={250}
          />
        </Grid>
        <Grid
          item
          size={{ md: 12, xs: 12 }}
          sx={{ alignContent: "center" }}
          align="center"
        >
          <Grid container spacing={2}>
            <Grid item size={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#929292ff" }}
              >
                Ingresos:
              </Typography>
            </Grid>
            <Grid item size={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#2c2c2cff" }}
              >
                $ {totalInvoiced?.toLocaleString("es-CO")}
              </Typography>
            </Grid>

            <Grid item size={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#929292ff" }}
              >
                Abonos:
              </Typography>
            </Grid>
            <Grid item size={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#2c2c2cff" }}
              >
                $ {totalPaid?.toLocaleString("es-CO")}
              </Typography>
            </Grid>

            <Grid item size={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#929292ff" }}
              >
                Pendiente:
              </Typography>
            </Grid>
            <Grid item size={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: "#2c2c2cff" }}
              >
                $ {totalPending?.toLocaleString("es-CO")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
