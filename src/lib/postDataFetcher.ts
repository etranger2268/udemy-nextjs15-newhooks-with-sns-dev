import { prisma } from '@/lib/prisma';

export const postDataFetcher = async (userId: string) => {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);

  return await prisma.post.findMany({
    where: {
      authorId: {
        in: [userId, ...followingIds],
      },
    },
    include: {
      author: true,
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
