import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/forgot-password', { email });
      setSuccess('Reset link sent! Check your email.');
    } catch {
      setSuccess('Error sending reset link.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5">Forgot Password</Typography>
        <TextField
          fullWidth label="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} margin="normal"
        />
        <Button variant="contained" fullWidth onClick={handleSend}>Send Reset Link</Button>
        {success && <Typography color="green">{success}</Typography>}
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
