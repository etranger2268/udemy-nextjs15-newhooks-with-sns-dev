'use client';

import { useOptimistic } from 'react';
import { Button } from '@/components/ui/button';
import { followAction } from '@/lib/followAction';

type FollowButton = {
  displayUserId: string;
  isCurrentUser: boolean;
  isFollowing: boolean;
};

type FollowProps = {
  isFollowing: boolean;
};

const FollowButton = ({ displayUserId, isCurrentUser, isFollowing }: FollowButton) => {
  const [optimisticFollow, addOptimisticFollow] = useOptimistic<FollowProps, void>(
    {
      isFollowing,
    },
    (currentState) => ({
      isFollowing: !currentState.isFollowing,
    }),
  );
  const text = isCurrentUser
    ? 'Edit Profile'
    : optimisticFollow.isFollowing
      ? 'Unfollow'
      : 'Follow';

  const variant = isCurrentUser
    ? 'secondary'
    : optimisticFollow.isFollowing
      ? 'outline'
      : 'default';

  const handleFollowAction = async () => {
    if (isCurrentUser) {
      return;
    }

    try {
      addOptimisticFollow();
      followAction(displayUserId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={handleFollowAction}>
      <Button variant={variant} className="w-full">
        {text}
      </Button>
    </form>
  );
};

export default FollowButton;
