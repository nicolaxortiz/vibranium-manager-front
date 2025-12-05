import React from "react";
import SearchBox from "./components/SearchBox";
import { deleteProduct, searchProducts } from "../../API/ProductAPI";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import GeneralAlert from "../GeneralAlert";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../../utils/auth";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  const [totalProducts, setTotalProducts] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (productId) {
      try {
        const response = await deleteProduct(productId);
        setAlertMessage("Producto eliminado exitosamente");
        setAlertSeverity("success");
        handleClickAlert();
        fetchProducts();
      } catch (error) {
        setAlertMessage("Error al eliminar el producto");
        setAlertSeverity("error");
        handleClickAlert();
      }
    }
  };

  const fetchProducts = async (overrideParams = {}) => {
    try {
      const response = await searchProducts({
        search,
        page: page,
        limit: rowsPerPage,
        ...overrideParams,
      });

      setProducts(response.products);
      setTotalProducts(response.pagination.total);
    } catch (error) {
      setAlertMessage("Error buscando los productos");
      setAlertSeverity("error");
      handleClickAlert();
    }
  };

  React.useEffect(() => {
    if (isAuthenticated()) {
      fetchProducts();
    }
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <SearchBox
        search={search}
        setSearch={setSearch}
        fetchProducts={fetchProducts}
        handleClickOpen={handleClickOpen}
        setSelectedProduct={setSelectedProduct}
        rowsPerPage={rowsPerPage}
      />

      <ProductList
        products={products}
        totalProducts={totalProducts}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleClickOpen={handleClickOpen}
        handleDeleteProduct={handleDeleteProduct}
      />

      <ProductModal
        handleClose={handleClose}
        open={open}
        selectedProduct={selectedProduct}
        fetchProducts={fetchProducts}
        setAlertMessage={setAlertMessage}
        setAlertSeverity={setAlertSeverity}
        handleClickAlert={handleClickAlert}
      />
      <GeneralAlert
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      />
    </>
  );
}
