import type { Prisma } from 'generated/prisma/client';
import { prisma } from '@/lib/prisma';

type PostUser = Prisma.UserGetPayload<Record<string, never>>;

export const postDataFetcher = async (user: PostUser) =>
  await prisma.post.findMany({
    where: {
      authorId: {
        in: [user.id],
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
