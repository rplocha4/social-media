import { FaRegComment, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import {
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
  useGetPostsQuery,
} from '../../store/features/serverApi';
import { TPost } from '../../types/types';
import UserData from './UserData';
import { Link } from 'react-router-dom';

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
  const { data: likes, isLoading: likesLoading } = useGetPostLikesQuery(
    post.post_id
  );
  const { data: comments, isLoading: commentsLoading } =
    useGetPostCommentsQuery(post.post_id);

  if (likesLoading || commentsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Link
      to={`/post/${post.post_id}`}
      className="border-t border-gray-600 w-full p-2"
    >
      <div className="flex flex-col gap-3">
        <UserData
          username={post.username}
          img={post.avatar}
          content={post.content}
        />
        {/* <div className="flex items-center gap-1 ">
          <p className="font-bold">{post.username}</p>
          <p className="text-gray-500">@{post.username}</p>
          <p className="text-gray-500 font-bold">·</p>
          <p className="text-gray-500">38m</p>
        </div> */}

        <div className="flex gap-10 items-center mx-16 text-gray-600">
          <span className="flex justify-center items-center gap-2 hover:text-blue-400 hover:cursor-pointer">
            <FaRegComment />
            <p>{comments.data?.length}</p>
          </span>
          <span className="flex justify-center items-center gap-2 hover:text-red-400 hover:cursor-pointer">
            <FaRegHeart />
            <p>{likes.data.length}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
