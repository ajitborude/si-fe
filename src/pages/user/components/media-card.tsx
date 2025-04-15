import localStorageHelper from '@/lib/local-storage';
import { FaComment } from 'react-icons/fa';
import { PiVideoBold } from 'react-icons/pi';
import { Link } from 'react-router';

export default function MediaCard({ currentIndex }: any) {
  const mediaList = localStorageHelper.get('media');
  const media = mediaList[currentIndex];
  const mediaType = media.media_type;
  const isReel = mediaType === 'VIDEO';
  return (
    <Link className="h-[24.5rem] relative group cursor-pointer" state={{ currentIndex }} to={`/media/${media.id}`}>
      <img src={isReel ? media.thumbnail_url : media.media_url} className=" h-full object-cover" />
      <div className="absolute bg-background/70 top-0 left-0 w-full h-full group-hover:visible invisible flex items-center justify-center gap-2">
        <FaComment size={24} /> <span>{media.comments_count}</span>
      </div>
      {isReel && (
        <div className="absolute top-2 right-2">
          <PiVideoBold size={24} />
        </div>
      )}
    </Link>
  );
}
