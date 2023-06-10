import  { useState } from 'react';
import {
  useCreateGroupMutation,
  useGetGroupsQuery,
} from '../store/features/serverApi';
import Loading from '../components/UI/Loading';
import CreateGroup from '../components/Groups/CreateGroup';
import { Link } from 'react-router-dom';

function Groups() {
  const [creatingGroup, setCreatingGroup] = useState(false);
  const { data: groups, isLoading, isError, refetch } = useGetGroupsQuery('');
  const [createGroup] = useCreateGroupMutation();

  const createGroupHandler = (formData: FormData) => {
    setCreatingGroup(false);
    createGroup({ body: formData }).then((res) => {
      console.log(res);
      refetch();
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-screen">
      <div>
        {groups?.length > 0 ? (
          groups?.map((group: { group_id: string; group_name: string }) => (
            <div key={group.group_id}>
              <Link to={`/group/${group.group_id}`}>{group.group_name}</Link>
            </div>
          ))
        ) : (
          <h1>No groups</h1>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setCreatingGroup(true);
          }}
        >
          Create group
        </button>
        {creatingGroup && (
          <CreateGroup
            onClose={() => setCreatingGroup(false)}
            onCreate={createGroupHandler}
          />
        )}
      </div>
    </div>
  );
}

export default Groups;
