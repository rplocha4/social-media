import React, { useCallback, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import {
  useLazyGetUserCommentsQuery,
  useLazyGetUserLikesQuery,
  useLazyGetUserPostsQuery,
} from '../store/features/serverApi';
import Posts from '../components/UserPost/Posts';

function Profile() {
  const username = useLoaderData();
  // const userSelector = useSelector((state: RootState) => state.user);
  const [results, setResults] = React.useState([]);
  const [filter, setFilter] = React.useState('posts');
  const [loading, setLoading] = React.useState(true);
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
    setLoading(true);
    fetchData(filter);
  }, [filter, fetchData]);

  return (
    <div>
      <div className="flex justify-center items-center gap-5">
        <button onClick={() => setFilter('posts')}>Posts</button>
        <button onClick={() => setFilter('likes')}>Likes</button>
        <button onClick={() => setFilter('comments')}>Comments</button>
      </div>
      <div className="flex flex-col gap-2">
        {loading ? (
          <div>Loading...</div>
        ) : results.length > 0 ? (
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
