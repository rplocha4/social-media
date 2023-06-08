import React, { useEffect, useState } from 'react';
import Loading from '../UI/Loading';
import { useSelector } from 'react-redux';
import { useLazyGetConversationsQuery } from '../../store/features/serverApi';
import { RootState } from '../../store/store';
import { defaultAvatar } from '../../types/types';

const PrevChats: React.FC<{
  onSelect: (receiver: {
    username: string;
    avatar: string;
    id: string;
  }) => void;
}> = ({ onSelect }) => {
  const { user_id } = useSelector((state: RootState) => state.user);
  const [prevChats, setPrevChats] = useState<
    {
      user_id: string;
      username: string;
      avatar: string;
    }[]
  >([]);
  const [isLoadingPrevChats, setIsLoadingPrevChats] = useState(false);

  const [getConversations] = useLazyGetConversationsQuery();

  useEffect(() => {
    if (!user_id) return;
    setIsLoadingPrevChats(true);
    getConversations(user_id).then((res) => {
      setIsLoadingPrevChats(false);
      if (res.data.length === 0) return;
      setPrevChats(res.data);
    });
  }, [user_id, getConversations]);

  if (isLoadingPrevChats) {
    return <Loading />;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {prevChats?.map(
        (
          chat: {
            user_id: string;
            username: string;
            avatar: string;
          },
          i
        ) => {
          return (
            <div
              key={i}
              onClick={() => {
                onSelect({
                  username: chat.username,
                  avatar: chat?.avatar ?? defaultAvatar,
                  id: chat.user_id,
                });
              }}
              className="flex flex-col items-center justify-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-slate-800"
            >
              <img
                src={chat?.avatar ?? defaultAvatar}
                alt=""
                style={{
                  height: '50px',
                  width: '50px',
                  minWidth: '50px',
                  minHeight: '50px',
                }}
                className="rounded-full"
              />
              <p>{chat.username}</p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PrevChats;
