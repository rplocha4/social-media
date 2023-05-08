import Posts from '../components/UserPost/Posts';
import CreatePost from '../components/UserPost/CreatePost';
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from '../store/features/serverApi';

export default function Home() {
  //   const data: any = useLoaderData();
  //   const { posts } = data;

  const { data, isLoading, refetch } = useGetPostsQuery(1);
  const [createPost] = useCreatePostMutation();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const createPostHandler = (content: string) => {
    createPost({ content: content, user_id: 3 }).then(() => {
      refetch();
    });
  };
  return (
    <div className="flex flex-col w-full ">
      <CreatePost
        placeholder="What's happening?"
        onCreate={createPostHandler}
      />
      <Posts posts={data.data} />
      {/* <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={posts}>
          {(loadedPosts) => {
            return <Posts posts={loadedPosts.data} />;
          }}
        </Await>
      </React.Suspense> */}
    </div>
  );
}

// export async function loader({ params }: any) {
//   //   const user_id = params.id;
//   const res = fetch(`http://localhost:3000/api/posts/friends/${1}`);

//   return defer({
//     posts: res.then((res) => res.json()),
//   });
// }
