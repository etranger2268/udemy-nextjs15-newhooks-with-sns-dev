'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { prisma } from '@/lib/prisma';

type State = {
  error: string;
  success: boolean;
};

export const addPostAction = async (prevState: State, formData: FormData) => {
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
    const postText = formData.get('post') as string;
    const postTextSchema = z
      .string()
      .min(1, 'ポスト内容を入力してください')
      .max(140, '140字以内で入力してください');
    const validatedPostText = postTextSchema.parse(postText);
    await prisma.post.create({
      data: {
        content: validatedPostText,
        authorId: dbUser.id,
      },
    });

    revalidatePath('/');
    return { error: '', success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ...prevState,
        error: error.issues.map((e) => e.message).join(','),
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        ...prevState,
        error: error.message,
        success: false,
      };
    } else {
      return {
        ...prevState,
        error: 'Unknown Error:',
        success: false,
      };
    }
  }
};
