import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/router';

export default function Auth() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#121212"
      color="#e0e0e0"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="300px"
        p={4}
        bgcolor="#1e1e1e"
        borderRadius="8px"
      >
        <Typography variant="h4" align="center">
          Admin Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          variant="outlined"
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: '#e0e0e0' } }}
          InputProps={{
            style: { color: '#e0e0e0' },
            sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } },
          }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: '#e0e0e0' } }}
          InputProps={{
            style: { color: '#e0e0e0' },
            sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } },
          }}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
