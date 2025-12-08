import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
export default function MediumBox({ title, color, data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

        <Grid container spacing={2} sx={{ mt: "20px" }}>
          {data?.map((item) => {
            return (
              <>
                <Grid item size={6} align="center">
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
                    {item?.name}
                  </Typography>
                </Grid>
                <Grid item size={6} align="center">
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ color: "#2c2c2cff" }}
                  >
                    $ {item?.debt.toLocaleString("es-CO")}
                  </Typography>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
}
