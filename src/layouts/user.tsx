import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { FiPlusSquare } from 'react-icons/fi';
import { GoDeviceCameraVideo, GoGlobe, GoHome, GoSearch } from 'react-icons/go';
import { MdInsertChartOutlined } from 'react-icons/md';
import { RiNotification3Line } from 'react-icons/ri';

import { GlobalSpinner } from '@/components/common/spinner';
import { ThemeSwitch } from '@/components/common/theme-switch';
import axiosClient from '@/lib/axios-client';
import localStorageHelper from '@/lib/local-storage';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router';
import { LogOutIcon } from 'lucide-react';

export default function UserLayout() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isNavigating = Boolean(navigation.location);

  const userData = localStorageHelper.get('user');

  const triggerLogout = async () => {
    try {
      await axiosClient.post(`/auth/logout`);
      localStorageHelper.remove('user');
      localStorageHelper.remove('media');
      localStorageHelper.remove('current-media');
      void navigate('/', { replace: true });
    } catch (error: any) {
      console.error('🚀 Error :', error);
    }
  };

  return (
    <div className="flex w-full h-svh relative">
      <div className="sm:hidden flex flex-row items-center justify-center border-b border-b-foreground/50 py-2 h-[var(--header-height)] w-full">
        <span className="text-lg font-merienda font-bold text-left mr-2">Social Insights</span>
        <ThemeSwitch />
      </div>
      <div className="absolute top-[var(--header-height)] sm:top-0 flex sm:flex-row flex-col-reverse sm:h-[calc(100%_-_0px)] h-[calc(100%_-_var(--header-height))] w-full">
        {/* <div className="flex sm:flex-row flex-col-reverse w-full"> */}
        <div className="sm:w-[var(--aside-width-open)] w-full bg-background sm:h-full flex justify-start items-start flex-row sm:flex-col sm:border-r sm:border-t-0 border-t border-t-foreground/50 sm:px-4 px-2 z-50">
          <div className="sm:flex flex-row items-center hidden">
            <span className="text-xl font-merienda my-8 font-bold text-left mr-2">Social Insights</span>
            <ThemeSwitch />
          </div>
          <div className="flex sm:flex-col flex-row justify-between sm:items-starts items-center sm:py-4 p-2 w-full h-full">
            <div className="sm:pt-4 flex sm:flex-col flex-row sm:gap-y-10 gap-x-1 sm:justify-start justify-between sm:items-start items-center w-full">
              <div className="flex flex-row sm:w-full items-center sm:justify-start justify-center gap-6">
                <GoHome size={24} /> <span className="text-lg hidden sm:flex">Home</span>
              </div>
              <div className="flex flex-row sm:w-full items-center sm:justify-start justify-center gap-6">
                <GoSearch size={24} /> <span className="text-lg hidden sm:flex">Search</span>
              </div>
              <div className="flex-row sm:w-full items-center sm:justify-start justify-center gap-6 hidden sm:flex">
                <GoGlobe size={24} /> <span className="text-lg">Explore</span>
              </div>
              <div className="flex flex-row sm:w-full items-center sm:justify-start justify-center gap-6">
                <GoDeviceCameraVideo size={24} /> <span className="text-lg hidden sm:flex">Reels</span>
              </div>
              <div className="flex flex-row sm:w-full items-center sm:justify-start justify-center gap-6">
                <BiMessageRoundedDetail size={24} /> <span className="text-lg hidden sm:flex">Messages</span>
              </div>
              <div className=" flex-row sm:w-full items-center sm:justify-start justify-center gap-6 hidden sm:flex">
                <RiNotification3Line size={24} /> <span className="text-lg">Notifications</span>
              </div>
              <div className=" flex-row sm:w-full items-center sm:justify-start justify-center gap-6 hidden sm:flex">
                <FiPlusSquare size={24} /> <span className="text-lg">Create</span>
              </div>
              <div className=" flex-row sm:w-full items-center sm:justify-start justify-center gap-6 hidden sm:flex">
                <MdInsertChartOutlined size={24} /> <span className="text-lg">Dashboard</span>
              </div>
              {userData && (
                <Link to={`/user/${userData.user_id}`} className="flex flex-row sm:w-full items-center sm:justify-start justify-center gap-4">
                  <Avatar>
                    <AvatarImage src={userData.profile_picture_url} alt="pp" className="w-full h-full rounded-full border border-foreground" />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-bold hidden sm:flex">Profile</span>
                </Link>
              )}
              <Button className="sm:hidden block" variant="default" size="sm" onClick={triggerLogout}>
                <LogOutIcon />
              </Button>
            </div>
            <Button className="sm:flex sm:flex-row sm:items-center sm:justify-center hidden" variant="default" onClick={triggerLogout}>
              <LogOutIcon /> <span className="text-sm">Logout</span>
            </Button>
          </div>
        </div>
        <div id="outlet" className=" sm:w-[calc(100%_-_var(--aside-width-open))] w-full h-full flex justify-center items-center p-2 overflow-auto">
          {isNavigating && <GlobalSpinner />}
          <Outlet />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
