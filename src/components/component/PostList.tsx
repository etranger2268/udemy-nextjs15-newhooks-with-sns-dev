import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { ClockIcon, HeartIcon, MessageCircleIcon, Share2Icon } from './Icons';

export default async function PostList() {
  // const posts = [
  //   {
  //     id: 1,
  //     author: { name: 'Jane Doe', username: '@janedoe' },
  //     content:
  //       'Excited to share my latest project with you all! Check it out and let me know what you think.',
  //     timestamp: '2h',
  //     comments: [
  //       { author: 'John Doe', content: 'Great work!' },
  //       { author: 'Jane Doe', content: 'Looks amazing!' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     author: { name: 'John Smith', username: '@johnsmith' },
  //     content: 'Enjoying the beautiful weather today! Whos up for a hike later?',
  //     timestamp: '1h',
  //   },
  // ];

  return (
    <div className="space-y-4">
      <Suspense fallback={<p>Loading...</p>}>
        <PostListContent />
      </Suspense>
    </div>
  );
}

async function PostListContent() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return <p className="text-sm font-medium text-center text-gray-500">ログインしてください</p>;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    return (
      <p className="text-sm font-medium text-center text-gray-500">ユーザーがDBに存在しません</p>
    );
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: [user.id],
      },
    },
    include: {
      author: true,
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (posts.length === 0) {
    return <p className="text-sm font-medium text-center text-gray-500">ログインしてください</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold">{post.author.username}</h3>
              <p className="text-muted-foreground text-xs">{post.author.id}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p>{post.content}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <HeartIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2Icon className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClockIcon className="h-5 w-5" />
              <span>{post.createdAt.toLocaleString()}</span>
            </div>
          </div>
          {/* {post.comments && (
            <div className="mt-4 border-t pt-4 space-y-2">
              {post.comments.map((comment) => (
                <div key={comment.author} className="flex items-center gap-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <HeartIcon className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          )} */}
        </div>
      ))}
    </>
  );
}
