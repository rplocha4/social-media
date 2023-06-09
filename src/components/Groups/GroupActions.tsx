import {
  useJoinGroupMutation,
  useSentRequestQuery,
  useCancelRequestMutation,
} from '../../store/features/serverApi';
import Loading from '../UI/Loading';
import { useShowInfo } from '../context/ShowInfoProvider';

export default function GroupActions({ group_id }: { group_id: string }) {
  const user_id = localStorage.getItem('user_id') || '';
  const [requestJoin] = useJoinGroupMutation();
  const [cancelRequest] = useCancelRequestMutation();
  const {
    data: sentRequest,
    refetch: requestRefetch,
    isLoading,
  } = useSentRequestQuery({
    group_id,
    user_id,
  });
  const { displayInfo } = useShowInfo();

  if (isLoading) return <Loading />;

  return (
    <>
      {sentRequest?.hasSentRequest ? (
        <div className="bg-red-600 hover:bg-red-500 text-white rounded-md p-2  flex items-center justify-center">
          <button
            className="
             text-white rounded-md flex items-center justify-center"
            onClick={() => {
              cancelRequest({
                group_id,
                user_id,
              }).then(() => {
                requestRefetch();
                displayInfo({
                  message: 'Request canceled successfully',
                  color: 'green',
                });
              });
            }}
          >
            Cancel request
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2 "
          onClick={() => {
            requestJoin({
              group_id,
              user_id,
            }).then(() => {
              requestRefetch();
              displayInfo({
                message: 'Request sent successfully',
                color: 'green',
              });
            });
          }}
        >
          Request join
        </button>
      )}
    </>
  );
}
