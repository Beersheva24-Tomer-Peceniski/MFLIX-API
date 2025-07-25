import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <header>My MFLIX Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}