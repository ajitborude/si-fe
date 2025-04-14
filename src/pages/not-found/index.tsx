import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-col h-full p-12">
      <span className="text-xl font-medium">404 | Page Not Found</span>
      <Button asChild>
        <Link to="/" className="btn btn-ghost border border-neutral mt-4">
          Home
        </Link>
      </Button>
    </div>
  );
}

export default NotFoundPage;
