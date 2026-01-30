'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { userFetcher } from '@/lib/userFetcher';

export const likeAction = async (postId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error('Need to Sign in');
  }

  const user = await userFetcher(clerkId);

  if (!user) {
    throw new Error('User data not found');
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId: user.id,
        },
      });
    }

    revalidatePath('/');
    return;
  } catch (error) {
    console.error('Like Action Error:', error);
    return;
  }
};
