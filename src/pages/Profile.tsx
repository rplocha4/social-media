import React, { useCallback, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import {
  useLazyGetUserCommentsQuery,
  useLazyGetUserLikesQuery,
  useLazyGetUserPostsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetFollowersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowingQuery,
  useLazyUserEventsQuery,
} from '../store/features/serverApi';
import Posts from '../components/UserPost/Posts';
import Loading from '../components/UI/Loading';
import { BsCalendar3WeekFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../store/userSlice';
import { RootState } from '../store/store';
import Follows from '../components/Follows';
import UserActions from '../components/UserActions';
import { socket } from '../socket';
import { TEvent, defaultAvatar } from '../types/types';
import EventsResult from '../components/Events/EventsResult';
import { useShowInfo } from '../components/context/ShowInfoProvider';

const typeFilter = {
  posts: 'posts',
  likes: 'likes',
  comments: 'comments',
  events: 'events',
};

function Profile() {
  const { username } = useLoaderData() as {
    username: string;
  };

  // const userSelector = useSelector((state: RootState) => state.user);
  const [results, setResults] = React.useState([]);
  const [filter, setFilter] = React.useState('posts');
  const [loading, setLoading] = React.useState(true);
  const [profileHover, setProfileHover] = React.useState(false);
  const [backgroundHover, setBackgroundHover] = React.useState(false);
  const { displayInfo } = useShowInfo();

  const userSelector = useSelector((state: RootState) => state.user);

  const {
    data: followers,
    isLoading: followersLoading,
    refetch: refetchFollowers,
  } = useGetFollowersQuery(username);
  const { data: following, isLoading: followingLoading } =
    useGetFollowingQuery(username);

  const isFollowing = followers
    ? followers.followers.some((f: { user_id: string }) => {
        return f.user_id == userSelector.user_id;
      })
    : false;

  const { data: userData } = useGetUserQuery(username);

  const id = userData?.data.user_id;

  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const dispatch = useDispatch();

  const isUserPage = username === userSelector.username;

  const {
    data: user,
    isLoading: userIsLoading,
    refetch: refetchUser,
  } = useGetUserQuery(username);
  const [getPosts] = useLazyGetUserPostsQuery();
  const [getLikes] = useLazyGetUserLikesQuery();
  const [getComments] = useLazyGetUserCommentsQuery();
  const [userEvents] = useLazyUserEventsQuery();

  const [updateUser] = useUpdateUserMutation();
  const backgroundRef = React.useRef<HTMLInputElement>(null);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const fetchData = useCallback(
    (filter: string) => {
      setFilter(filter);
      setLoading(true);
      switch (filter) {
        case typeFilter.posts:
          getPosts(username).then((res) => {
            setResults(res.data.data);
            setLoading(false);
          });
          break;
        case typeFilter.likes:
          getLikes(username).then((res) => {
            setResults(res.data.data);
            setLoading(false);
          });
          break;
        case typeFilter.comments:
          getComments(username).then((res) => {
            setResults(res.data.data);
            setLoading(false);
          });
          break;
        case typeFilter.events:
          userEvents(username).then((res) => {
            setResults(res.data);
            setLoading(false);
          });
          break;

        default:
          break;
      }
    },
    [getComments, getLikes, getPosts, username, userEvents]
  );

  const showMessage = (res: {
    error: { data: { message: string } };
    data: { message: string };
  }) => {
    if (res.error) {
      displayInfo({
        message: res.error.data.message,
        color: 'red',
      });
    } else {
      displayInfo({
        message: res.data.message,
        color: 'green',
      });
    }
  };

  const updateProfileHandler = (file: File, type: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append(type, 'true');
    formData.append('user_id', user.data.user_id);

    updateUser({
      body: formData,
    }).then((res: any) => {
      const avatar = res.data.avatar;

      dispatch(setAvatar(avatar));
      displayInfo({
        message: `${type} updated successfully`,
        color: 'green',
      });
      refetchUser();
    });
  };

  useEffect(() => {
    fetchData(typeFilter.posts);
  }, [fetchData]);

  if (userIsLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col ">
      <div className="grid grid-rows-4 grid-cols-1">
        <div
          className="row-start-1 row-span-3 col-start-1 bg-gray-400 relative"
          style={{
            backgroundImage: `url(${user?.data.background_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onMouseEnter={() => {
            setBackgroundHover(true);
          }}
          onMouseLeave={() => {
            setBackgroundHover(false);
          }}
        >
          {isUserPage && backgroundHover && (
            <div
              className="absolute bg-black opacity-70 top-0 w-full h-full flex justify-center items-center text-4xl text-white"
              onClick={() => {
                backgroundRef.current?.click();
              }}
            >
              <AiOutlineEdit />
              <input
                type="file"
                accept="image/*"
                ref={backgroundRef}
                className="hidden"
                onChange={() => {
                  if (backgroundRef.current?.files) {
                    updateProfileHandler(
                      backgroundRef.current.files[0],
                      'background_image'
                    );
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className="flex items-center p-2 justify-between row-start-3 row-span-2 col-start-1 ">
          <div
            className="self-start relative"
            onMouseEnter={() => {
              setProfileHover(true);
            }}
            onMouseLeave={() => {
              setProfileHover(false);
            }}
          >
            <img
              className="rounded-full  border-2 border-gray-900"
              src={user.data.avatar ? user.data.avatar : defaultAvatar}
              alt="user profile"
              style={{ height: '150px', width: '150px' }}
            />
            {isUserPage && profileHover && (
              <div
                className="absolute bg-black opacity-70 top-0 rounded-full flex justify-center items-center text-4xl text-white"
                style={{ height: '150px', width: '150px' }}
                onClick={() => {
                  avatarRef.current?.click();
                }}
              >
                <AiOutlineEdit />
                <input
                  type="file"
                  accept="image/*"
                  ref={avatarRef}
                  className="hidden"
                  onChange={() => {
                    if (avatarRef.current?.files) {
                      updateProfileHandler(
                        avatarRef.current.files[0],
                        'avatar'
                      );
                    }
                  }}
                />
              </div>
            )}
          </div>
          {!isUserPage ? (
            <button
              className="mt-10 border rounded-lg px-3 py-1 darkHover"
              onClick={() => {
                isFollowing
                  ? unfollow({
                      user_id: id,
                      follower: localStorage.getItem('user_id'),
                    }).then((res: any) => {
                      refetchFollowers();
                      showMessage(res);
                    })
                  : follow({
                      user_id: id,
                      follower: localStorage.getItem('user_id'),
                    }).then((res: any) => {
                      refetchFollowers();
                      socket.emit('follow', {
                        author: user.data.username,
                        follower: userSelector.username,
                      });

                      showMessage(res);
                    });
              }}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          ) : (
            <div className="mt-5">
              <UserActions
                isPrivate={user.data?.private}
                onChange={refetchUser}
                user_id={id}
              />
            </div>
          )}
        </div>
        <div>
          <div className="p-2 flex flex-col gap-2">
            <p className="font-bold text-xl">{user.data.username}</p>
            <span className="text-gray-500">
              <p className="flex items-center gap-3">
                <BsCalendar3WeekFill />
                Joined {user.data.date_joined.split('T')[0]}
              </p>
            </span>
            <span className="text-gray-500 flex gap-2 items-center">
              <Follows
                type="Followers"
                data={followers ? followers.followers : []}
                isLoading={followersLoading}
              />
              <Follows
                type="Following"
                data={following ? following.following : []}
                isLoading={followingLoading}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => fetchData(typeFilter.posts)}
        >
          Posts
        </button>
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => fetchData(typeFilter.likes)}
        >
          Likes
        </button>
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => fetchData(typeFilter.comments)}
        >
          Comments
        </button>
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => fetchData(typeFilter.events)}
        >
          Events
        </button>
      </div>
      {user.data.private && !isUserPage && !isFollowing ? (
        <div className="flex justify-center items-center p-2 text-xl font-bold text-blue-500">
          <p>This user's profile is private, follow to see their {filter}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {loading ? (
            <Loading />
          ) : results?.length > 0 ? (
            filter === typeFilter.events ? (
              <EventsResult
                events={results as TEvent[]}
                onRefetch={() => {
                  fetch(filter);
                }}
              />
            ) : (
              <Posts
                posts={results}
                onRefetch={() => {
                  fetchData(filter);
                }}
              />
            )
          ) : (
            <div className="flex justify-center items-center p-2 text-xl font-bold text-blue-500">
              <p>
                No {filter} by {isUserPage ? 'you' : user.data.username} found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: any) {
  const { username } = params;
  return { username };
}
