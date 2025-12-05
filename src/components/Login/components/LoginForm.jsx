import React, { useState } from "react";
import {
  Box,
  Collapse,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm({
  handleSubmitSignIn,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (error != "") {
      setOpen(true);
    }
  }, [error]);

  return (
    <Box component="form" onSubmit={handleSubmitSignIn} sx={{ mt: 3 }}>
      {error && (
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 1 }}
            >
              {error === 404
                ? "Correo electronico o contraseña incorrectos"
                : "Error de servidor, intentelo mas tarde"}
            </Alert>
          </Collapse>
        </Box>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
      </Button>

      <Grid container spacing={1}>
        <Grid item size={12} align="center">
          <Link href="#" variant="body2">
            ¿Olvidaste tu contraseña?
          </Link>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        © {new Date().getFullYear()} Vibranium Fitness
      </Typography>
    </Box>
  );
}
