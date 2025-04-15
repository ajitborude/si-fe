import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import axiosClient from '@/lib/axios-client';
import localStorageHelper from '@/lib/local-storage';
import { formatDistanceToNowStrict } from 'date-fns';
import { find } from 'lodash';
import { HeartIcon, MessageCircleIcon, Save, SendIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { GoHorizontalRule } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';

function MediaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [media, setMedia] = useState<any>(loaderData.mediaData);
  const [expandedComment, setExpandedComment] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const mediaList = localStorageHelper.get('media');
  const userData = localStorageHelper.get('user');
  const currentIndex = location.state.currentIndex;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const previousMedia = previousIndex !== null ? mediaList[previousIndex] : null;
  const nextIndex = currentIndex !== null && currentIndex < mediaList.length - 1 ? currentIndex + 1 : null;
  const nextMedia = nextIndex ? mediaList[nextIndex] : null;

  const mediaType = media.media_type;
  const isReel = mediaType === 'VIDEO';
  useEffect(() => {
    setMedia(loaderData.mediaData);
  }, [loaderData.mediaData]);

  const getMedia = async () => {
    try {
      const response = await axiosClient.get(`/instagram/media/${media.id}`);
      localStorageHelper.set('current-media', response.data.data);
      setMedia(response.data.data);
    } catch (error: any) {
      console.error('🚀 Error :', error);
    }
  };

  const selectComment = (value: any) => {
    setSelectedComment(value);
  };

  const removeSelectedComment = () => {
    setSelectedComment(null);
  };

  const commentChange = (event: any) => {
    setComment(event.target.value);
  };

  const postComment = async () => {
    setIsPosting(true);
    try {
      await axiosClient.post(`/instagram/comment/${selectedComment.id}/reply`, { message: comment });
      setComment('');
      setSelectedComment(null);
      await getMedia();
      setIsPosting(false);
    } catch (error: any) {
      setIsPosting(false);
    }
  };

  const goBack = () => {
    void navigate(`/user/${userData.username}`);
  };

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="min-w-[calc(100svw_-_10%)] h-[calc(100svh_-_10%)] m-auto [&>button:last-child]:hidden border-0 bg-background/5 flex justify-between items-center"
        onInteractOutside={(_e) => {
          goBack();
        }}
      >
        <div className="absolute right-2 top-2">
          <Button variant="ghost" size="iconLG" onClick={goBack}>
            <MdClose className="size-6" />
          </Button>
        </div>
        <div className="h-full flex items-center justify-center w-[5%]">
          {previousIndex !== null ? (
            <Button asChild variant="ghost" size="iconLG">
              <Link state={{ currentIndex: previousIndex }} to={`/media/${previousMedia?.id}`}>
                <FiArrowLeftCircle className="size-9" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="iconLG" disabled>
              <FiArrowLeftCircle className="size-9" />
            </Button>
          )}
        </div>
        <div className="flex flex-col rounded-xl max-h-full h-full bg-background w-[90%]">
          <div className="flex items-center justify-between p-2 max-h-full h-full">
            <div className="border-r border-foreground/50 pr-2 max-w[55%] max-h-full h-full">
              {!isReel && <img src={media.media_url} className="h-full" />}
              {isReel && (
                <video autoPlay className="h-full">
                  <source src={media.media_url} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="px-4 py-2 flex flex-col justify-between items-center h-full grow-1 min-w-[25rem]">
              <div className="flex flex-col w-full items-start justify-center py-2">
                <div className="flex flex-row w-full items-center justify-start gap-4">
                  <Avatar>
                    <AvatarImage src={userData.profile_picture_url} alt="pp" className="w-full h-full rounded-full border border-foreground" />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{userData.username}</span>
                </div>
                <Separator className="my-2" />
              </div>
              <div className="flex flex-col w-full items-center justify-start py-2 grow-1">
                {media.caption && (
                  <div className="flex flex-col w-full items-center justify-start">
                    <div className="flex flex-row w-full gap-4 items-center justify-start mb-4">
                      <Avatar>
                        <AvatarImage src={userData.profile_picture_url} alt="pp" className=" rounded-full border border-foreground" />
                        <AvatarFallback>PP</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold">{userData.username}</span>
                      <span className="text-sm">{media.caption}</span>
                    </div>
                  </div>
                )}
                <div className="flex flex-col w-full items-center justify-start gap-4">
                  {media.comments &&
                    media.comments.data &&
                    media.comments.data.map((comment: any) => {
                      if (comment.replies) {
                        return (
                          <div className="flex flex-col w-full items-center justify-start" key={comment.id}>
                            <div className="flex flex-row w-full gap-4 items-start justify-start">
                              <Avatar className="mt-2">
                                <AvatarImage
                                  src={userData.user_id === comment.from.id ? userData.profile_picture_url : ''}
                                  alt="pp"
                                  className="w-full h-full rounded-full border border-foreground"
                                />
                                <AvatarFallback>PP</AvatarFallback>
                              </Avatar>
                              <div className=" flex flex-col items-start justify-center">
                                <div className="gap-2 flex flex-row items-center justify-start">
                                  <span className="text-xs font-bold">{comment.from.username}</span>
                                  <span className="text-sm">{comment.text}</span>
                                </div>
                                <div className="flex flex-row items-center justify-start">
                                  <HeartIcon size={14} />
                                  <Button size="sm" variant="ghost" className="text-xs text-foreground/65" onClick={() => selectComment(comment)}>
                                    Reply
                                  </Button>
                                </div>
                                {comment.replies && expandedComment && expandedComment.id === comment.id && (
                                  <Button size="sm" variant="ghost" className="ml-4" onClick={() => setExpandedComment(null)}>
                                    <div className="flex flex-row w-full items-center justify-start text-foreground/65">
                                      <GoHorizontalRule /> <span className="text-xs"> Hide replies</span>
                                    </div>
                                  </Button>
                                )}
                                {comment.replies && expandedComment && expandedComment.id !== comment.id && (
                                  <Button size="sm" variant="ghost" className="ml-4" onClick={() => setExpandedComment(comment)}>
                                    <div className="flex flex-row w-full items-center justify-start text-foreground/65">
                                      <GoHorizontalRule /> <span className="text-xs"> View replies ({comment.replies.data.length})</span>
                                    </div>
                                  </Button>
                                )}
                                {comment.replies && !expandedComment && (
                                  <Button size="sm" variant="ghost" className="ml-4" onClick={() => setExpandedComment(comment)}>
                                    <div className="flex flex-row w-full items-center justify-start text-foreground/65">
                                      <GoHorizontalRule /> <span className="text-xs"> View replies ({comment.replies.data.length})</span>
                                    </div>
                                  </Button>
                                )}

                                <div className="flex flex-col w-full items-center justify-start gap-4">
                                  {expandedComment &&
                                    expandedComment.id === comment.id &&
                                    expandedComment.replies &&
                                    expandedComment.replies.data.map((rComment: any) => {
                                      const cData = find(media.comments.data, { id: rComment.id });
                                      return (
                                        <div className="flex flex-row w-full gap-4 items-start justify-start" key={rComment.id}>
                                          <Avatar className="mt-0">
                                            <AvatarImage
                                              src={userData.user_id === cData.from.id ? userData.profile_picture_url : ''}
                                              alt="pp"
                                              className="w-full h-full rounded-full border border-foreground"
                                            />
                                            <AvatarFallback>PP</AvatarFallback>
                                          </Avatar>
                                          <div className=" flex flex-col items-start justify-center">
                                            <div className="gap-2 flex flex-row items-center justify-start">
                                              <span className="text-xs font-bold">{cData.from.username}</span>
                                              <span className="text-sm">{cData.text}</span>
                                            </div>
                                            <div className="flex flex-row items-center justify-start">
                                              <HeartIcon size={14} />
                                              {/* <Button size="sm" variant="ghost" className="text-xs text-foreground/65" onClick={() => selectComment(cData.from)}>
                                              Reply
                                            </Button> */}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className="flex flex-col w-full items-start justify-center ">
                <Separator className="my-2" />

                <div className="flex flex-row w-full items-center justify-between">
                  <div className="flex flex-row gap-2">
                    <Button variant="ghost" size="sm">
                      <HeartIcon size={24} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircleIcon size={24} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <SendIcon size={24} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Save size={24} />
                  </Button>
                </div>

                <span className="mt-2 text-sm">{formatDistanceToNowStrict(new Date(media.timestamp))} ago</span>

                <Separator className="my-4" />
                <div className="w-full flex relative">
                  <div className="flex flex-row w-full items-center justify-between gap-2">
                    <div className="flex flex-row items-center justify-center grow-1">
                      {selectedComment && (
                        <div className="flex flex-row">
                          <span>{`@${selectedComment.from.username}`}</span>
                          <Button variant="ghost" size="sm" onClick={removeSelectedComment} disabled={isPosting}>
                            <MdClose />
                          </Button>
                        </div>
                      )}
                      <Input type="text" placeholder="Add Comment" onChange={commentChange} disabled={!selectedComment?.id || isPosting} />
                    </div>
                    <Button variant="ghost" onClick={postComment} disabled={!selectedComment?.id || isPosting}>
                      {!isPosting && <SendIcon />}
                      {isPosting && (
                        <svg
                          aria-hidden="true"
                          className="inline w-6 h-6 text-grey-300 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full flex items-center justify-center w-[5%]">
          {nextIndex !== null ? (
            <Button asChild variant="ghost" size="iconLG">
              <Link state={{ currentIndex: nextIndex }} to={`/media/${nextMedia.id}`}>
                <FiArrowRightCircle className="size-9" />
              </Link>
            </Button>
          ) : (
            <Button variant="ghost" size="iconLG" disabled>
              <FiArrowRightCircle className="size-9" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MediaPage;
