'use client';

import { Fragment, Suspense, useActionState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addPostAction } from '@/lib/addPostAction';
import { SendIcon } from './Icons';

export default function PostForm() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PostFormContent />
    </Suspense>
  );
}

function PostFormContent() {
  const initialState = { error: '', success: true };
  const [state, formAction, isPending] = useActionState(addPostAction, initialState);
  return (
    <Fragment>
      <div>
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <form action={formAction} className="flex items-center flex-1">
            <Input
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 rounded-full bg-muted px-4 py-2"
              name="post"
            />
            <Button variant="ghost" size="icon" disabled={isPending}>
              <SendIcon className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Tweet</span>
            </Button>
          </form>
        </div>
      </div>
      {state.error && !state.success && <p className="text-red-500 mt-1 ml-14">{state.error}</p>}
    </Fragment>
  );
}
