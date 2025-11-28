import React from "react";
import { Typography, Box } from "@mui/material";

export default function Title({ text }) {
  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        fontWeight={600}
        align="center"
        sx={{ pb: "20px" }}
      >
        {text}
      </Typography>
    </Box>
  );
}
