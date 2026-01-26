import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { prisma } from '@/lib/prisma';
import { SendIcon } from './Icons';

export default function PostForm() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Suspense fallback={<p>Loading...</p>}>
        <PostFormContent />
      </Suspense>
    </div>
  );
}

async function PostFormContent() {
  const { userId: clerkId } = await auth();

  const addPostAction = async (formData: FormData) => {
    'use server';

    if (!clerkId) {
      console.error('NOT Signin USER');
      return;
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkId },
    });

    if (!dbUser) {
      console.error('Find User ERROR');
      return;
    }

    const postText = formData.get('post') as string;

    try {
      await prisma.post.create({
        data: {
          content: postText,
          authorId: dbUser.id,
        },
      });
    } catch (error) {
      console.error('Create Post ERROR:', error);
    }
  };

  return (
    <form action={addPostAction} className="flex items-center flex-1">
      <Input
        type="text"
        placeholder="What's on your mind?"
        className="flex-1 rounded-full bg-muted px-4 py-2"
        name="post"
      />
      <Button variant="ghost" size="icon">
        <SendIcon className="h-5 w-5 text-muted-foreground" />
        <span className="sr-only">Tweet</span>
      </Button>
    </form>
  );
}
