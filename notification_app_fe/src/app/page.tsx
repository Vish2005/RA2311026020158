"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from "@mui/material";
import NotificationCard from "@/components/NotificationCard";
import { Log } from "logging-middleware";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("All");
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    setToken(t || "");
    const viewed = JSON.parse(localStorage.getItem("viewed_notifications") || "[]");
    setViewedIds(viewed);
  }, []);

  const fetchNotifications = async (currentPage: number, type: string) => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      let url = `/api/evaluation/notifications?page=${currentPage}&limit=10`;
      if (type !== "All") {
        url += `&notification_type=${type}`;
      }

      const cleanToken = token.trim().replace(/[\r\n]+/g, '');
      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${cleanToken}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (currentPage === 1) {
          setNotifications(data.notifications);
        } else {
          setNotifications(prev => [...prev, ...data.notifications]);
        }
      }
    } catch (err) {
      console.error("Fetch error", err);
      Log("frontend", "error", "page", "Failed to fetch all notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications(page, filterType);
      Log("frontend", "info", "page", `Fetched p.${page} filter:${filterType.substring(0, 3)}`);
    }
  }, [page, filterType, token]);

  const handleNotificationClick = (id: string) => {
    if (!viewedIds.includes(id)) {
      const newViewed = [...viewedIds, id];
      setViewedIds(newViewed);
      localStorage.setItem("viewed_notifications", JSON.stringify(newViewed));
      Log("frontend", "info", "component", `Viewed ${id.substring(0,8)}`);
    }
  };

  if (!token) {
    return <Typography color="error">Please set your access token in Settings first.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>All Notifications</Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={filterType}
            label="Filter by Type"
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {notifications.map((n, index) => (
        <NotificationCard
          key={`${n.ID}-${index}`}
          id={n.ID}
          type={n.Type}
          message={n.Message}
          timestamp={n.Timestamp}
          isViewed={viewedIds.includes(n.ID)}
          onClick={handleNotificationClick}
        />
      ))}

      {loading && <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}><CircularProgress /></Box>}

      {!loading && notifications.length > 0 && (
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={() => setPage(p => p + 1)}
          sx={{ mt: 2 }}
        >
          Load More
        </Button>
      )}

      {!loading && notifications.length === 0 && (
        <Typography sx={{ textAlign: "center" }} color="text.secondary">No notifications found.</Typography>
      )}
    </Box>
  );
}
