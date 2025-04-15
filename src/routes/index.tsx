import GuestLayout from '@/layouts/guest';
import UserLayout from '@/layouts/user';
import instagramPageLoader from '@/loaders/instagram';
import mediaPageLoader from '@/loaders/media';
import userPageLoader from '@/loaders/user';
import ErrorPage from '@/pages/error';
import HomePage from '@/pages/home';
import InstagramPage from '@/pages/instagram';
import MediaPage from '@/pages/media';
import NotFoundPage from '@/pages/not-found';
import UserPage from '@/pages/user';
import { RouteObject } from 'react-router';

export const appRoutes: RouteObject[] = [
  {
    Component: GuestLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
        errorElement: <ErrorPage />,
      },
      {
        path: 'instagram/:type',
        Component: InstagramPage,
        errorElement: <ErrorPage />,
        loader: instagramPageLoader,
      },
    ],
  },
  {
    // path:'user'
    Component: UserLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'user',
        children: [
          {
            path: ':username',
            Component: UserPage,
            errorElement: <ErrorPage />,
            loader: userPageLoader,
          },
        ],
      },
      {
        path: 'media',
        children: [
          {
            path: ':mediaId',
            Component: MediaPage,
            errorElement: <ErrorPage />,
            loader: mediaPageLoader,
          },
        ],
      },
    ],
  },
  {
    Component: GuestLayout,
    children: [{ path: '*', Component: NotFoundPage }],
  },
];
