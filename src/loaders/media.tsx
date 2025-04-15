import axiosClient from '@/lib/axios-client';
import localStorageHelper from '@/lib/local-storage';
import { data, LoaderFunctionArgs } from 'react-router';

export default async function mediaPageLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await axiosClient.get(`/instagram/media/${params.mediaId}`);
    localStorageHelper.set('current-media', response.data.data);
    return { mediaData: response.data.data };
  } catch (error: any) {
    console.error('🚀 Error :', error);
    throw data(error.response.data.error);
  }
}
