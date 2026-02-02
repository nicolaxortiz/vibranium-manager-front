import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";
import TruncatedCell from "./TruncatedCell";
export default function MediumBox({ title, color, data, loading }) {
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

        {loading ? (
          <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Skeleton variant="rounded" height={20} />
            <Skeleton variant="rounded" height={20} />
            <Skeleton variant="rounded" height={20} />
            <Skeleton variant="rounded" height={20} />
            <Skeleton variant="rounded" height={20} />
            <Skeleton variant="rounded" height={20} />
            <Skeleton variant="rounded" height={20} />
          </Stack>
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "Bold", minWidth: 250 }}
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "Bold", minWidth: 100 }}
                  >
                    CC / NIT
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "Bold", minWidth: 150 }}
                  >
                    Deuda
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No hay deudores para mostrar
                    </TableCell>
                  </TableRow>
                )}
                {data?.map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={index}>
                      <TableCell align="center">
                        <TruncatedCell text={row.name} maxWidth={250} />
                      </TableCell>
                      <TableCell align="center">{row.document}</TableCell>
                      <TableCell align="center">
                        $ {row.debt.toLocaleString("es-CO")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Box>
  );
}
