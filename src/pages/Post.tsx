import { useLoaderData } from 'react-router';
import PostData from '../components/UserPost/PostData';
import Comments from '../components/Comments/Comments';
import {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useGetPostQuery,
} from '../store/features/serverApi';
import CreatePost from '../components/UserPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Loading from '../components/UI/Loading';
import { hideInfo, showInfo } from '../store/uiSlice';
import { socket } from '../socket';

function Post() {
  const id = useLoaderData() as string;

  const userSelector = useSelector((state: RootState) => state.user);
  const { data: post, isLoading: postLoading } = useGetPostQuery(id);
  const [createComment] = useCreateCommentMutation();
  const {
    data: comments,
    isLoading: commentsLoading,
    refetch,
  } = useGetPostCommentsQuery(id);
  const dispatch = useDispatch();

  const createCommentHandler = (formData: FormData) => {
    if (!userSelector.user_id) {
      dispatch(showInfo({ message: 'You need to be logged in', color: 'red' }));
    }

    formData.append('post_id', id);
    createComment({
      body: formData,
    }).then(() => {
      refetch();
      dispatch(
        showInfo({
          message: 'Comment created successfully',
          color: 'green',
        })
      );
      setTimeout(() => {
        dispatch(hideInfo());
      }, 2000);

      post.data.username !== userSelector.username &&
        socket.emit('comment', {
          author: post.data.username,
          commenter: userSelector.username,
        });
    });
  };

  return (
    <div className="w-full flex-col  p-2">
      <div className="flex flex-col w-full gap-3 border-b-2 border-gray-600">
        {postLoading ? (
          <Loading />
        ) : (
          <>
            <PostData
              username={post.data.username}
              img={post.data.avatar}
              content={post.data.content}
              image={post.data.image}
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
        <Loading />
      ) : (
        <Comments comments={comments.data} onRefetch={refetch} />
      )}
    </div>
  );
}

export default Post;
// eslint-disable-next-line react-refresh/only-export-components
export function loader({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  return id;
}
