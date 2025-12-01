import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TruncatedCell from "./TruncatedCell";

export default function CustomerTable({
  customers,
  totalCustomers,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  setSelectedClient,
  handleClickMenu,
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  return (
    <>
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
                sx={{ fontWeight: "Bold", minWidth: 70 }}
              >
                NIT / CC
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Celular
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 250 }}
              >
                Correo electronico
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 250 }}
              >
                Direccion
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalCustomers === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay clientes para mostrar
                </TableCell>
              </TableRow>
            )}
            {customers.map((row, index) => {
              return (
                <TableRow tabIndex={-1} key={index}>
                  <TableCell align="center">
                    <TruncatedCell text={row.name} maxWidth={250} />
                  </TableCell>
                  <TableCell align="center">{row.document}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">
                    <TruncatedCell text={row.email} maxWidth={250} />
                  </TableCell>
                  <TableCell align="center">
                    <TruncatedCell text={row.address} maxWidth={250} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="menu"
                      onClick={(e) => {
                        setSelectedClient(row);
                        handleClickMenu(e);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={totalCustomers}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
