import React from "react";
import { useNavigate } from "react-router";
import { Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Title from "../../Title";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmModal from "../../ConfirmModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import TruncatedCell from "./TruncatedCell";

export default function DocumentsBox({
  documents,
  totalDocuments,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  handledownloadPDF,
  handleDeleteDocument,
}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        my: 4,
        mx: "auto",
        width: "80%",
        borderRadius: 2,
        bgcolor: "#ffffff",
        boxShadow: 3,
        py: "20px",
        px: isMobile ? "5%" : "2%",
      }}
    >
      <Title text="Lista de documentos" />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Código
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 200 }}
              >
                Cliente
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 70 }}
              >
                NIT / CC
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Cant
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "Bold", minWidth: 100 }}
              >
                Valor total
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Fecha creación
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Tipo de documento
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalDocuments === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay documentos para mostrar
                </TableCell>
              </TableRow>
            )}
            {documents.map((row, index) => {
              return (
                <TableRow tabIndex={-1} key={index}>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">
                    <TruncatedCell text={row.customerId.name} maxWidth={250} />
                  </TableCell>
                  <TableCell align="center">
                    {row.customerId.document}
                  </TableCell>
                  <TableCell align="center">{row.products.length}</TableCell>
                  <TableCell align="center">
                    ${" "}
                    {row.products
                      .reduce((acc, row) => acc + row.price * row.quantity, 0)
                      .toLocaleString("es-CO")}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.createdAt).toLocaleDateString("es-CO")}
                  </TableCell>
                  <TableCell align="center">
                    {row.documentType === "CC"
                      ? "Cuenta de cobro"
                      : "Cotización"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="menu"
                      onClick={(e) => {
                        setSelectedIndex(row);
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
        count={totalDocuments}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            window.open(
              `${import.meta.env.VITE_API_URL}orders/download/${
                selectedIndex._id
              }`,
              "_blank"
            );
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          Previsualizar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handledownloadPDF(selectedIndex);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          Descargar
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/update-document/${selectedIndex._id}`);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpen();
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>

      <ConfirmModal
        modalTitle={`¿Desea eliminar el documento de ${
          selectedIndex !== null ? selectedIndex.customerId.name : ""
        }?`}
        modalContent={"Esta acción no se puede deshacer"}
        open={open}
        handleClose={handleClose}
        handleFunction={() => handleDeleteDocument(selectedIndex._id)}
      />
    </Box>
  );
}
