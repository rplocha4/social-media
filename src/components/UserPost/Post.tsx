import { FaRegComment, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';
import { useGetPostsQuery } from '../../store/features/serverApi';
import { useEffect } from 'react';
import { TPost } from '../../types/types';

const Post: React.FC<{ post: TPost }> = ({ post }) => {

  return (
    <div className="flex w-1/3 gap-3">
      <img
        className="rounded-full w-full h-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU"
        alt=""
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1 ">
          <p className="font-bold">{post.username}</p>
          <p className="text-gray-500">@{post.username}</p>
          <p className="text-gray-500 font-bold">·</p>
          <p className="text-gray-500">38m</p>
        </div>
        <div>
          <p>{post.content}</p>
        </div>
        <div className="flex gap-10 items-center">
          <span className="flex justify-center items-center gap-2 hover:text-blue-400 hover:cursor-pointer">
            <FaRegComment />
            <p>100</p>
          </span>
          <span className="flex justify-center items-center gap-2 hover:text-red-400 hover:cursor-pointer">
            <FaRegHeart />
            <p>100</p>
          </span>
          {/* <FaRegShareSquare /> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
