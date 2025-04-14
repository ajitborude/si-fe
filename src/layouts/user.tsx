import { Button } from '@/components/ui/button';
import { Link, Outlet } from 'react-router';

export default function UserLayout() {
  return (
    <div className="flex w-full h-svh relative border-4 border-green-400 border-solid">
      <div className="absolute top-[var(--header-height)] flex flex-row h-[calc(100%_-_var(--header-height))] w-full">
        <div id="sidebar" className="w-[var(--aside-width-open)] bg-background h-full flex justify-center items-center flex-col border-r">
          <span>xSidebar</span>
          <Button asChild className="mt-2" variant="default">
            <Link to="/"> Back To Login</Link>
          </Button>
        </div>
        <div id="outlet" className=" w-[calc(100%_-_var(--aside-width-open))] h-full flex justify-center items-center p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
