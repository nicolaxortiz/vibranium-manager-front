import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";

const SlideTransition = forwardRef(function SlideTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GeneralAlert({
  openAlert,
  handleCloseAlert,
  alertMessage,
  alertSeverity,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={
        isMobile
          ? { vertical: "up", horizontal: "center" }
          : { vertical: "bottom", horizontal: "right" }
      }
      slots={{ transition: Slide }}
    >
      <Alert
        onClose={handleCloseAlert}
        severity={alertSeverity}
        variant="outlined"
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
