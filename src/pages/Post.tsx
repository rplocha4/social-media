import { useLoaderData } from 'react-router';
import UserData from '../components/UserPost/UserData';
import Comments from '../components/Comments/Comments';
import {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useGetPostQuery,
} from '../store/features/serverApi';
import CreatePost from '../components/UserPost/CreatePost';

function Post() {
  const data: any = useLoaderData();
  const { id } = data;
  // const { comments } = data;

  const { data: post, isLoading: postLoading } = useGetPostQuery(id);
  const [createComment] = useCreateCommentMutation();
  const {
    data: comments,
    isLoading: commentsLoading,
    refetch,
  } = useGetPostCommentsQuery(id);

  const createCommentHandler = (content: string) => {
    createComment({ content: content, user_id: 3, post_id: id }).then(() => {
      refetch();
    });

    // fetch(`http://localhost:3000/api/comments`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     content: content,
    //     post_id: id,
    //     user_id: 3,
    //   }),
    // }).then(() => {
    //   refetch();
    // });
  };

  return (
    <div className="w-full flex-col  p-2">
      <div className="flex flex-col w-full gap-3 border-b-2 border-gray-600">
        {postLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <UserData
              username={post.data.username}
              img={post.data.avatar}
              content={post.data.content}
              link={`/post/${post.data.post_id}`}
            />

            <div className="flex items-center gap-2 text-gray-500 py-2">
              <p>{post.data.timestamp.split('T')[0]}</p>
              <p>{post.data.timestamp.split('T')[1].split('.')[0]}</p>
            </div>
          </>
        )}
      </div>
      <CreatePost
        placeholder="Type your reply"
        onCreate={createCommentHandler}
        noUserMessage="You need to login to create a comment"
      />

      {commentsLoading ? (
        <div>Loading...</div>
      ) : (
        <Comments comments={comments.data} />
      )}
    </div>
  );
}

export default Post;
export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  // const res = fetch(`http://localhost:3000/api/post/${id}`);
  // const comments = fetch(`http://localhost:3000/api/comments/${id}`);

  return { id };
}
