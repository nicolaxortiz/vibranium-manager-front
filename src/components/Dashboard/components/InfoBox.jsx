import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import YearSelect from "./YearSelect";

export default function InfoBox({ title, color, year, setYear }) {
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
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item size={{ md: 8, xs: 8 }}>
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
          </Stack>
        </Grid>

        <Grid
          item
          size={{ xs: 4, md: 4 }}
          sx={{ justifyContent: "flex-end", display: "flex" }}
        >
          <YearSelect year={year} setYear={setYear} />
        </Grid>
      </Grid>
    </Box>
  );
}
