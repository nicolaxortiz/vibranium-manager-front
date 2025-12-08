import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Stack,
} from "@mui/material";

export default function SmallBox({ title, color, SelectedIcon, data }) {
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
      <Grid container spacing={5}>
        <Grid item size={{ md: 8, xs: 12 }}>
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

            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ color: "#2c2c2cff" }}
            >
              {data}
            </Typography>
          </Stack>
        </Grid>

        {!isMobile && (
          <Grid
            item
            size={{ md: 4, xs: 0 }}
            sx={{ alignContent: "center" }}
            align="center"
          >
            <SelectedIcon
              sx={{ fontSize: isMobile ? 40 : 60, color: "#929292ff" }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
