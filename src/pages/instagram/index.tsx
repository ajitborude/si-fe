import { Button } from '@/components/ui/button';
import axiosClient from '@/lib/axios-client';
import { data, LoaderFunctionArgs, redirect } from 'react-router';

export const instagramPageLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const type = params.type;
  const url = new URL(request.url);
  if (type === 'callback') {
    const code = url.searchParams.get('code') || null;
    try {
      const response = await axiosClient.get(`/auth/instagram-verify?code=${code}`);
      return redirect(response.data.redirectTo);
    } catch (error: any) {
      console.log('Error : ', error.response);
      throw data(error.response);
    }
  }
};

function InstagramPage() {
  const getUser = async () => {
    try {
      const response = await axiosClient.get(`/user?username=social_insights_1`);
      return { userData: response.data.data };
    } catch (error: any) {
      console.log(error);
      throw data(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col  w-full h-full">
      <span> Instagram Login Page</span>
      <Button className="btn btn-ghost border border-neutral mt-4" onClick={getUser}>
        Get User
      </Button>
    </div>
  );
}

export default InstagramPage;
