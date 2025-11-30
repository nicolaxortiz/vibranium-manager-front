import React from "react";
import { Tooltip, Box } from "@mui/material";

export default function TruncatedCell({ text, maxWidth = 70 }) {
  return (
    <Tooltip title={text || ""} arrow>
      <Box
        sx={{
          maxWidth,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text || "-"}
      </Box>
    </Tooltip>
  );
}
