import { Button } from '@/components/ui/button';
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
    <div className="flex items-center justify-center flex-col w-full ">
      <span className="mb-2">Home</span>
      <Button asChild>
        <Link to={loginURL} className="btn btn-ghost border border-neutral mt-4">
          <BsInstagram /> Login with Instagram
        </Link>
      </Button>
    </div>
  );
}

export default HomePage;
