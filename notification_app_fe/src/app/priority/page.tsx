"use client";

import { useState, useEffect } from "react";
import { Box, Typography, TextField, CircularProgress, Alert } from "@mui/material";
import NotificationCard from "@/components/NotificationCard";
import { Log } from "logging-middleware";

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState(10);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [token, setToken] = useState("");

  const TYPE_WEIGHTS: Record<string, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    setToken(t || "");
    const viewed = JSON.parse(localStorage.getItem("viewed_notifications") || "[]");
    setViewedIds(viewed);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchAllAndSort = async () => {
      setLoading(true);
      try {
        const cleanToken = token.trim().replace(/[\r\n]+/g, '');
        const res = await fetch(`/api/evaluation/notifications`, {
          headers: { "Authorization": `Bearer ${cleanToken}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          let sorted = data.notifications.sort((a: any, b: any) => {
            const weightA = TYPE_WEIGHTS[a.Type] || 0;
            const weightB = TYPE_WEIGHTS[b.Type] || 0;
            
            if (weightA !== weightB) {
              return weightB - weightA;
            }
            if (a.Timestamp > b.Timestamp) return -1;
            if (a.Timestamp < b.Timestamp) return 1;
            return 0;
          });
          
          setNotifications(sorted);
          Log("frontend", "info", "page", `Loaded top ${topN} priority`);
        }
      } catch (err) {
        console.error("Fetch error", err);
        Log("frontend", "error", "page", "Failed to fetch priority");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAndSort();
  }, [token]);

  const handleNotificationClick = (id: string) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      localStorage.setItem("viewed_notifications", JSON.stringify(newViewed));
      Log("frontend", "info", "component", `Viewed prio ${id.substring(0,8)}`);
    }
  };

  if (!token) {
    return <Typography color="error">Please set your access token in Settings first.</Typography>;
  }

  const displayedNotifications = notifications.slice(0, topN);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Priority Inbox</Typography>
        <TextField
          label="Top 'N' Limit"
          type="number"
          size="small"
          value={topN}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val > 0) {
              setTopN(val);
              Log("frontend", "info", "page", `Limit set to ${val}`);
            }
          }}
          sx={{ width: 120 }}
          slotProps={{ htmlInput: { min: 1 } }}
        />
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        Showing the top {topN} most important unread and read notifications based on weight (Placement &gt; Result &gt; Event) and recency.
      </Alert>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}><CircularProgress /></Box>
      ) : (
        displayedNotifications.map((n, index) => (
          <NotificationCard
            key={`${n.ID}-${index}`}
            id={n.ID}
            type={n.Type}
            message={n.Message}
            timestamp={n.Timestamp}
            isViewed={viewedIds.includes(n.ID)}
            onClick={handleNotificationClick}
          />
        ))
      )}
    </Box>
  );
}
