import { Separator } from '@/components/ui/separator';
import axiosClient from '@/lib/axios-client';
import localStorageHelper from '@/lib/local-storage';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import MediaCard from './components/media-card';

function UserPage() {
  const loaderData = useLoaderData();
  const [mediaList, setMedia] = useState([]);

  const getUserMedia = async () => {
    try {
      const response = await axiosClient.get(`/instagram/media`);
      localStorageHelper.set('media', response.data.data.media);
      setMedia(response.data.data.media);
    } catch (error: any) {
      console.error('🚀 Error :', error);
      // throw data(error.response.̦data.error);
    }
  };

  useEffect(() => {
    void getUserMedia();
  }, []);

  return (
    <div className="flex items-center justify-start flex-col w-full h-full p-4 max-w-4xl">
      <div className="flex flex-row justify-center items-center gap-x-12 mb-12">
        <div className="w-36 h-36 mt-2">
          <img src={loaderData.userData.profile_picture_url} alt="pp" className="w-full h-full rounded-full" />
        </div>
        <div className="flex flex-col mt-1 ml-4 gap-y-4">
          <span className="text-md font-medium">@{loaderData.userData.username}</span>
          <div className="flex flex-row flex-nowrap gap-12">
            <span className="font-medium text-sm">{loaderData.userData.media_count} Post</span>
            <span className="font-medium text-sm">
              {loaderData.userData.followers_count} {loaderData.userData.followers_count < 2 ? 'Follower' : 'Followers'}
            </span>
            <span className="font-medium text-sm">{loaderData.userData.follows_count} Following</span>
          </div>
          <span className="font-bold text-lg">{loaderData.userData.name}</span>
          <span className="font-bold text-lg">{loaderData.userData.biography}</span>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-3 gap-1 justify-center items-center w-full overflow-auto ">
        {mediaList &&
          mediaList.map((media: any, ind: number) => {
            return <MediaCard key={media.id} currentIndex={ind} />;
          })}
      </div>
    </div>
  );
}

export default UserPage;
