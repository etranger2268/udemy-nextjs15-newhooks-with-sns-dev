'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export const likeAction = async (postId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error('Need to Sign in');
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkId },
    select: { id: true },
  });

  if (!dbUser) {
    throw new Error('User data not found');
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: dbUser.id,
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
          userId: dbUser.id,
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
