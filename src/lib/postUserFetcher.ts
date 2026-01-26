import { prisma } from '@/lib/prisma';

export const postUserFetcher = async (clerkId: string) =>
  await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });
