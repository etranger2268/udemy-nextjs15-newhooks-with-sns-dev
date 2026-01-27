'use client';

import { useActionState } from 'react';
import { HeartIcon, MessageCircleIcon, Share2Icon } from '@/components/component/Icons';
import { Button } from '@/components/ui/button';
import { likeAction } from '@/lib/likeAction';

type PostInteractionProps = {
  postId: string;
  initialLikes: string[];
  commentNumber: number;
};

const PostInteraction = ({ postId, initialLikes, commentNumber }: PostInteractionProps) => {
  const likeActionWithPostId = likeAction.bind(null, postId);
  const initialState = { error: '', success: true };
  const [state, formAction] = useActionState(likeActionWithPostId, initialState);

  return (
    <div className="flex items-center">
      <form action={formAction} className="flex items-center">
        <Button variant="ghost" size="icon">
          <HeartIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <span className="-ml-1 text-sm">{initialLikes.length}</span>
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <span className="-ml-1 text-sm">{commentNumber}</span>
        <Button variant="ghost" size="icon">
          <Share2Icon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>
      {state.error && !state.success && <p className="text-red-500 mt-1 ml-2">{state.error}</p>}
    </div>
  );
};

export default PostInteraction;
