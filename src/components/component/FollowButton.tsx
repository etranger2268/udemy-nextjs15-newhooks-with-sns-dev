import { Button } from '@/components/ui/button';
import { followAction } from '@/lib/followAction';

type FollowButton = {
  displayUserId: string;
  isCurrentUser: boolean;
  isFollowing: boolean;
};

const FollowButton = ({ displayUserId, isCurrentUser, isFollowing }: FollowButton) => {
  const text = isCurrentUser ? 'Edit Profile' : isFollowing ? 'Unfollow' : 'Follow';
  const variant = isCurrentUser ? 'secondary' : isFollowing ? 'outline' : 'default';
  return (
    <form action={followAction.bind(null, displayUserId)}>
      <Button variant={variant} className="w-full">
        {text}
      </Button>
    </form>
  );
};

export default FollowButton;
