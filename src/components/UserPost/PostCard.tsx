import { FaRegComment } from 'react-icons/fa';
import {
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../store/features/serverApi';
import { TPost } from '../../types/types';
import PostData from './PostData';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideInfo, showInfo } from '../../store/uiSlice';
import { RootState } from '../../store/store';
import { BsThreeDots } from 'react-icons/bs';

const PostCard: React.FC<{ post: TPost; onRefetch: () => void }> = ({
  post,
  onRefetch,
}) => {
  const [isLiking, setIsLiking] = useState(post.liked === 1 ? true : false);
  const [likes, setLikes] = useState(post.likes);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const dispatch = useDispatch();
  const userSelector = useSelector((state: RootState) => {
    return state.user;
  });
  const userPost = userSelector.username === post.username;
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="border-t border-gray-600 p-2 relative">
      <div className="flex flex-col gap-3">
        <PostData
          username={post.username}
          img={post.avatar}
          content={post.content}
          image={post.image}
          link={`/post/${post.post_id}`}
        />
        <div className="absolute right-3 top-5 hover:cursor-pointer">
          <BsThreeDots
            onClick={() => {
              setOptionsOpen(true);
            }}
          />
        </div>
        {userPost && optionsOpen && (
          <div
            className="absolute -right-32 w-32 top-5 flex flex-col items-center justify-center  bg-gray-800 rounded-md "
            ref={ref}
          >
            <span
              className="hover:cursor-pointer hover:bg-blue-400 w-full bg-blue-600 flex items-center justify-center rounded-lg p-2"
              onClick={() => {
                setOptionsOpen(false);
              }}
            >
              Edit
            </span>
            <span
              className="hover:cursor-pointer hover:bg-red-400 w-full bg-red-600 flex items-center justify-center rounded-lg p-2"
              onClick={() => {
                deletePost(post.post_id).then(() => {
                  onRefetch();
                  dispatch(
                    showInfo({
                      message: 'Successfully deleted post',
                      color: 'green',
                    })
                  );
                  setTimeout(() => {
                    dispatch(hideInfo());
                  }, 2000);
                });
                setOptionsOpen(false);
              }}
            >
              Delete
            </span>
          </div>
        )}
        {/* <div className="flex items-center gap-2 text-gray-500 py-2">
          <p>{post.timestamp.split('T')[0]}</p>
          <p>{post.timestamp.split('T')[1].split('.')[0]}</p>
        </div> */}

        <div className="flex gap-10 items-center mx-16 text-gray-600 text-lg">
          <span className="flex justify-center items-center gap-2 hover:text-blue-400 hover:cursor-pointer">
            <FaRegComment />
            <p>{post.comments}</p>
          </span>
          <span
            className="flex justify-center items-center gap-2  hover:text-red-400 hover:cursor-pointer"
            onClick={() => {
              if (userSelector.user_id === null) {
                dispatch(
                  showInfo({
                    message: 'You must be logged in to like posts',
                    color: 'red',
                  })
                );
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 2000);
                return;
              }

              if (isLiking) {
                unlikePost({
                  post_id: post.post_id,
                  user_id: userSelector.user_id,
                });
                setIsLiking(false);
                setLikes((prev) => prev - 1);
                dispatch(
                  showInfo({
                    message: 'Successfully unliked post',
                    color: 'blue',
                  })
                );
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 2000);
              } else {
                likePost({
                  post_id: post.post_id,
                  user_id: userSelector.user_id,
                });
                setIsLiking(true);
                setLikes((prev) => prev + 1);
                dispatch(
                  showInfo({
                    message: 'Successfully liked post',
                    color: 'blue',
                  })
                );
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 2000);
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
