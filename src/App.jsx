import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";
import CreateDocument from "./components/CreateDocument/CreateDocument";
import Banner from "./components/Banner.jsx";
import SideMenu from "./components/SideMenu.jsx";
import DocumentList from "./components/DocumentList/DocumentList.jsx";
import Costumers from "./components/Costumers/Costumers.jsx";
import Products from "./components/Products/Products.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login/Login.jsx";
import { getCurrentUser, logout } from "./utils/auth.js";

function App() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(getCurrentUser());

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChanged", handleStorageChange);
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {user && <Banner setOpen={setOpen} user={user} logout={logout} />}

      <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <BrowserRouter>
          <SideMenu open={open} toggleDrawer={toggleDrawer} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/create-document"
              element={<CreateDocument mode="create" />}
            />
            <Route
              path="/update-document/:id"
              element={<CreateDocument mode="edit" />}
            />
            <Route path="/document-list" element={<DocumentList />} />
            <Route path="/customers" element={<Costumers />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </Box>

      {user && <Footer />}
    </Box>
  );
}

export default App;
