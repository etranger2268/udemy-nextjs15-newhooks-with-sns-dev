'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { userFetcher } from '@/lib/userFetcher';

export const followAction = async (displayUserId: string) => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error('Need to Sign in');
  }

  const user = await userFetcher(clerkId);

  if (!user) {
    throw new Error('User data not found');
  }

  try {
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: user.id,
        followingId: displayUserId,
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: user.id,
            followingId: displayUserId,
          },
        },
      });
    } else {
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: displayUserId,
        },
      });
    }

    revalidatePath(`/profile/${displayUserId}`);
    return;
  } catch (error) {
    console.error('Follow Action Error:', error);
    return;
  }
};
