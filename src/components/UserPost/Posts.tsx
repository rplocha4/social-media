import PostCard from './PostCard';
import { TPost } from '../../types/types';

const Posts: React.FC<{ posts: TPost[]; onRefetch: () => void }> = ({
  posts,
  onRefetch,
}) => {
  return (
    <div className="flex flex-col gap-2 ">
      {posts.map((post: TPost) => {
        return (
          <PostCard key={post.post_id} post={post} onRefetch={onRefetch} />
        );
      })}
    </div>
  );
};

export default Posts;
