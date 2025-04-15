import axiosClient from '@/lib/axios-client';
import { data, LoaderFunctionArgs, redirect } from 'react-router';

export default async function instagramPageLoader({ request, params }: LoaderFunctionArgs) {
  const type = params.type;
  const url = new URL(request.url);
  if (type === 'callback') {
    const code = url.searchParams.get('code') || null;
    try {
      const response = await axiosClient.get(`/auth/instagram-verify?code=${code}`);
      return redirect(response.data.redirectTo);
    } catch (error: any) {
      console.error('🚀 Error :', error);
      throw data(error.response);
    }
  }
}
