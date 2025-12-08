import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Stack,
  Tooltip,
} from "@mui/material";

export default function ChartBox({
  Type,
  title,
  color,
  data,
  yLabel,
  xLabel,
  xData,
  serie,
  formmater,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: "#ffffff",
        borderBottom: `3px solid ${color[0]}`,
        py: "10px",
        px: "15px",
      }}
    >
      <Stack>
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

        <Type
          dataset={data || []}
          xAxis={[{ dataKey: `${xData}`, scaleType: "band" }]}
          yAxis={
            formmater
              ? [
                  {
                    valueFormatter: (v) =>
                      v >= 1000000
                        ? `$${(v / 1000000).toFixed(1)}M`
                        : `$${(v / 1000).toFixed(0)}K`,

                    width: 80,
                    label: yLabel,
                  },
                ]
              : [
                  {
                    width: 80,
                    label: yLabel,
                  },
                ]
          }
          series={serie.map((item, index) => {
            return {
              dataKey: `${item}`,
              color: color[index],
              showMark: false,
              area: true,
              label: xLabel[index],
            };
          })}
          height={isMobile ? 200 : 300}
          sx={{ mt: 4 }}
        />
      </Stack>
    </Box>
  );
}
