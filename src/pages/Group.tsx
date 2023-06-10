import { useMemo } from 'react';
import { useLoaderData } from 'react-router';
import {
  useCreateGroupPostMutation,
  useGetGroupQuery,
  useJoinGroupMutation,
  useSentRequestQuery,
} from '../store/features/serverApi';
import Loading from '../components/UI/Loading';
import CreatePost from '../components/UserPost/CreatePost';
import PostData from '../components/UserPost/PostData';
import Follows from '../components/Follows';
import { useDispatch } from 'react-redux';
import { showInfo, hideInfo } from '../store/uiSlice';
import Requests from '../components/Groups/Requests';
import GroupActions from '../components/Groups/GroupActions';

function Group() {
  const id = useLoaderData();
  const { data: groupData, isLoading, isError, refetch } = useGetGroupQuery(id);
  const [createGroupPost] = useCreateGroupPostMutation();
  const user_id = localStorage.getItem('user_id') || '';

  //   const [requestDecision] = useRequestDecisionMutation();

  const dispatch = useDispatch();
  const username = localStorage.getItem('username') || '';

  const isMember = useMemo(() => {
    if (groupData) {
      return groupData.users?.some(
        (user: { username: string }) => user.username === username
      );
    }
  }, [groupData, username]);

  const isOwner = useMemo(() => {
    if (groupData) {
      return groupData.admin_id == user_id;
    }
  }, [groupData, user_id]);

  const createPostHandler = (formData: FormData) => {
    createGroupPost({
      body: formData,
      group_id: groupData.id,
    }).then(() => {
      //   console.log(res);
      dispatch(
        showInfo({
          message: 'Post in group created successfully',
          color: 'green',
        })
      );
      setTimeout(() => {
        dispatch(hideInfo());
      }, 2000);

      refetch();
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  //   console.log(groupData);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <img
        src={groupData.background_image}
        alt=""
        className="w-full h-96 object-cover object-center"
      />
      <h1 className="text-4xl font-bold">{groupData.name}</h1>
      <div className="text-2xl hover:cursor-pointer">
        <Follows
          type={`${groupData.users.length === 1 ? ' Member' : ' Members'}`}
          data={groupData.users.map(
            (user: { id: string; username: string; avatar: string }) => {
              return {
                user_id: user.id,
                username: user.username,
                avatar: user.avatar,
              };
            }
          )}
          isLoading={isLoading}
        />
      </div>

      {!isMember ? (
        <GroupActions group_id={groupData.id} />
      ) : (
        <>
          <div>{isOwner && <Requests id={groupData.id} />}</div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <CreatePost
              placeholder="Share something with the group"
              onCreate={createPostHandler}
            />
          </div>
          <div className="flex flex-col gap-5">
            {groupData.posts.map(
              (post: {
                id: string;
                content: string;
                image: string;
                author: {
                  avatar: string;
                  username: string;
                };
              }) => (
                <div className="border-t border-gray-600 p-2" key={post.id}>
                  <PostData
                    img={post.author.avatar}
                    username={post.author.username}
                    content={post.content}
                    link={`/group/${groupData.id}`}
                    image={post.image}
                  />
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Group;

export const loader = ({ params }: any) => {
  const { id } = params;

  return id;
};
