import { prisma } from '@/lib/prisma';

export const postDataFetcher = async (userId: string, username?: string) => {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  if (username) {
    return await prisma.post.findMany({
      where: { authorId: username },
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
  }

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
