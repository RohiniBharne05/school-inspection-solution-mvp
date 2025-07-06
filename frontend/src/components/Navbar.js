import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e88e5' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          School Inspection Platform
        </Typography>

        {user ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/schools">Schools</Button>
            <Button color="inherit" component={Link} to="/inspectors">Inspectors</Button>
            <Button color="inherit" component={Link} to="/reports">Reports</Button>
            <Button color="inherit" component={Link} to="/plans">Plans</Button>
            <Button color="inherit" component={Link} to="/checklist">Checklist</Button>

            <Box sx={{ ml: 2, mr: 2 }}>
              <Typography variant="body2">Hi, {user.name || user.email}</Typography>
            </Box>

            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/forgot-password">Forgot Password</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
