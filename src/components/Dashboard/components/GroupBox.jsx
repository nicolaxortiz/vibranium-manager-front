import React from "react";
import SmallBox from "./SmallBox";
import { Box, useMediaQuery, useTheme, Grid } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChartBox from "./ChartBox";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import GaugeBox from "./GaugeBox";
import MediumBox from "./MediumBox";

export default function GroupBox({ stats }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
            title={"Cotizaciones"}
            color={"#368f24ff"}
            SelectedIcon={AssignmentIcon}
            data={stats?.co}
          />
        </Grid>
        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Cuentas de cobro"}
            color={"#f6413bff"}
            SelectedIcon={AssignmentIcon}
            data={stats?.cc}
          />
        </Grid>
        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Clientes"}
            color={"#3b82f6"}
            SelectedIcon={GroupIcon}
            data={stats?.customers}
          />
        </Grid>
        <Grid item size={{ xs: 6, md: 3 }}>
          <SmallBox
            title={"Productos"}
            color={"#f6e33bff"}
            SelectedIcon={FitnessCenterIcon}
            data={stats?.products}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <ChartBox
            Type={LineChart}
            title={"Ventas realizadas por mes"}
            color={["#6ec05eff", "#e46863ff"]}
            data={stats?.paymentsByMonth}
            yLabel={"Monto"}
            xLabel={["Ventas", "Abonos"]}
            xData={"month"}
            serie={["totalInvoiced", "totalPaid"]}
            formmater={true}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <ChartBox
            Type={BarChart}
            title={"Registro de nuevos clientes"}
            color={["#3b82f6"]}
            data={stats?.customersByMonth}
            yLabel={"Clientes"}
            xLabel={["Cantidad"]}
            xData={"month"}
            serie={["count"]}
            formmater={false}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <GaugeBox
            title={"Total de ingresos anuales"}
            color={"#e46863ff"}
            totalPaid={stats?.totalPaid}
            totalInvoiced={stats?.totalInvoiced}
            totalPending={stats?.totalPending}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <MediumBox
            title={"Listado de clientes con deuda"}
            color={"#3b82f6"}
            data={stats?.clientsWithDebt}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
