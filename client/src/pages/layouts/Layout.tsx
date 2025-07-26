import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <header>My MFLIX Header</header>
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#222',
          minWidth: "100%",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}