import React from 'react';
import UserData from '../UserPost/UserData';

const CommentCard: React.FC<{ comment: any }> = ({ comment }) => {
  console.log(comment);

  return (
    <div className="border-t border-gray-600 w-full p-2">
      <div className="flex flex-col gap-3">
        <UserData
          username={comment.username}
          img={comment.avatar}
          content={comment.content}
        />
      </div>
    </div>
  );
};

export default CommentCard;
