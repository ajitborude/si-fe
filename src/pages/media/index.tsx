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
import { MdClose, MdOutlineArrowBackIos } from 'react-icons/md';
import { RiCloseCircleLine } from 'react-icons/ri';
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
      setExpandedComment(null);
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
        className="sm:min-w-[calc(100svw_-_10%)] min-w-svw sm:h-[calc(100svh_-_10%)] h-svh sm:m-auto [&>button:last-child]:hidden border-0 sm:bg-background/5 flex justify-between items-center"
        onInteractOutside={(_e) => {
          goBack();
        }}
      >
        <div className="absolute right-2 top-2 sm:flex hidden">
          <Button variant="ghost" size="iconLG" onClick={goBack}>
            <MdClose className="size-6" />
          </Button>
        </div>
        <div className="h-full items-center justify-center w-[5%] sm:flex hidden">
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
        <div className="flex flex-col rounded-xl max-h-full h-full bg-background sm:w-[90%] w-full">
          <div className="flex sm:flex-row flex-col items-center justify-between sm:p-2 p-0 max-h-full h-full">
            <div className="flex sm:hidden flex-col w-full items-start justify-center">
              <div className="flex flex-row w-full items-center justify-start gap-2 p-2">
                <Button asChild variant="ghost" size="icon">
                  <Link state={{ currentIndex: previousIndex }} to={`/user/${userData.username}`}>
                    <MdOutlineArrowBackIos className="size-6" />
                  </Link>
                </Button>
                <Avatar>
                  <AvatarImage src={userData.profile_picture_url} alt="pp" className="w-full h-full rounded-full border border-foreground" />
                  <AvatarFallback>PP</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{userData.username}</span>
              </div>
              <Separator />
            </div>

            <div className="sm:border-r  border-foreground/50 sm:pr-2 max-w[55%] max-h-full h-full">
              {!isReel && <img src={media.media_url} className="h-full" />}
              {isReel && (
                <video autoPlay className="h-full">
                  <source src={media.media_url} type="video/mp4" />
                </video>
              )}
            </div>

            <div className=" flex-col w-full items-start justify-center flex sm:hidden">
              <Separator className="mb-2" />

              <div className="flex flex-row w-full items-center justify-between px-2">
                <div className="flex flex-row gap-2">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <HeartIcon className="size-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <MessageCircleIcon className="size-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <SendIcon className="size-5" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Save className="size-5" />
                </Button>
              </div>
              {media.caption && (
                <div className="flex flex-col w-full items-center justify-start px-4 mt-4">
                  <div className="flex flex-row w-full gap-4 items-center justify-start mb-4">
                    <span className="text-xs font-bold">{userData.username}</span>
                    <span className="text-sm">{media.caption}</span>
                  </div>
                </div>
              )}
              <span className=" px-4 text-xs text-foreground/75">{formatDistanceToNowStrict(new Date(media.timestamp))} ago</span>

              <Separator className="mt-2" />
            </div>

            <div className="px-4 flex flex-col justify-between items-center h-full grow-1 min-w-full sm:min-w-[25rem] relative overflow-y-auto">
              <div className=" flex-col w-full items-start justify-center py-2 hidden sm:flex">
                <div className="flex flex-row w-full items-center justify-start gap-4">
                  <Avatar>
                    <AvatarImage src={userData.profile_picture_url} alt="pp" className="w-full h-full rounded-full border border-foreground" />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{userData.username}</span>
                </div>
                <Separator className="my-2" />
              </div>

              <div className="flex flex-col w-full items-center justify-start py-2 grow-1 overflow-y-auto ">
                {media.caption && (
                  <div className="flex-col w-full items-center justify-start hidden sm:flex">
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
                {/* Comments */}
                <div className="flex flex-col w-full items-center justify-start gap-4 ">
                  {media.comments &&
                    media.comments.data &&
                    media.comments.data.map((comment: any) => {
                      if (!comment.parent_id) {
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
                              <div className=" flex flex-col items-start justify-center w-full">
                                <div className="gap-2 flex flex-row items-center justify-between w-full">
                                  <div className="gap-2 flex flex-row items-center justify-start">
                                    <span className="text-xs font-bold">{comment.from.username}</span>
                                    <span className="text-sm">{comment.text}</span>
                                  </div>
                                  <HeartIcon size={18} />
                                </div>
                                <div className="flex flex-row items-center justify-start">
                                  <span className="text-xs text-foreground/75">{formatDistanceToNowStrict(new Date(comment.timestamp))} ago</span>
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
                                  {comment.replies &&
                                    expandedComment &&
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
                                          <div className=" flex flex-col items-start justify-center w-full">
                                            <div className="gap-2 flex flex-row items-center justify-between w-full">
                                              <div className="gap-2 flex flex-row items-center justify-start">
                                                <span className="text-xs font-bold">{cData.from.username}</span>
                                                <span className="text-sm">{cData.text}</span>
                                              </div>
                                              <HeartIcon size={18} />
                                            </div>
                                            <div className="flex flex-row items-center justify-start mt-1">
                                              <span className="text-xs text-foreground/75">{formatDistanceToNowStrict(new Date(cData.timestamp))} ago</span>
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

              <div className=" flex-col w-full items-start justify-center hidden sm:flex">
                <Separator className="my-2" />

                <div className="flex flex-row w-full items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <Button variant="ghost" size="default" className="rounded-full">
                      <HeartIcon className="size-5" />
                    </Button>
                    <Button variant="ghost" size="default" className="rounded-full">
                      <MessageCircleIcon className="size-5" />
                    </Button>
                    <Button variant="ghost" size="default" className="rounded-full">
                      <SendIcon className="size-5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="default" className="rounded-full">
                    <Save className="size-5" />
                  </Button>
                </div>

                <span className="mt-2 text-sm">{formatDistanceToNowStrict(new Date(media.timestamp))} ago</span>

                <Separator className="mt-2" />
              </div>

              <div className="w-full flex flex-col p-2 bg-background sticky sm:relative bottom-0">
                {selectedComment && (
                  <div className="flex flex-row p-1 w-full items-center justify-start">
                    <span className="text-sm text-foreground/75">{`Reply To : @${selectedComment.from.username}`}</span>
                    <Button variant="ghost" size="sm" onClick={removeSelectedComment} disabled={isPosting}>
                      <RiCloseCircleLine />
                    </Button>
                  </div>
                )}
                <div className="flex flex-row w-full items-center justify-between gap-2">
                  <Input type="text" placeholder="Add Comment" value={comment} onChange={commentChange} disabled={!selectedComment?.id || isPosting} />

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
        <div className="h-full items-center justify-center w-[5%] sm:flex hidden">
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
