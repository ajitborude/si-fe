import { GlobalSpinner } from '@/components/common/spinner';
import { ThemeSwitch } from '@/components/common/theme-switch';
import { Outlet, useNavigation } from 'react-router';

export default function GuestLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="flex h-svh w-full justify-center items-center p-4 relative">
      <div className="absolute bottom-4 right-4">
        <ThemeSwitch />
      </div>
      {isNavigating && <GlobalSpinner />}
      <Outlet />
    </div>
  );
}
