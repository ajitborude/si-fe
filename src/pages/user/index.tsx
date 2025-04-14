import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosClient from '@/lib/axios-client';
import { useEffect, useState } from 'react';
import { data, useLoaderData } from 'react-router';

export async function userPageLoader() {
  try {
    const response = await axiosClient.get(`/user`);
    return { userData: response.data.data };
  } catch (error: any) {
    console.log(error);
    throw data(error.response.data.error);
  }
}

function UserPage() {
  const loaderData = useLoaderData();
  const [commentReply, setCommentReply] = useState('');

  const getUserMedia = async () => {
    try {
      const response = await axiosClient.get(`/instagram/media`);
      console.log(response);
    } catch (error: any) {
      console.log('🚀 ~ getUserMedia ~ error:', error);
      // throw data(error.response.data.error);
    }
  };
  const getMediaComments = async () => {
    try {
      const response = await axiosClient.get(`/instagram/media/18079536832733820/comments`);
      console.log(response);
    } catch (error: any) {
      console.log('🚀 ~ comments ~ error:', error);
      // throw data(error.response.data.error);
    }
  };

  const replyToComment = async () => {
    try {
      const response = await axiosClient.post(`/instagram/comment/17905797648038560/reply`, { message: commentReply });
      console.log(response);
    } catch (error: any) {
      console.log('🚀 ~ comments ~ error:', error);
      // throw data(error.response.data.error);
    }
  };
  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <div className="flex items-start justify-start flex-col w-full h-full">
      <div className="flex flex-row justify-center items-start">
        <div className="w-32 h-32 mt-2">
          <img src={loaderData.userData.profile_picture_url} className="w-full h-full rounded-full"></img>
        </div>
        <div className="flex flex-col mt-1 ml-4 gap-y-2">
          <span className="text-md font-medium">@{loaderData.userData.username}</span>
          <div className="flex flex-row flex-nowrap gap-2">
            <span className="font-medium text-sm">{loaderData.userData.media_count} Post</span>
            <span className="font-medium text-sm">
              {loaderData.userData.followers_count} {loaderData.userData.followers_count < 2 ? 'Follower' : 'Followers'}
            </span>
            <span className="font-medium text-sm">{loaderData.userData.follows_count} Following</span>
          </div>
          <span className="font-bold text-xl">{loaderData.userData.name}</span>
        </div>
      </div>
      <Button className="btn btn-ghost border border-neutral mt-4" onClick={getUserMedia}>
        Get User Media
      </Button>
      <Button className="btn btn-ghost border border-neutral mt-4" onClick={getMediaComments}>
        Get Media Comments
      </Button>
      <div className="flex flex-row gap-2 mt-4">
        <Input placeholder="Reply" type="text" onChange={(e) => setCommentReply(e.target.value)} />
        <Button onClick={replyToComment}>Reply</Button>
      </div>
    </div>
  );
}

export default UserPage;
