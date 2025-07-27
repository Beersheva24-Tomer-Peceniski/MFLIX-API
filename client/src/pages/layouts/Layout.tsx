import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header';

export default function Layout() {
  const location = useLocation();
  const authOnlyRoutes = ['/login', '/signup'];

  const isAuthPage = authOnlyRoutes.includes(location.pathname);

  if (isAuthPage) {
    return (
      <Box
        minHeight="100vh"
        minWidth="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Outlet />
      </Box>
    );
  }

  // Full layout for other pages
  return (
    <Box
      display="grid"
      gridTemplateRows="50px 1fr"
      gridTemplateColumns="270px 1fr"
    >
      <Box gridColumn="1 / span 2" bgcolor="#333" color="#fff" display="flex" alignItems="center" justifyContent="center">
        <Header/>
      </Box>

      <Box gridRow="2" gridColumn="1" bgcolor="#111" color="#fff" p={2}>
        Side Nav
      </Box>

      <Box gridRow="2" gridColumn="2" p={2} bgcolor="#f5f5f5">
        <Outlet />
      </Box>
    </Box>
  );
}
