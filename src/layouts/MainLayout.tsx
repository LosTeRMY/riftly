import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="relative h-screen flex flex-col bg-background text-on-surface">
      <Nav />
      <Outlet />
    </div>
  );
}