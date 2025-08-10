
import { Box, Button, TextField, Typography, Paper, Stack, CircularProgress, Grid } from '@mui/material';
import useLogin from '../hooks/useLogin';
import cinemaImg from '../assets/cinema.jpg';
import mflixLogo from '../assets/mflix-logo.png';

export default function LoginPage() {
  const {
    login,
    signup,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    name,
    setName,
    setConfirmPassword,
    isSignUp,
    switchToSignUp,
    switchToLogin,
    error,
    loading
  } = useLogin();

  return (
    <Grid container sx={{ minHeight: '100vh', minWidth: '100vw', background: 'black' }}>
      <Grid size={{ xs: 0, md: 6 }} sx={{
        display: { xs: 'none', md: 'block' },
        position: 'relative',
        minHeight: '100vh',
        background: 'black',
        p: 0,
      }}>
        <Box sx={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src={cinemaImg}
            alt="Cinema"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.7)',
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.1) 100%)',
          }} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(7, 10, 20, 0.67)' }}>
        <Box sx={{ width: '100%', maxWidth: 420, mx: 4 }}>
          <Paper elevation={8} sx={{ p: 5, borderRadius: 4, boxShadow: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <img src={mflixLogo} alt="MFLIX Logo" style={{ width: 64, height: 64, marginBottom: 8 }} />
              <Typography variant="h4" align="center" fontWeight={700} gutterBottom color="rgba(7, 10, 20, 0.67)">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </Typography>
              <Typography variant="subtitle1" align="center" color="rgba(7, 10, 20, 0.67)" mb={1}>
                {isSignUp ? 'Sign up for your MFLIX account' : 'Sign in to your MFLIX account'}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" mb={2}>
                The best place to discover and review movies
              </Typography>
            </Box>
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
                sx={{
                  background: '#f8fafc',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#333',
                    },
                  },
                  '& label.Mui-focused': {
                    color: '#333',
                  },
                }}
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
                sx={{
                  background: '#f8fafc',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#333',
                    },
                  },
                  '& label.Mui-focused': {
                    color: '#333',
                  },
                }}
              />
              {isSignUp && (
                <>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    fullWidth
                    error={!!error.confirmPasswordError}
                    helperText={error.confirmPasswordError}
                    sx={{
                      background: '#f8fafc',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#333',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#333',
                      },
                    }}
                  />
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    error={!!error.nameError}
                    helperText={error.nameError}
                    sx={{
                      background: '#f8fafc',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#333',
                        },
                      },
                      '& label.Mui-focused': {
                        color: '#333',
                      },
                    }}
                  />
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={isSignUp ? signup : login}
                disabled={loading}
                sx={{ mt: 1, borderRadius: 2, fontWeight: 600, fontSize: '1rem', boxShadow: 2, background: 'rgba(7, 10, 20, 0.67)' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
              {!isSignUp ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={switchToSignUp}
                  disabled={loading}
                  sx={{ borderRadius: 2, fontWeight: 600, fontSize: '1rem', background: 'rgba(7, 10, 20, 0.67)' }}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={switchToLogin}
                  disabled={loading}
                  sx={{ borderRadius: 2, fontWeight: 600, fontSize: '1rem', background: 'rgba(7, 10, 20, 0.67)' }}
                >
                  Back to Login
                </Button>
              )}
              {error.general && (
                <Box color="error.main" textAlign="center" mt={1}>{error.general}</Box>
              )}
            </Stack>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}