import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery, useTheme } from "@mui/material";
import GroupBox from "./components/GroupBox";
import { getDashboardStats } from "../../API/DashboardAPI";
import { isAuthenticated } from "../../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats(year);
        setStats(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchStats();
  }, [year]);
  return (
    <>
      <GroupBox stats={stats} year={year} setYear={setYear} loading={loading} />
    </>
  );
}
