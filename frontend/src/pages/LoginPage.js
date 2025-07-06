import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';

const LoginPage = () => {
    const { setUser } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);

      if (payload.role === 'supervisor') navigate('/dashboard');
      else alert('Unauthorized role');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth label="Email" margin="normal"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth label="Password" type="password" margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
