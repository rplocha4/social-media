import React from 'react';
import CommentCard from './CommentCard';
import { TComment } from '../../types/types';

const Comments: React.FC<{ comments: TComment[] }> = ({ comments }) => {
  return (
    <div className="">
      {comments.map((comment: TComment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
