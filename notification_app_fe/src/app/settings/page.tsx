"use client";

import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import { Logger } from "logging-middleware";

export default function SettingsPage() {
  const [token, setToken] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existingToken = localStorage.getItem("access_token");
    if (existingToken) setToken(existingToken);
  }, []);

  const handleSave = () => {
    const cleanToken = token.trim().replace(/[\r\n]+/g, '');
    localStorage.setItem("access_token", cleanToken);
    Logger.init(cleanToken, "/api/evaluation/logs");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          API Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please enter your evaluation access token below. This is required to fetch notifications and send logs.
        </Typography>
        
        <TextField
          fullWidth
          label="Access Token (Bearer)"
          variant="outlined"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          sx={{ mb: 3 }}
        />
        
        <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
          Save Token
        </Button>

        {saved && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Token saved successfully!
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
