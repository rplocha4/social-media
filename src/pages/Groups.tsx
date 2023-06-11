import { useMemo, useState } from 'react';
import {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useLeaveGroupMutation,
} from '../store/features/serverApi';
import Loading from '../components/UI/Loading';
import CreateGroup from '../components/Groups/CreateGroup';
import { Link } from 'react-router-dom';
import GroupActions from '../components/Groups/GroupActions';

function Groups() {
  const [creatingGroup, setCreatingGroup] = useState(false);
  const userId = localStorage.getItem('user_id') || '';
  const {
    data: groups,
    isLoading,
    isError,
    refetch,
  } = useGetGroupsQuery({ userId });
  const [createGroup] = useCreateGroupMutation();
  const [filter, setFilter] = useState('');
  const [leaveGroup] = useLeaveGroupMutation();

  const filteredGroups = useMemo(() => {
    if (groups) {
      return groups.filter((group: { group_name: string }) => {
        return group.group_name.toLowerCase().includes(filter.toLowerCase());
      });
    }
  }, [groups, filter]);

  const createGroupHandler = (formData: FormData) => {
    setCreatingGroup(false);
    createGroup({ body: formData }).then((res) => {
      refetch();
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="min-h-full flex flex-col gap-5 p-10">
      <div>
        <input
          type="text"
          name=""
          id=""
          className="border-2 border-gray-500 p-2 rounded-md w-full"
          placeholder="Search groups"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {filteredGroups?.length > 0 ? (
          filteredGroups?.map(
            (group: {
              group_id: string;
              group_name: string;
              background_image: string;
              is_member: boolean;
            }) => (
              <div key={group.group_id}>
                <div className="flex items-center p-2 border-b gap-2">
                  <img
                    src={group.background_image}
                    alt=""
                    className="w-20 h-20 object-cover object-center"
                  />

                  <Link
                    to={`/group/${group.group_id}`}
                    className="text-3xl font-bold"
                  >
                    {group.group_name}
                  </Link>
                  <div className="flex flex-col w-full">
                    <div className="self-end">
                      {!group.is_member ? (
                        <GroupActions group_id={group.group_id} />
                      ) : (
                        <button
                          className="
                        bg-red-500 hover:bg-red-400 text-white p-2 rounded-md"
                          onClick={() => {
                            leaveGroup({
                              group_id: group.group_id,
                              user_id: userId,
                            }).then((res) => {
                              refetch();
                            });
                          }}
                        >
                          Leave Group
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <h1>No groups</h1>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            setCreatingGroup(true);
          }}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-400"
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
