import React from "react";
import SearchBox from "./components/SearchBox";
import CostumerList from "./components/CostumerList";
import { deleteCustomer, searchCustomers } from "../../API/CustomerAPI";
import CustomerModal from "./components/CustomerModal";
import GeneralAlert from "../GeneralAlert";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../../utils/auth";

export default function Costumers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = React.useState([]);

  const [totalCustomers, setTotalCustomers] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);

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

  const handleDeleteCustomer = async (customerId) => {
    if (customerId) {
      try {
        const response = await deleteCustomer(customerId);
        setAlertMessage("Cliente eliminado exitosamente");
        setAlertSeverity("success");
        handleClickAlert();
        fetchCustomers();
      } catch (error) {
        setAlertMessage("Error al eliminar el cliente");
        setAlertSeverity("error");
        handleClickAlert();
      }
    }
  };

  const fetchCustomers = async (overrideParams = {}) => {
    try {
      const response = await searchCustomers({
        search,
        page: page,
        limit: rowsPerPage,
        ...overrideParams,
      });

      setCustomers(response.customers);
      setTotalCustomers(response.pagination.total);
    } catch (error) {
      setAlertMessage("Error buscando los clientes");
      setAlertSeverity("error");
      handleClickAlert();
    }
  };

  React.useEffect(() => {
    if (isAuthenticated()) {
      fetchCustomers();
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
        fetchCustomers={fetchCustomers}
        handleClickOpen={handleClickOpen}
        setSelectedClient={setSelectedClient}
        rowsPerPage={rowsPerPage}
      />
      <CostumerList
        customers={customers}
        totalCustomers={totalCustomers}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        handleClickOpen={handleClickOpen}
        handleDeleteCustomer={handleDeleteCustomer}
      />
      <CustomerModal
        handleClose={handleClose}
        open={open}
        selectedClient={selectedClient}
        fetchCustomers={fetchCustomers}
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
