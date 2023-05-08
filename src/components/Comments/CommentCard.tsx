import React from 'react';
import UserData from '../UserPost/UserData';
import { TComment } from '../../types/types';

const CommentCard: React.FC<{ comment: TComment }> = ({ comment }) => {
  return (
    <div className="border-t border-gray-600 w-full px-2 py-5">
      <div className="flex flex-col gap-3">
        <UserData
          username={comment.username}
          img={comment.avatar}
          content={comment.content}
          link={`/post/${comment.post_id}`}
        />
      </div>
    </div>
  );
};

export default CommentCard;
