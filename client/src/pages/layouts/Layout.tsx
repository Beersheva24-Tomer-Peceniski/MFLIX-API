import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import { useUserData } from '../../state-management/user';

export default function Layout() {
  const location = useLocation();
  const token = useUserData(state => state.token);
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

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateRows: '50px 1fr',
        gridTemplateColumns: '270px 1fr',
        overflow: 'hidden', 
        position: 'fixed', 
        top: 0,
        left: 0
      }}
    >
      <Box 
        gridColumn="1 / span 2" 
        bgcolor="#333" 
        color="#fff" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        sx={{ overflow: 'hidden' }}
      >
        <Header/>
      </Box>

      <Box 
        gridRow="2" 
        gridColumn="1" 
        bgcolor="#111" 
        color="#fff"
        sx={{ overflow: 'hidden' }}
      >
        <SideNav />
      </Box>

      <Box 
        gridRow="2" 
        gridColumn="2" 
        bgcolor="#f5f5f5"
        sx={{ 
          overflow: 'auto', // Only this area scrolls
          height: '100%',
          width: '100%'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
