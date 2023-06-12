import { Link } from 'react-router-dom';
import {
  useGetReportedPostsQuery,
  useGetReportedCommentsQuery,
} from '../../store/features/serverApi';
import Loading from '../UI/Loading';
import { defaultAvatar } from '../../types/types';
import { useMemo, useState } from 'react';

function Reports() {
  const { data: posts, isLoading, isError } = useGetReportedPostsQuery('');
  const { data: comments, isLoading: commentsLoading } =
    useGetReportedCommentsQuery('');

  const [filter, setFilter] = useState('post');

  const results = useMemo(() => {
    if (filter === 'post') {
      return posts;
    } else {
      return comments;
    }
  }, [filter, posts, comments]);

  if (filter === 'post' && isLoading) return <Loading />;
  if (filter === 'comment' && commentsLoading) return <Loading />;
  if (isError)
    return (
      <div>
        <h1 className="text-3xl text-center font-bold">
          Something went wrong, please try reload the page
        </h1>
      </div>
    );

  return (
    <div className="w-full ">
      <div className="flex justify-center gap-10 p-5">
        <button
          className={`${
            filter === 'post' ? 'bg-blue-400' : 'bg-blue-600'
          } hover:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setFilter('post')}
        >
          Posts
        </button>
        <button
          className={`${
            filter === 'comment' ? 'bg-blue-400' : 'bg-blue-600'
          } hover:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setFilter('comment')}
        >
          Comments
        </button>
      </div>

      <div className="grid grid-cols-3 gap-20  h-80  justify-center">
        {results?.map((report: any, i: number) => {
          return (
            <div className="flex  flex-col p-10 gap-5 " key={i}>
              <div className="flex flex-col gap-5">
                <span className="flex flex-col ">
                  <h2 className="text-3xl text-bold">{filter} content:</h2>
                  <div className="bg-zinc-800">
                    {report.content}
                    {report.image && (
                      <img
                        src={report.image}
                        alt="post"
                        className="w-full h-80 object-cover"
                      />
                    )}
                  </div>
                </span>

                <span>
                  Link:{' '}
                  <Link
                    to={`${
                      report.post_id
                        ? `/post/${report.post_id}`
                        : `/comment/${report.comment_id}`
                    }`}
                    className="text-blue-500 hover:underline hover:cursor-pointer"
                  >
                    Show post
                  </Link>{' '}
                </span>
              </div>

              <div>
                <h2>
                  {report.reports.length}{' '}
                  {report.reports.length === 1 ? 'report' : 'reports'}
                </h2>
                {report.reports.map((report: any, i: number) => {
                  return (
                    <div key={i}>
                      <span className="flex gap-2 items-center">
                        <img
                          src={`${
                            report.user.avatar
                              ? report.user.avatar
                              : defaultAvatar
                          }`}
                          alt="user profile"
                          className="rounded-full self-start"
                          style={{ height: '50px', width: '50px' }}
                        />

                        <p>{report.user.username}</p>
                      </span>
                      <h3>Reason: </h3>
                      <p>{report.report_reason}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reports;
