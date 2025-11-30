import React from "react";
import SearchBox from "./components/SearchBox";
import CostumerList from "./components/CostumerList";
import { searchCustomers } from "../../API/CustomerAPI";
import CustomerModal from "./components/CustomerModal";

export default function Costumers() {
  const [customers, setCustomers] = React.useState([]);

  const [totalCustomers, setTotalCustomers] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      console.error("Error fetching customers:", error);
    }
  };

  React.useEffect(() => {
    fetchCustomers();
  }, [page, rowsPerPage]);
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
        setSelectedClient={setSelectedClient}
        handleClickOpen={handleClickOpen}
      />
      <CustomerModal
        handleClose={handleClose}
        open={open}
        selectedClient={selectedClient}
        fetchCustomers={fetchCustomers}
      />
    </>
  );
}
