"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <NotificationsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Campus Hub
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            href="/" 
            color="inherit"
            sx={{ fontWeight: pathname === "/" ? "bold" : "normal", borderBottom: pathname === "/" ? "2px solid white" : "none", borderRadius: 0 }}
          >
            All Notifications
          </Button>
          <Button 
            component={Link} 
            href="/priority" 
            color="inherit"
            sx={{ fontWeight: pathname === "/priority" ? "bold" : "normal", borderBottom: pathname === "/priority" ? "2px solid white" : "none", borderRadius: 0 }}
          >
            Priority Inbox
          </Button>
          <Button 
            component={Link} 
            href="/settings" 
            color="inherit"
            sx={{ fontWeight: pathname === "/settings" ? "bold" : "normal", borderBottom: pathname === "/settings" ? "2px solid white" : "none", borderRadius: 0 }}
          >
            Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
