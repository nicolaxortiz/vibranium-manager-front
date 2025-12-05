import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import logo from "../../assets/logo-vibranium.png";
import LoginForm from "./components/LoginForm";
import { signIn } from "../../API/UserAPI";

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await signIn({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
        })
      );

      window.dispatchEvent(new Event("userChanged"));
      navigate("/create-document");
    } catch (error) {
      setError(error.response.status);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e40af 0%, #60a5fa 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{ p: 6, width: isMobile ? "70%" : 400, borderRadius: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ width: 200 }} />

          <LoginForm
            handleSubmitSignIn={handleSubmitSignIn}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            error={error}
          />
        </Box>
      </Paper>
    </Box>
  );
}
