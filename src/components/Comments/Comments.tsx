import React from 'react';
import CommentCard from './CommentCard';

const Comments: React.FC<{ comments: any }> = ({ comments }) => {
  console.log(comments);

  return (
    <>
      {comments.map((comment: any) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </>
  );
};

export default Comments;
