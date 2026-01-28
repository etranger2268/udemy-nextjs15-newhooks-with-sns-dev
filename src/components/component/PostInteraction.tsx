'use client';

import { useOptimistic } from 'react';
import { HeartIcon, MessageCircleIcon, Share2Icon } from '@/components/component/Icons';
import { Button } from '@/components/ui/button';
import { likeAction } from '@/lib/likeAction';

type PostInteractionProps = {
  postId: string;
  userId: string;
  initialLikes: string[];
  commentNumber: number;
};

type LikeStateProps = {
  likeCount: number;
  isLiked: boolean;
};

const PostInteraction = ({ postId, userId, initialLikes, commentNumber }: PostInteractionProps) => {
  const initialState: LikeStateProps = {
    likeCount: initialLikes.length,
    isLiked: initialLikes.includes(userId),
  };

  const [optimisticLike, addOptimisticLike] = useOptimistic<LikeStateProps, void>(
    initialState,
    (currentState) => ({
      likeCount: currentState.isLiked ? currentState.likeCount - 1 : currentState.likeCount + 1,
      isLiked: !currentState.isLiked,
    }),
  );

  const handleLikeSubmit = async () => {
    addOptimisticLike();
    await likeAction(postId);
  };

  return (
    <div className="flex items-center">
      <form action={handleLikeSubmit} className="flex items-center">
        <Button variant="ghost" size="icon">
          <HeartIcon
            className={`h-5 w-5 ${optimisticLike.isLiked ? 'text-destructive' : 'text-muted-foreground'}`}
          />
        </Button>
        <span
          className={`-ml-1 text-sm ${optimisticLike.isLiked ? 'text-destructive' : 'text-muted-foreground'}`}
        >
          {optimisticLike.likeCount}
        </span>
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <span className="-ml-1 text-sm">{commentNumber}</span>
        <Button variant="ghost" size="icon">
          <Share2Icon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>
    </div>
  );
};

export default PostInteraction;
