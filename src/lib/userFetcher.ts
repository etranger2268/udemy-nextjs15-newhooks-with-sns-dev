import { prisma } from '@/lib/prisma';

export const userFetcher = async (clerkId: string) =>
  await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });
