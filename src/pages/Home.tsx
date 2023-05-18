import Posts from '../components/UserPost/Posts';
import CreatePost from '../components/UserPost/CreatePost';
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from '../store/features/serverApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Loading from '../components/UI/Loading';
import { hideInfo, showInfo } from '../store/uiSlice';
export default function Home() {
  const userSelector = useSelector((state: RootState) => state.user);

  const { data, isLoading, refetch } = useGetPostsQuery(userSelector.user_id);
  const dispatch = useDispatch();

  const [createPost] = useCreatePostMutation();
  if (isLoading) {
    return <Loading />;
  }

  const createPostHandler = (formData: FormData) => {
    createPost({
      body: formData,
    }).then(() => {
      dispatch(
        showInfo({
          message: 'Post created successfully',
          color: 'green',
        })
      );
      setTimeout(() => {
        dispatch(hideInfo());
      }, 2000);

      refetch();
    });

    // createPost({
    //   content: content,
    //   image: image ? image : null,
    //   user_id: userSelector.user_id,
    // }).then(() => {
    //   refetch();
    // });
  };
  return (
    <div className="flex flex-col w-full ">
      <CreatePost
        placeholder="What's happening?"
        onCreate={createPostHandler}
        noUserMessage="You need to login to create a post"
      />

      <Posts posts={data?.data} onRefetch={refetch} />
    </div>
  );
}
