import { useMemo, useState } from 'react';
import {
  useGetGroupRequestsQuery,
  useRequestDecisionMutation,
} from '../../store/features/serverApi';
import Loading from '../UI/Loading';
import Modal from '../UI/Modal';

function Requests({ id }: { id: string }) {
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useGetGroupRequestsQuery(id);
  const [requestDecision] = useRequestDecisionMutation();
  const [requestOpen, setRequestOpen] = useState(false);

  const pendingRequests = useMemo(() => {
    if (requests) {
      return requests.filter(
        (request: { status: string }) => request.status === 'pending'
      );
    }
  }, [requests]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <button
        onClick={() => {
          pendingRequests.length > 0 && setRequestOpen(true);
        }}
      >
        {pendingRequests.length} Requests
      </button>
      {requestOpen && (
        <Modal
          onClose={() => {
            setRequestOpen(false);
          }}
        >
          <div className="flex flex-col gap-2">
            {requests?.map(
              (request: {
                user_id: string;
                username: string;
                avatar: string;
                request_id: string;
                status: string;
              }) =>
                request.status === 'pending' && (
                  <div className="flex flex-col gap-2" key={request.user_id}>
                    <div className="flex justify-between">
                      <div className="flex items-center p-2 gap-5">
                        <img
                          src={request.avatar}
                          alt=""
                          className="rounded-full"
                          style={{ height: '50px', width: '50px' }}
                        />
                        <p>{request.username}</p>
                      </div>

                      <div className="flex gap-2 p-5">
                        <button
                          className="bg-green-600 text-white rounded-md p-2 "
                          onClick={() => {
                            requestDecision({
                              group_id: id,
                              user_id: request.user_id,
                              request_id: request.request_id,
                              decision: 'accepted',
                            }).then(() => {
                              refetch();
                            });
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-600 text-white rounded-md p-2 "
                          onClick={() => {
                            requestDecision({
                              group_id: id,
                              user_id: request.user_id,
                              request_id: request.request_id,
                              decision: 'rejected',
                            }).then(() => {
                                
                              refetch();
                            });
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default Requests;
