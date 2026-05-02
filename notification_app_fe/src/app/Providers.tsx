"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { Logger } from "logging-middleware";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f4f6f8" }
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  }
});

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      Logger.init(token.trim().replace(/[\r\n]+/g, ''), "/api/evaluation/logs");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
