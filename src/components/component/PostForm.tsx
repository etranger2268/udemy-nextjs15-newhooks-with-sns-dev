'use client';

import { Suspense, useActionState } from 'react';
import { addPostAction } from '@/action/action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

function PostFormContent() {
  const initialState = { error: '', success: true };
  const [state, formAction, isPending] = useActionState(addPostAction, initialState);
  return (
    <form action={formAction} className="flex items-center flex-1">
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
