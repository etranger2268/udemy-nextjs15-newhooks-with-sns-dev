import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import Post from '@/components/component/Post';
import { postDataFetcher } from '@/lib/postDataFetcher';
import { postUserFetcher } from '@/lib/postUserFetcher';

type PostListProps = {
  username: string | undefined;
};

export default async function PostList({ username }: PostListProps) {
  return (
    <div className="space-y-4">
      <Suspense fallback={<p>Loading...</p>}>
        <PostListContent username={username} />
      </Suspense>
    </div>
  );
}

async function PostListContent({ username }: PostListProps) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return <p className="text-sm font-medium text-center text-gray-500">ログインしてください</p>;
  }

  const user = await postUserFetcher(clerkId);

  if (!user) {
    return (
      <p className="text-sm font-medium text-center text-gray-500">ユーザーがDBに存在しません</p>
    );
  }

  const posts = await postDataFetcher(user.id, username);

  if (posts.length === 0) {
    return <p className="text-sm font-medium text-center text-gray-500">ポストが存在しません。</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} userId={user.id} />
      ))}
    </>
  );
}
