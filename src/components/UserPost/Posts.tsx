import PostCard from './PostCard';
import { TPost } from '../../types/types';

const Posts: React.FC<{ posts: TPost[] }> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-2  w-full">
      {posts.map((post: TPost) => {
        return <PostCard key={post.post_id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
