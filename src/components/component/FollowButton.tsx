import { Button } from '@/components/ui/button';

type FollowButton = {
  isCurrentUser: boolean;
  isFollowing: boolean;
};

const FollowButton = ({ isCurrentUser, isFollowing }: FollowButton) => {
  console.log();
  const text = isCurrentUser ? 'Edit Profile' : isFollowing ? 'Unfollow' : 'Follow';
  const variant = isCurrentUser ? 'secondary' : isFollowing ? 'outline' : 'default';
  return (
    <Button variant={variant} className="w-full">
      {text}
    </Button>
  );
};

export default FollowButton;
