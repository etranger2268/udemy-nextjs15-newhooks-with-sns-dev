import { HeartIcon, MessageCircleIcon, Share2Icon } from '@/components/component/Icons';
import { Button } from '@/components/ui/button';

const PostInteraction = () => {
  return (
    <>
      <Button variant="ghost" size="icon">
        <HeartIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon">
        <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon">
        <Share2Icon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </>
  );
};

export default PostInteraction;
