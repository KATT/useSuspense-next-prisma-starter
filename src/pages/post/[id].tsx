import { useRouter } from 'next/router';
import { NextPageWithLayout } from '~/pages/_app';
import { RouterOutput, trpc } from '~/utils/trpc';

type PostByIdOutput = RouterOutput['post']['byId'];

function PostItem(props: { post: PostByIdOutput }) {
  const { post } = props;
  return (
    <>
      <h1>{post.title}</h1>
      <em>Created {post.createdAt.toLocaleDateString('en-us')}</em>

      <p>{post.text}</p>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(post, null, 4)}</pre>
    </>
  );
}

const PostViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const postQuery = trpc.post.byId.useSuspenseQuery({ id });

  return <PostItem post={postQuery.data} />;
};

export default PostViewPage;
