import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function YearSelect({ year, setYear }) {
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={year}
        color="inputs"
        onChange={handleChange}
      >
        <MenuItem value={2024}>2024</MenuItem>
        <MenuItem value={2025}>2025</MenuItem>
        <MenuItem value={2026}>2026</MenuItem>
      </Select>
    </FormControl>
  );
}
