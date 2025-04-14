import { Outlet } from 'react-router';

export default function GuestLayout() {
  return (
    <div className="flex h-svh w-full  justify-center items-center border-4 border-red-400 border-solid p-4">
      <Outlet />
    </div>
  );
}
