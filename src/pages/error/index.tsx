/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Link, useRouteError } from 'react-router';

function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <span className="font-bold text-4xl capitalize">Oops, Something&apos;s gone wrong !</span>
      {error && error.data && <span className="font-medium mt-10 capitalize">{error.data}</span>}
      <Button asChild>
        <Link to="/" className="btn btn-ghost mt-10 btn-outline">
          Go Home
        </Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
