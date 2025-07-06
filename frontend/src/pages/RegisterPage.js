import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/register', form);
      setMessage('Registration successful. You can now login.');
    } catch (err) {
      setMessage('Registration failed. Try different email.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5">Register</Typography>
        <TextField fullWidth name="name" label="Name" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="email" label="Email" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="password" label="Password" type="password" margin="normal" onChange={handleChange} />
        <TextField
          select fullWidth name="role" label="Role" margin="normal" onChange={handleChange}
        >
          <MenuItem value="supervisor">Supervisor</MenuItem>
          <MenuItem value="inspector">Inspector</MenuItem>
        </TextField>
        <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
        {message && <Typography>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default RegisterPage;
