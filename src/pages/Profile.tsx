import React, { useCallback, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import {
  useLazyGetUserCommentsQuery,
  useLazyGetUserLikesQuery,
  useLazyGetUserPostsQuery,
  useGetUserQuery,
} from '../store/features/serverApi';
import Posts from '../components/UserPost/Posts';
import Loading from '../components/UI/Loading';
import { BsCalendar3WeekFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

function Profile() {
  const username = useLoaderData();
  // const userSelector = useSelector((state: RootState) => state.user);
  const [results, setResults] = React.useState([]);
  const [filter, setFilter] = React.useState('posts');
  const [loading, setLoading] = React.useState(true);
  const [profileHover, setProfileHover] = React.useState(false);
  const [backgroundHover, setBackgroundHover] = React.useState(false);

  const { data, isLoading: userIsLoading } = useGetUserQuery(username);
  const [getPosts] = useLazyGetUserPostsQuery();
  const [getLikes] = useLazyGetUserLikesQuery();
  const [getComments] = useLazyGetUserCommentsQuery();

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
  useEffect(() => {
    console.log('asd');

    setLoading(true);
    fetchData(filter);
  }, [filter, fetchData]);

  if (userIsLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-rows-4 mt-10 grid-cols-1">
        <div className="row-start-1 row-span-2 col-start-1 bg-gray-400"></div>
        <div className="flex items-center p-2 justify-between row-start-2 row-span-2 col-start-1 ">
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU"
              alt="user profile"
              style={{ height: '150px', width: '150px' }}
            />
            {profileHover && (
              <div
                className="absolute bg-black opacity-70 top-0 rounded-full flex justify-center items-center text-4xl text-white"
                style={{ height: '150px', width: '150px' }}
              >
                <AiOutlineEdit />
              </div>
            )}
          </div>

          <button className="mt-10 border rounded-lg px-3 py-1 darkHover">
            Follow
          </button>
        </div>
        <div>
          <div className="p-2 flex flex-col gap-2">
            <p className="font-bold text-xl">{data.data.username}</p>
            <p className="text-gray-500">
              <span className="flex items-center gap-3">
                <BsCalendar3WeekFill />
                Joined {data.data.date_joined.split('T')[0]}
              </span>
            </p>
            <p className="text-gray-500 flex gap-2 items-center">
              <span className="flex items-center gap-1 hover:underline hover:cursor-pointer">
                <p className="text-white font-bold">{data.data.following}</p>
                <p>Following</p>
              </span>
              <span className="flex items-center gap-1 hover:underline hover:cursor-pointer">
                <p className="text-white font-bold">{data.data.followers}</p>
                <p>Followers</p>
              </span>
            </p>
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
          <Posts posts={results} />
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
}

export default Profile;

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  return id;
}
