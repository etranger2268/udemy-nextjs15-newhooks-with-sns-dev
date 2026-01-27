'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

type State = {
  error: string;
  success: boolean;
};

export const likeAction = async (postId: string, prevState: State) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { ...prevState, error: 'Need to Sign in', success: false };
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkId },
    select: { id: true },
  });

  if (!dbUser) {
    return { ...prevState, error: 'User data not found', success: false };
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
    return { ...prevState, error: '', success: true };
  } catch (error) {
    console.error('Like Action Error:', error);
    return { ...prevState, error: 'Unexpected Error', success: false };
  }
};
