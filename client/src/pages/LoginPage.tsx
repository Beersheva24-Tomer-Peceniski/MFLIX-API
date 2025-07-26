import { Box, Button, TextField, Typography, Paper, Stack, CircularProgress } from '@mui/material';
import useLogin from '../hooks/useLogin';

export default function LoginPage() {
  const { login, email, setEmail, password, setPassword, error, loading } = useLogin();

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            autoFocus
            error={!!error.emailError}
            helperText={error.emailError}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            error={!!error.passwordError}
            helperText={error.passwordError}
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={login}
              disabled={loading}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              disabled={loading}
            >
              Sign Up
            </Button>
          </Stack>
          {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
          {error.general && (
            <Box color="error.main" textAlign="center">{error.general}</Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}