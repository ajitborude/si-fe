import GuestLayout from '@/layouts/guest';
import UserLayout from '@/layouts/user';
import ErrorPage from '@/pages/error';
import HomePage from '@/pages/home';
import InstagramPage, { instagramPageLoader } from '@/pages/instagram';
import NotFoundPage from '@/pages/not-found';
import UserPage, { userPageLoader } from '@/pages/user';
import { RouteObject } from 'react-router';

export const appRoutes: RouteObject[] = [
  {
    Component: GuestLayout,
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
    ],
  },
  {
    Component: GuestLayout,
    children: [{ path: '*', Component: NotFoundPage }],
  },
];
