import PostCard from './PostCard';
import { TPost } from '../../types/types';

const Posts: React.FC<{ posts: TPost[] }> = ({ posts }) => {
  //   const { data, isLoading } = useGetPostsQuery(1);
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="flex flex-col gap-2  w-full">
      {posts.map((post: TPost, i: number) => {
        return <PostCard key={i} post={post} />;
      })}
    </div>
  );
};

export default Posts;
