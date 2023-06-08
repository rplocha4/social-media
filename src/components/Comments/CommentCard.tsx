import React, { useRef, useState } from 'react';
import PostData from '../UserPost/PostData';
import { TComment } from '../../types/types';
import { BsThreeDots } from 'react-icons/bs';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../store/features/serverApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreatePost from '../UserPost/CreatePost';
import Modal from '../UI/Modal';
import { hideInfo, showInfo } from '../../store/uiSlice';
import useClickOutside from '../../hooks/useClickOutside';

const CommentCard: React.FC<{ comment: TComment; onRefetch: () => void }> = ({
  comment,
  onRefetch,
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const userSelector = useSelector((state: RootState) => {
    return state.user;
  });
  const userComment = userSelector.username === comment.username;
  const [editOpen, setEditOpen] = useState(false);
  const [editComment] = useUpdateCommentMutation();

  const ref = useRef<HTMLDivElement>(null);
  const [optionsOpen, setOptionsOpen] = useClickOutside(ref);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setOptionsOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [ref]);
  return (
    <>
      {editOpen && (
        <Modal
          onClose={() => {
            setEditOpen(false);
          }}
        >
          <CreatePost
            data={comment.content}
            imageFile={comment.image}
            onCreate={(formData) => {
              editComment({
                comment_id: comment.comment_id,
                body: formData,
              }).then(() => {
                setEditOpen(false);
                onRefetch();
                dispatch(
                  showInfo({
                    message: 'Comment updated',
                    color: 'blue',
                  })
                );
                setTimeout(() => {
                  dispatch(hideInfo());
                }, 3000);
                setOptionsOpen(false);
              });
            }}
          />
        </Modal>
      )}

      <div className="border-t border-gray-600 w-full px-2 py-5 relative">
        <div className="flex flex-col gap-3">
          <PostData
            username={comment.username}
            img={comment.avatar}
            content={comment.content}
            image={comment.image}
            link={`/post/${comment.post_id}`}
          />
          <div className="absolute right-3 top-5 hover:cursor-pointer">
            <BsThreeDots
              onClick={() => {
                setOptionsOpen(true);
              }}
            />
          </div>
          {userComment && optionsOpen && (
            <div
              className="absolute -right-32 w-32 top-5 flex flex-col items-center justify-center  bg-gray-800 rounded-md "
              ref={ref}
            >
              <span
                className="hover:cursor-pointer hover:bg-blue-400 w-full bg-blue-600  flex items-center justify-center rounded-lg p-2"
                onClick={() => {
                  setOptionsOpen(false);
                  setEditOpen(true);
                }}
              >
                Edit
              </span>
              <span
                className="hover:cursor-pointer hover:bg-red-400  bg-red-600 w-full flex items-center justify-center rounded-lg p-2"
                onClick={() => {
                  deleteComment(comment.comment_id).then(() => {
                    onRefetch();
                    dispatch(
                      showInfo({
                        message: 'Comment deleted',
                        color: 'red',
                      })
                    );
                    setTimeout(() => {
                      dispatch(hideInfo());
                    }, 3000);
                  });

                  setOptionsOpen(false);
                }}
              >
                Delete
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
