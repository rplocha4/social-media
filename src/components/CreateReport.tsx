import { useState } from 'react';
import Modal from './UI/Modal';
import { usePostReportMutation } from '../store/features/serverApi';
import { useShowInfo } from './context/ShowInfoProvider';

const reasons = [
  'Spam',
  'Inappropriate',
  'Harassment',
  'Intellectual property violation',
  'Other',
];

function CreateReport({
  post_id,
  comment_id,
  onClose,
}: {
  post_id?: string;
  comment_id?: string;
  onClose: () => void;
}) {
  const [createReport] = usePostReportMutation();
  const user_id = localStorage.getItem('user_id') || '';
  // const [reason, setReason] = useState('');
  const { displayInfo } = useShowInfo();

  const [reportReasons, setReportReasons] = useState<string[]>([]);

  const reportHandler = () => {
    const reason = reportReasons.join(', ');
    if (post_id) {
      createReport({ body: { post_id, user_id, report_reason: reason } }).then(
        () => {
          onClose();

          displayInfo({ message: 'Reported successfully', color: 'green' });
        }
      );
    } else if (comment_id) {
      createReport({
        body: { comment_id, user_id, report_reason: reason },
      }).then(() => {
        onClose();

        displayInfo({ message: 'Reported successfully', color: 'green' });
      });
    }
  };

  return (
    <>
      <Modal onClose={() => onClose()}>
        <div className="flex flex-col items-center justify-center w-full gap-4 p-10">
          <div className="flex flex-col gap-5 items-center justify-center w-full">
            <h1 className="text-4xl font-bold">
              {post_id ? 'Report Post' : 'Report Comment'}
            </h1>
            {reasons.map((reason) => (
              <div className="flex gap-4 text-2xl" key={reason}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setReportReasons([...reportReasons, reason]);
                    } else {
                      setReportReasons(
                        reportReasons.filter((r) => r !== reason)
                      );
                    }
                  }}
                />
                <p>{reason}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <span
              className="hover:cursor-pointer hover:bg-green-400 w-full bg-green-600 flex items-center justify-center rounded-lg p-2"
              onClick={reportHandler}
            >
              Submit
            </span>
            <span
              className="hover:cursor-pointer hover:bg-red-400 w-full bg-red-600 flex items-center justify-center rounded-lg p-2"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateReport;
