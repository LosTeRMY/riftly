import { Outlet } from "react-router-dom";

export default function BareLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-on-surface">
      <Outlet />
    </div>
  );
}
