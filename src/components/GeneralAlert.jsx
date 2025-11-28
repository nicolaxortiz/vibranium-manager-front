import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";

const SlideTransition = forwardRef(function SlideTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GeneralAlert({
  openAlert,
  handleClose,
  alertMessage,
  alertSeverity,
}) {
  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      slots={{ transition: Slide }}
    >
      <Alert
        onClose={handleClose}
        severity={alertSeverity}
        variant="outlined"
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
