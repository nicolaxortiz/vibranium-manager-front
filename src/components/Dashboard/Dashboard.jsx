import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import GroupBox from "./components/GroupBox";
import { getDashboardStats } from "../../API/DashboardAPI";

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  return (
    <>
      <GroupBox stats={stats} />
    </>
  );
}
