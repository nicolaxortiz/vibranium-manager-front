import React from "react";
import SmallBox from "./SmallBox";
import { Box, useMediaQuery, useTheme, Grid } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ChartBox from "./ChartBox";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import GaugeBox from "./GaugeBox";
import MediumBox from "./MediumBox";
import { rainbowSurgePalette } from "@mui/x-charts/colorPalettes";

export default function GroupBox({ stats }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const palette = rainbowSurgePalette(theme.palette.mode);
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        mx: "auto",
        width: isMobile ? "92%" : "84%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Clientes"}
            color={palette[0]}
            SelectedIcon={GroupIcon}
            data={stats?.customers}
          />
        </Grid>
        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Productos"}
            color={palette[1]}
            SelectedIcon={FitnessCenterIcon}
            data={stats?.products}
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Cotizaciones"}
            color={palette[4]}
            SelectedIcon={InsertDriveFileIcon}
            data={stats?.co}
          />
        </Grid>
        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Cuentas de cobro"}
            color={palette[2]}
            SelectedIcon={RequestQuoteIcon}
            data={stats?.cc}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <ChartBox
            Type={BarChart}
            title={"Registro de nuevos clientes"}
            color={[palette[0]]}
            data={stats?.customersByMonth}
            yLabel={"Clientes"}
            xLabel={["Cantidad"]}
            xData={"month"}
            serie={["count"]}
            formmater={false}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <ChartBox
            Type={LineChart}
            title={"Ventas realizadas por mes"}
            color={[palette[4], palette[2]]}
            data={stats?.paymentsByMonth}
            yLabel={"Monto"}
            xLabel={["Ventas", "Abonos"]}
            xData={"month"}
            serie={["totalInvoiced", "totalPaid"]}
            formmater={true}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <GaugeBox
            title={"Total de ingresos anuales"}
            color={palette[2]}
            totalPaid={stats?.totalPaid}
            totalInvoiced={stats?.totalInvoiced}
            totalPending={stats?.totalPending}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <MediumBox
            title={"Listado de clientes con deuda"}
            color={palette[0]}
            data={stats?.clientsWithDebt}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
