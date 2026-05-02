"use client";

import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import SchoolIcon from '@mui/icons-material/School';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface NotificationProps {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  isViewed: boolean;
  onClick: (id: string) => void;
}

export default function NotificationCard({ id, type, message, timestamp, isViewed, onClick }: NotificationProps) {
  
  const getIcon = () => {
    switch (type) {
      case "Event": return <EventIcon />;
      case "Result": return <SchoolIcon />;
      case "Placement": return <AssuredWorkloadIcon />;
      default: return <EventIcon />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "Event": return "info";
      case "Result": return "warning";
      case "Placement": return "success";
      default: return "default";
    }
  };

  return (
    <Card 
      onClick={() => onClick(id)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
        borderLeft: isViewed ? 'none' : '4px solid #1976d2',
        bgcolor: isViewed ? '#ffffff' : '#f8faff'
      }}
    >
      <CardContent sx={{ pb: "16px !important" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!isViewed && <FiberManualRecordIcon color="primary" sx={{ fontSize: 12 }} />}
            <Chip 
              icon={getIcon()} 
              label={type} 
              color={getColor() as any} 
              size="small" 
              variant={isViewed ? "outlined" : "filled"}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {new Date(timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: isViewed ? 'normal' : '500', color: isViewed ? 'text.secondary' : 'text.primary' }}>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
}
