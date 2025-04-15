import { GlobalSpinner } from '@/components/common/spinner';
import { Outlet, useNavigation } from 'react-router';

export default function GuestLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="flex h-svh w-full  justify-center items-center p-4">
      {isNavigating && <GlobalSpinner />}
      <Outlet />
    </div>
  );
}
