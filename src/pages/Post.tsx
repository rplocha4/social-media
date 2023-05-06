import React from 'react';
import { Await, defer, useLoaderData } from 'react-router';
import { TPost } from '../types/types';
import UserData from '../components/UserPost/UserData';
import Posts from '../components/UserPost/Posts';
import CreatePost from '../components/UserPost/CreatePost';
import Comments from '../components/Comments/Comments';

function Post() {
  const data: any = useLoaderData();
  const { post }: { post: TPost } = data;
  const { comments } = data;

  return (
    <div className="w-full flex-col  p-2">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={post}>
          {(loadedPost) => {
            console.log(loadedPost);
            return (
              <div className="flex flex-col w-full gap-3 border-b-2 border-gray-600">
                <UserData
                  username={loadedPost.data.username}
                  img={loadedPost.data.avatar}
                  content={loadedPost.data.content}
                />
                {/* <PostData post_id={loadedPost.data.post_id} /> */}
                <div className="flex items-center gap-2 text-gray-500 py-2">
                  <p>{loadedPost.data.timestamp.split('T')[0]}</p>
                  <p>{loadedPost.data.timestamp.split('T')[1].split('.')[0]}</p>
                </div>
              </div>
            );
          }}
        </Await>
        <CreatePost placeholder="Type your reply" />

        <Await resolve={comments}>
          {(loadedComments) => {
            return <Comments comments={loadedComments.data} />;
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default Post;
export async function loader({ params }: any) {
  const { id } = params;

  const res = fetch(`http://localhost:3000/api/post/${id}`);
  const comments = fetch(`http://localhost:3000/api/comments/${id}`);

  return defer({
    post: res.then((res) => res.json()),
    comments: comments.then((res) => res.json()),
  });
}
