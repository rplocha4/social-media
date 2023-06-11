import { FaRegComment } from 'react-icons/fa';
import {
  useDeletePostMutation,
  useLikePostMutation,
  usePostReportMutation,
  useUnlikePostMutation,
  useUpdatePostMutation,
} from '../../store/features/serverApi';
import { TPost } from '../../types/types';
import PostData from './PostData';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BsThreeDots } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import Modal from '../UI/Modal';
import CreatePost from './CreatePost';
import { socket } from '../../socket';
import { useShowInfo } from '../context/ShowInfoProvider';
import CreateReport from '../CreateReport';

const PostCard: React.FC<{ post: TPost; onRefetch: () => void }> = ({
  post,
  onRefetch,
}) => {
  const [isLiking, setIsLiking] = useState(post.liked === 1 ? true : false);
  const [likes, setLikes] = useState(post.likes);
  const userSelector = useSelector((state: RootState) => {
    return state.user;
  });
  const userPost = userSelector.username === post.username;
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [editPost] = useUpdatePostMutation();
  const [reportOpen, setReportOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [optionsOpen, setOptionsOpen] = useClickOutside(ref);
  const [editOpen, setEditOpen] = useState(false);
  const likeHandler = () => {
    if (userSelector.username === post.username) return;
    socket.emit('like', {
      liker: userSelector.username,
      author: post.username,
    });
  };
  const { displayInfo } = useShowInfo();

  return (
    <>
      {editOpen && (
        <Modal
          onClose={() => {
            setEditOpen(false);
          }}
        >
          <CreatePost
            onCreate={(data) => {
              editPost({ post_id: post.post_id, body: data }).then(() => {
                onRefetch();
                setEditOpen(false);
                displayInfo({
                  message: 'Successfully edited post',
                  color: 'green',
                });
              });
            }}
            data={post.content}
            imageFile={post.image}
          />
        </Modal>
      )}
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
          {optionsOpen && (
            <div
              className="absolute -right-32 w-32 top-5 flex flex-col items-center justify-center  bg-gray-800 rounded-md "
              ref={ref}
            >
              {userPost ? (
                <>
                  <span
                    className="hover:cursor-pointer hover:bg-blue-400 w-full bg-blue-600 flex items-center justify-center rounded-lg p-2"
                    onClick={() => {
                      setOptionsOpen(false);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </span>
                  <span
                    className="hover:cursor-pointer hover:bg-red-400 w-full bg-red-600 flex items-center justify-center rounded-lg p-2"
                    onClick={() => {
                      deletePost(post.post_id).then(() => {
                        onRefetch();
                        displayInfo({
                          message: 'Successfully deleted post',
                          color: 'green',
                        });
                      });
                      setOptionsOpen(false);
                    }}
                  >
                    Delete
                  </span>
                </>
              ) : (
                <span
                  className="hover:cursor-pointer hover:bg-red-400 w-full bg-red-600 flex items-center justify-center rounded-lg p-2"
                  onClick={() => {
                    setReportOpen(true);
                  }}
                >
                  Report
                </span>
              )}
            </div>
          )}
          {reportOpen && (
            <CreateReport
              post_id={post.post_id}
              onClose={() => setReportOpen(false)}
            />
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
                  displayInfo({
                    message: 'You must be logged in to like posts',
                    color: 'red',
                  });

                  return;
                }

                if (isLiking) {
                  unlikePost({
                    post_id: post.post_id,
                    user_id: userSelector.user_id,
                  });
                  setIsLiking(false);
                  setLikes((prev) => prev - 1);
                  displayInfo({
                    message: 'Successfully unliked post',
                    color: 'blue',
                  });
                } else {
                  likePost({
                    post_id: post.post_id,
                    user_id: userSelector.user_id,
                  });
                  setIsLiking(true);
                  setLikes((prev) => prev + 1);
                  displayInfo({
                    message: 'Successfully liked post',
                    color: 'blue',
                  });

                  likeHandler();
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
    </>
  );
};

export default PostCard;
