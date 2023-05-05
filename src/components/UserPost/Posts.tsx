import Post from './Post';
import { TPost } from '../../types/types';
import { useGetPostsQuery } from '../../store/features/serverApi';

function Posts() {
  const { data, isLoading } = useGetPostsQuery(1);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.data.map((post: TPost, i: number) => {
        return <Post key={i} post={post} />;
      })}
    </>
  );
}

export default Posts;
