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
} from '../store/features/serverApi';
import Posts from '../components/UserPost/Posts';
import Loading from '../components/UI/Loading';
import { BsCalendar3WeekFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { hideInfo, showInfo } from '../store/uiSlice';
import { setAvatar } from '../store/userSlice';
import { RootState } from '../store/store';

function Profile() {
  const { username, id }: any = useLoaderData();

  // const userSelector = useSelector((state: RootState) => state.user);
  const [results, setResults] = React.useState([]);
  const [filter, setFilter] = React.useState('posts');
  const [loading, setLoading] = React.useState(true);
  const [profileHover, setProfileHover] = React.useState(false);
  const [backgroundHover, setBackgroundHover] = React.useState(false);

  const userSelector = useSelector((state: RootState) => state.user);

  const { data: followers } = useGetFollowersQuery(id);
  // const { data: following } = useGetFollowingQuery(id);
  const [isFollowing, setIsFollowing] = React.useState(false);

  const [follow] = useFollowUserMutation();
  const [unfollow] = useUnfollowUserMutation();

  const dispatch = useDispatch();

  const isUserPage = username === userSelector.username;

  const {
    data,
    isLoading: userIsLoading,
    refetch: refetchUser,
  } = useGetUserQuery(username);
  const [getPosts] = useLazyGetUserPostsQuery();
  const [getLikes] = useLazyGetUserLikesQuery();
  const [getComments] = useLazyGetUserCommentsQuery();

  const [updateUser] = useUpdateUserMutation();
  const backgroundRef = React.useRef<HTMLInputElement>(null);
  const avatarRef = React.useRef<HTMLInputElement>(null);

  const fetchData = useCallback(
    (filter: string) => {
      switch (filter) {
        case 'posts':
          getPosts(username).then((res) => {
            setResults(res.data.data);
            setLoading(false);
          });
          break;
        case 'likes':
          getLikes(username).then((res) => {
            setResults(res.data.data);
            setLoading(false);
          });
          break;
        case 'comments':
          getComments(username).then((res) => {
            setResults(res.data.data);
            setLoading(false);
          });
          break;
        default:
          break;
      }
    },
    [getComments, getLikes, getPosts, username]
  );

  const showMessage = (res: any) => {
    if (res.error) {
      dispatch(
        showInfo({
          message: res.error.data.message,
          color: 'red',
        })
      );
      setTimeout(() => {
        dispatch(hideInfo());
      }, 2000);
    } else {
      dispatch(
        showInfo({
          message: res.data.message,
          color: 'green',
        })
      );
      setTimeout(() => {
        dispatch(hideInfo());
      }, 2000);
    }
  };

  const updateProfileHandler = (file: File, type: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append(type, 'true');
    formData.append('user_id', data.data.user_id);

    updateUser({
      body: formData,
    }).then((res: any) => {
      const avatar = res.data.avatar;

      dispatch(setAvatar(avatar));

      dispatch(
        showInfo({
          message: `${type} updated successfully`,
          color: 'green',
        })
      );
      setTimeout(() => {
        dispatch(hideInfo());
      }, 2000);
      refetchUser();
    });
  };
  // useEffect(() => {
  //   if (followers) {
  //     const isFollowing = followers.data.some(
  //       (follower) => follower.user_id === userSelector.user_id
  //     );
  //     setIsFollowing(isFollowing);
  //   }
  // }, [followers, userSelector.user_id]);
  useEffect(() => {
    setLoading(true);
    fetchData(filter);
  }, [filter, fetchData]);

  if (userIsLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-rows-4 grid-cols-1">
        <div
          className="row-start-1 row-span-3 col-start-1 bg-gray-400 relative"
          style={{
            backgroundImage: `url(${data?.data.background_image})`,
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
              src={
                data.data.avatar
                  ? data.data.avatar
                  : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
              }
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
          {!isUserPage && (
            <button
              className="mt-10 border rounded-lg px-3 py-1 darkHover"
              onClick={() =>
                isFollowing
                  ? unfollow({
                      user_id: id,
                      follower: localStorage.getItem('user_id'),
                    }).then((res: any) => {
                      showMessage(res);
                    })
                  : follow({
                      user_id: id,
                      follower: localStorage.getItem('user_id'),
                    }).then((res: any) => {
                      showMessage(res);
                    })
              }
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div>
          <div className="p-2 flex flex-col gap-2">
            <p className="font-bold text-xl">{data.data.username}</p>
            <span className="text-gray-500">
              <p className="flex items-center gap-3">
                <BsCalendar3WeekFill />
                Joined {data.data.date_joined.split('T')[0]}
              </p>
            </span>
            <span className="text-gray-500 flex gap-2 items-center">
              <span className="flex items-center gap-1 hover:underline hover:cursor-pointer">
                <p className="text-white font-bold">{data.data.following}</p>
                <p>Following</p>
              </span>
              <span className="flex items-center gap-1 hover:underline hover:cursor-pointer">
                <p className="text-white font-bold">{data.data.followers}</p>
                <p>Followers</p>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => setFilter('posts')}
        >
          Posts
        </button>
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => setFilter('likes')}
        >
          Likes
        </button>
        <button
          className="px-4 py-2 rounded-lg flex-1 hover:bg-gray-600"
          onClick={() => setFilter('comments')}
        >
          Comments
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {loading ? (
          <Loading />
        ) : results?.length > 0 ? (
          <Posts
            posts={results}
            onRefetch={() => {
              fetchData(filter);
            }}
          />
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
}

export default Profile;

export async function loader({ params }: { params: any }) {
  const { username } = params;
  const res = await fetch(`http://localhost:3000/api/user/${username}`);
  const data = await res.json();
  const id = data.data.user_id;

  return { username, id };
}
