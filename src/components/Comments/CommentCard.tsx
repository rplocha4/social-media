import React, { useEffect, useRef, useState } from 'react';
import UserData from '../UserPost/PostData';
import { TComment } from '../../types/types';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteCommentMutation } from '../../store/features/serverApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CommentCard: React.FC<{ comment: TComment; onRefetch: () => void }> = ({
  comment,
  onRefetch,
}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [deleteComment] = useDeleteCommentMutation();
  const userSelector = useSelector((state: RootState) => {
    return state.user;
  });
  const userComment = userSelector.username === comment.username;

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
    <div className="border-t border-gray-600 w-full px-2 py-5 relative">
      <div className="flex flex-col gap-3">
        <UserData
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
              }}
            >
              Edit
            </span>
            <span
              className="hover:cursor-pointer hover:bg-red-400  bg-red-600 w-full flex items-center justify-center rounded-lg p-2"
              onClick={() => {
                deleteComment(comment.comment_id).then(() => {
                  onRefetch();
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
  );
};

export default CommentCard;
