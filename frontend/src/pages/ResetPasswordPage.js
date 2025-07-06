import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleReset = async () => {
    try {
      await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { password });
      setStatus('Password reset successfully!');
    } catch {
      setStatus('Error resetting password.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5">Reset Password</Typography>
        <TextField
          fullWidth label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" fullWidth onClick={handleReset}>Reset</Button>
        {status && <Typography>{status}</Typography>}
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
