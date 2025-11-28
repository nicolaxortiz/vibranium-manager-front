import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateDocument from "./components/CreateDocument/CreateDocument";
import Banner from "./components/Banner.jsx";
import SideMenu from "./components/SideMenu.jsx";
import DocumentList from "./components/DocumentList/DocumentList.jsx";

function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Banner setOpen={setOpen} />
      <BrowserRouter>
        <SideMenu open={open} toggleDrawer={toggleDrawer} />
        <Routes>
          <Route path="/" element={<CreateDocument mode="create" />} />
          <Route
            path="/update-document/:id"
            element={<CreateDocument mode="edit" />}
          />
          <Route path="/document-list" element={<DocumentList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
