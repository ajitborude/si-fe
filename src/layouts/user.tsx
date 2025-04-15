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
import { Outlet, useNavigate, useNavigation } from 'react-router';

export default function UserLayout() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isNavigating = Boolean(navigation.location);

  const userData = localStorageHelper.get('user');

  const triggerLogout = async () => {
    try {
      await axiosClient.post(`/auth/logout`);
      await navigate('/', { replace: true });
    } catch (error: any) {
      console.error('🚀 Error :', error);
    }
  };

  return (
    <div className="flex w-full h-svh relative ">
      <div className="absolute top-[var(--header-height)] flex flex-row h-[calc(100%_-_var(--header-height))] w-full">
        <div id="sidebar" className="w-[var(--aside-width-open)] bg-background h-full flex justify-start items-start flex-col border-r px-4">
          <div className="flex flex-row items-center">
            <span className="text-xl font-merienda my-8 font-bold text-left mr-2">Social Insights</span>
            <ThemeSwitch />
          </div>
          <div className="flex flex-col justify-between items-start h-full py-4">
            <div className="pt-4 flex flex-col gap-y-10 justify-start items-start">
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <GoHome size={24} /> <span className="text-lg">Home</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <GoSearch size={24} /> <span className="text-lg">Search</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <GoGlobe size={24} /> <span className="text-lg">Explore</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <GoDeviceCameraVideo size={24} /> <span className="text-lg">Reels</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <BiMessageRoundedDetail size={24} /> <span className="text-lg">Messages</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <RiNotification3Line size={24} /> <span className="text-lg">Notifications</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <FiPlusSquare size={24} /> <span className="text-lg">Create</span>
              </div>
              <div className="flex flex-row w-full items-center justify-start gap-6">
                <MdInsertChartOutlined size={24} /> <span className="text-lg">Dashboard</span>
              </div>
              {/* {userData && ( */}
              <div className="flex flex-row w-full items-center justify-start gap-4">
                <Avatar>
                  <AvatarImage src={userData.profile_picture_url} alt="pp" className="w-full h-full rounded-full border border-foreground" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <span className="text-lg font-bold">Profile</span>
              </div>
              {/* )} */}
            </div>
            <Button className="mt-2" variant="default" size="sm" onClick={triggerLogout}>
              Logout
            </Button>
          </div>
        </div>
        <div id="outlet" className=" w-[calc(100%_-_var(--aside-width-open))] h-full flex justify-center items-center p-2">
          {isNavigating && <GlobalSpinner />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
