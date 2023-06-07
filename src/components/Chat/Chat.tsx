import { useEffect, useState, useRef } from 'react';
import { socket } from '../../socket';
import { IoSend } from 'react-icons/io5';
import Search from '../Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  useLazyGetMessagesQuery,
  useSendMessagesMutation,
} from '../../store/features/serverApi';
import Loading from '../UI/Loading';
import { Link } from 'react-router-dom';
import Typing from '../UI/Typing/Typing';
import PrevChats from './PrevChats';
import { showNotification } from '../../store/uiSlice';
import useNotification from '../../hooks/useNotification';

// const convertDate = (date: string) => {
//   const d = new Date(date);
//   const day = d.getDate();
//   const month = d.getMonth();
//   const year = d.getFullYear();
//   const hours = d.getHours();
//   const minutes = d.getMinutes();
//   const seconds = d.getSeconds();
//   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// };
function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [receiver, setReceiver] = useState<{
    username: string;
    avatar: string;
    id: string;
  }>({ username: '', avatar: '', id: '' });
  const [message, setMessage] = useState('');
  const [receiverTyping, setReceiverTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const userSelector = useSelector((state: RootState) => state.user);
  const sender = {
    username: userSelector.username || '',
    avatar: userSelector.avatar || '',
    id: userSelector.user_id || '',
  };
  const [sendMessage] = useSendMessagesMutation();
  const [getMessages] = useLazyGetMessagesQuery();
  const [messages, setMessages] = useState<
    { message: string; sender: string }[]
  >([]);
  const { displayNotification } = useNotification();

  const messagesRef = useRef<null | HTMLDivElement>(null);

  const scrollBottom = () => {
    messagesRef.current?.scrollTo(0, messagesRef.current?.scrollHeight);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  useEffect(() => {
    if (!receiver.username) return;
    setLoadingMessages(true);
    getMessages({ user1_id: sender.id, user2_id: receiver.id }).then((res) => {
      setMessages(
        res.data.map(
          (message: {
            conversation_id: number;
            message_id: number;
            message: string;
            sender_id: string;
            created_at: string;
          }) => {
            return {
              message: message.message,
              created_at: message.created_at,
              sender:
                message.sender_id == sender.id
                  ? sender.username
                  : receiver.username,
            };
          }
        )
      );
      setLoadingMessages(false);
    });
  }, [receiver.id, sender.id, getMessages, receiver.username, sender.username]);

  useEffect(() => {
    if (typing) {
      socket.emit('typing', { receiver: receiver.username });
    } else {
      socket.emit('stop typing', { receiver: receiver.username });
    }
  }, [typing, receiver.username]);

  useEffect(() => {
    socket.on('id', ({ id }) => {
      localStorage.setItem('socketId', id);
      socket.emit('username', { username: sender.username });
      setIsConnected(true);
    });
    socket.on('chat message', ({ message, senderMsg }) => {
      if (senderMsg !== receiver.username) {
        displayNotification(`New message from ${senderMsg}`);
        return;
      }
      setMessages((prev) => [...prev, { message, sender: senderMsg }]);
    });
    socket.on('typing', () => {
      setReceiverTyping(true);
    });
    socket.on('stop typing', () => {
      setReceiverTyping(false);
    });
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      isConnected && setIsConnected(false);
    });

    return () => {
      socket.off('id');
      socket.off('chat message');
      socket.off('typing');
      socket.off('stop typing');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [sender.username, receiver.username, isConnected, dispatch]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receiver.username) return;
    if (!message) return;

    socket.emit('chat message', {
      receiver: receiver.username,
      message,
      sender: sender.username,
    });
    sendMessage({
      body: {
        user1_id: sender.id,
        user2_id: receiver.id,
        message,
      },
    });

    setMessages((prev) => [...prev, { message, sender: sender.username }]);
    setTyping(false);
    setMessage('');
  };

  return (
    <div className=" w-full h-screen max-h-screen p-2 relative flex flex-col">
      <div className="border-b flex justify-between ">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center gap-3">
            {!receiver.username ? (
              <span className="text-xl font-bold self-end h-20">
                Select a user
              </span>
            ) : (
              <Link
                className="hover:underline flex items-center gap-2 h-20"
                to={`/profile/${receiver.username}`}
              >
                <img
                  src={receiver.avatar}
                  alt=""
                  className="rounded-full"
                  style={{ height: '50px', width: '50px' }}
                />
                <span>{receiver.username}</span>
              </Link>
            )}
          </div>
          <div className="">
            <PrevChats onSelect={setReceiver} />
          </div>
        </div>

        <div className="absolute right-0">
          <Search
            onConfirm={(user) => {
              setReceiver(
                user as { username: string; avatar: string; id: string }
              );
            }}
          />
        </div>
      </div>
      {loadingMessages ? (
        <Loading />
      ) : (
        receiver.username && (
          <div
            className="flex flex-col w-full overflow-y-auto h-5/6"
            ref={messagesRef}
          >
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col w-full ${
                    message.sender === sender.username
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  <span
                    className={`p-2 rounded-xl flex items-center gap-2 ${
                      message.sender !== sender.username && 'flex-row-reverse'
                      // ? 'bg-slate-900 text-white'
                      // : 'bg-zinc-200 text-black'
                    }`}
                  >
                    <p className="break-all">{message.message}</p>
                    <img
                      src={
                        message.sender === sender.username
                          ? sender.avatar
                          : receiver.avatar
                      }
                      alt=""
                      className="rounded-full"
                      style={{ height: '50px', width: '50px' }}
                    />
                    {/* {convertDate(message.created_at)} */}
                  </span>
                </div>
              );
            })}
          </div>
        )
      )}

      <div className="h-1/6"></div>

      <form
        action=""
        onSubmit={submitHandler}
        className="absolute bottom-5 w-4/5"
      >
        {receiverTyping && (
          <div className="flex items-center -translate-y-5 translate-x-3">
            {/* <span className="text-xl font-bold">
              {receiver.username} typing...
            </span> */}
            <Typing />
          </div>
        )}
        <span className="w-full rounded-xl  flex items-center justify-between bg-slate-900 p-2">
          <input
            type="text"
            placeholder="Type a message"
            name=""
            id=""
            className="w-full  p-2 rounded-xl bg-inherit outline-none"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setTyping(e.target.value.length > 0 ? true : false);
            }}
          />
          <button>
            <IoSend className="hover:scale-110 " />
          </button>
        </span>
      </form>
    </div>
  );
}

export default Chat;
