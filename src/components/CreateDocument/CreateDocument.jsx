import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ClientBox from "./components/ClientBox";
import ProductBox from "./components/ProductBox";
import ProductSummary from "./components/ProductSummary";
import Specifications from "./components/Specifications";
import {
  createOrder,
  downloadOrderPDF,
  getOrderById,
  updateOrder,
} from "../../API/OrderAPI";
import GeneralAlert from "../GeneralAlert";

export default function CreateDocument({ mode }) {
  let { id } = useParams();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const fetchOrderData = async (orderId) => {
    try {
      const response = await getOrderById(orderId);
      setSelectedOrder(response);
    } catch (error) {
      navigate("/document-list");
      console.error("Error fetching order data:", error);
    }
  };

  React.useEffect(() => {
    if (mode === "edit" && id) {
      fetchOrderData(id);
    } else {
      setSelectedOrder(null);
    }
  }, [id, mode]);

  React.useEffect(() => {
    if (selectedOrder) {
      setSelectedClient(selectedOrder.customerId);
      setProducts(
        selectedOrder.products.map((product) => ({
          code: product.code,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
        }))
      );
      setDocumentInformation({
        type: selectedOrder.documentType,
        description: selectedOrder.specification,
        paid: selectedOrder.paid,
      });
    } else {
      setSelectedClient(null);
      setProducts([]);
      setDocumentInformation({
        type: "",
        description: `Accesorios importados\nAgarres de uso profesional\nEjes en acero inoxidable\nPintura electroestática\nTapizados en cassata`,
        paid: 0,
      });
    }
  }, [selectedOrder]);

  const [selectedClient, setSelectedClient] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [documentInformation, setDocumentInformation] = React.useState(null);
  const [order, setOrder] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSaveDocument = async () => {
    if (products.length === 0 || !selectedClient || !documentInformation) {
      setAlertMessage(
        "Debe seleccionar un cliente y agregar al menos un producto"
      );
      setAlertSeverity("warning");
      handleClick();
    } else {
      const orderData = {
        customerId: selectedClient._id,
        products: products.map((product) => ({
          code: product.code,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
        })),
        documentType: documentInformation.type,
        paid: documentInformation.paid,
        specification: documentInformation.description,
      };

      try {
        let response = "";
        if (mode === "edit" && id) {
          response = await updateOrder(id, orderData);
        } else {
          response = await createOrder(orderData);
        }
        setOrder(response);
        setAlertMessage("Documento creado exitosamente");
        setAlertSeverity("success");
        handleClick();
      } catch (error) {
        setAlertMessage(
          "Error al crear el documento. Por favor, intente de nuevo."
        );
        setAlertSeverity("error");
        handleClick();
      }
    }
  };

  const handledownloadPDF = async () => {
    if (order) {
      try {
        const response = await downloadOrderPDF(order._id);

        const blob = response;

        const url = window.URL.createObjectURL(blob);

        const pdfFileName = `${
          order.type === "CC" ? "Cuenta de cobro" : "Cotizacion"
        } - ${selectedClient.name}.pdf`;

        const a = document.createElement("a");
        a.href = url;
        a.download = pdfFileName;
        a.click();

        setAlertMessage("Documento descargado exitosamente");
        setAlertSeverity("success");
        handleClick();
      } catch (error) {
        setAlertMessage(
          "Error al descargar el documento. Por favor, intente de nuevo."
        );
        setAlertSeverity("error");
        handleClick();
      }
    }
  };
  return (
    <>
      <ClientBox
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        order={order}
        setAlertMessage={setAlertMessage}
        setAlertSeverity={setAlertSeverity}
        handleClick={handleClick}
      />
      <ProductBox
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setProducts={setProducts}
        order={order}
        setAlertMessage={setAlertMessage}
        setAlertSeverity={setAlertSeverity}
        handleClick={handleClick}
      />
      <ProductSummary
        setProducts={setProducts}
        products={products}
        order={order}
        setAlertMessage={setAlertMessage}
        setAlertSeverity={setAlertSeverity}
        handleClick={handleClick}
      />
      <Specifications
        setDocumentInformation={setDocumentInformation}
        documentInformation={documentInformation}
        order={order}
        handledownloadPDF={handledownloadPDF}
        handleSaveDocument={handleSaveDocument}
        mode={mode}
      />
      <GeneralAlert
        openAlert={openAlert}
        handleClose={handleClose}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      />
    </>
  );
}
