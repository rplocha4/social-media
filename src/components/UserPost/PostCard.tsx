import { FaRegComment, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import {
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
  useGetPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../store/features/serverApi';
import { TPost } from '../../types/types';
import UserData from './UserData';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const PostCard: React.FC<{ post: TPost }> = ({ post }) => {
  // const {
  //   data: likes,
  //   isLoading: likesLoading,
  //   refetch: refetchLikes,
  // } = useGetPostLikesQuery(post.post_id);
  // const { data: comments, isLoading: commentsLoading } =
  //   useGetPostCommentsQuery(post.post_id);

  const [isLiking, setIsLiking] = useState(post.liked === 1 ? true : false);
  const [likes, setLikes] = useState(post.likes);

  // useEffect(() => {
  //   if (!likes?.data) return;
  //   setIsLiking(likes.data.some((like: any) => like.user_id === 1));
  // }, [likes?.data]);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  // if (likesLoading || commentsLoading) {
  //   return <div>Loading...</div>;
  // }
  // const isLiking = likes.data.some((like: any) => like.user_id === 1);

  return (
    <div className="border-t border-gray-600 w-full p-2">
      <div className="flex flex-col gap-3">
        <UserData
          username={post.username}
          img={post.avatar}
          content={post.content}
          link={`/post/${post.post_id}`}
        />
        {/* <div className="flex items-center gap-1 ">
          <p className="font-bold">{post.username}</p>
          <p className="text-gray-500">@{post.username}</p>
          <p className="text-gray-500 font-bold">·</p>
          <p className="text-gray-500">38m</p>
        </div> */}

        <div className="flex gap-10 items-center mx-16 text-gray-600 text-lg">
          <span className="flex justify-center items-center gap-2 hover:text-blue-400 hover:cursor-pointer">
            <FaRegComment />
            <p>{post.comments}</p>
          </span>
          <span
            className="flex justify-center items-center gap-2  hover:text-red-400 hover:cursor-pointer"
            onClick={() => {
              if (isLiking) {
                unlikePost({ post_id: post.post_id, user_id: 1 });
                setIsLiking(false);
                setLikes((prev) => prev - 1);
              } else {
                likePost({ post_id: post.post_id, user_id: 1 });
                setIsLiking(true);
                setLikes((prev) => prev + 1);
              }
            }}
          >
            {isLiking ? (
              <AiFillHeart className="text-red-600" />
            ) : (
              <AiOutlineHeart />
            )}
            <p>{likes}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
