import React from 'react';
import CommentCard from './CommentCard';
import { TComment } from '../../types/types';

const Comments: React.FC<{ comments: TComment[]; onRefetch: () => void }> = ({
  comments,
  onRefetch,
}) => {
  return (
    <div className="">
      {comments.map((comment: TComment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            onRefetch={onRefetch}
          />
        );
      })}
    </div>
  );
};

export default Comments;
