import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BE_URL,
  withCredentials: true, // Important to send cookies
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Interceptor for token refresh (if needed)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('🚀 Error :', error);
      window.location.href = '/';
      // try {
      //   await axiosClient.get('/auth/token/refresh');
      //   return axiosClient(error.config); // Retry original request
      // } catch (error: any) {
      //   window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
