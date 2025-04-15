import axiosClient from '@/lib/axios-client';
import localStorageHelper from '@/lib/local-storage';
import { data } from 'react-router';

export default async function userPageLoader() {
  try {
    const response = await axiosClient.get(`/user`);
    localStorageHelper.set('user', response.data.data);
    return { userData: response.data.data };
  } catch (error: any) {
    console.error('🚀 Error :', error);
    throw data(error.response.data.error);
  }
}
