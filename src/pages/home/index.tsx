import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createQuery } from '@/lib/utils';
import { BsInstagram } from 'react-icons/bs';
import { Link } from 'react-router';

function HomePage() {
  const igClientId = import.meta.env.VITE_APP_IG_CLIENT_ID || '';
  const redirectUri = import.meta.env.VITE_APP_IG_REDIRECT_URI || '';
  const params = {
    enable_fb_login: 0,
    force_authentication: 1,
    client_id: igClientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope:
      'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights',
  };
  const loginURL = encodeURI(`https://www.instagram.com/oauth/authorize?${createQuery(params)}`);
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row w-full h-full sm:max-w-6xl">
      <div className="w-1/2 hidden justify-center items-center h-full sm:flex">
        <div className="w-80 mask-t-from-70% mask-b-from-70% mask-l-from-70% mask-r-from-70% rounded-4xl">
          <img src="/login-image.png" />
        </div>
      </div>
      <div className="sm:w-1/2 w-full flex justify-center items-center h-full flex-col">
        <span className="text-6xl font-merienda my-16 font-bold text-center">Social Insights</span>
        <Separator className="my-4" />
        <Button asChild size="lg" className="mt-2 insta-btn-bg">
          <Link to={loginURL}>
            <BsInstagram className="text-white" size={35} /> <span className="text-white">Login with Instagram</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
