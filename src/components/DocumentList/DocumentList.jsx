import React from "react";
import SearchBox from "./components/SearchBox";
import DocumentsBox from "./components/DocumentsBox";
import { deleteOrder, searchOrders } from "../../API/OrderAPI";
import { downloadOrderPDF } from "../../API/OrderAPI";
import GeneralAlert from "../GeneralAlert";

export default function DocumentList() {
  const [documents, setDocuments] = React.useState([]);
  const [documentType, setDocumentType] = React.useState("");
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [customerName, setCustomerName] = React.useState("");
  const [customerDocument, setCustomerDocument] = React.useState("");

  const [totalDocuments, setTotalDocuments] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const fetchDocuments = async (overrideParams = {}) => {
    try {
      const response = await searchOrders({
        customerDocument: customerDocument,
        customerName: customerName,
        documentType: documentType,
        fromDate: fromDate
          ? `${fromDate.$y}-${fromDate.$M + 1}-${fromDate.$D}`
          : null,
        toDate: toDate ? `${toDate.$y}-${toDate.$M + 1}-${toDate.$D}` : null,
        page: page,
        limit: 10,
        ...overrideParams,
      });

      setDocuments(response.orders);
      setTotalDocuments(response.pagination.total);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handledownloadPDF = async (order) => {
    if (order) {
      try {
        const response = await downloadOrderPDF(order._id);

        const blob = response;

        const url = window.URL.createObjectURL(blob);

        const pdfFileName = `${
          order.documentType === "CC" ? "Cuenta de cobro" : "Cotizacion"
        } - ${order.customerId.name}.pdf`;

        const a = document.createElement("a");
        a.href = url;
        a.download = pdfFileName;
        a.click();
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }
  };

  const handleDeleteDocument = async (orderId) => {
    if (orderId) {
      try {
        const reponse = await deleteOrder(orderId);
        setAlertMessage("Documento eliminado exitosamente");
        setAlertSeverity("success");
        handleClick();
        fetchDocuments();
      } catch (error) {
        setAlertMessage("Error al eliminar el documento");
        setAlertSeverity("error");
        handleClick();
      }
    }
  };

  React.useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <>
      <SearchBox
        documentType={documentType}
        setDocumentType={setDocumentType}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerDocument={customerDocument}
        setCustomerDocument={setCustomerDocument}
        fetchDocuments={fetchDocuments}
      />
      <DocumentsBox
        documents={documents}
        totalDocuments={totalDocuments}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        handledownloadPDF={handledownloadPDF}
        handleDeleteDocument={handleDeleteDocument}
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
