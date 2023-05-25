import { useEffect, useState, useRef } from 'react';
import { socket } from '../../socket';
import { IoSend } from 'react-icons/io5';
import Search from '../Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [receiver, setReceiver] = useState<{
    username: string;
    avatar: string;
  }>({ username: '', avatar: '' });
  const [message, setMessage] = useState('');
  const [receiverTyping, setReceiverTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const userSelector = useSelector((state: RootState) => state.user);
  const sender = {
    username: userSelector.username || '',
    avatar: userSelector.avatar || '',
  };
  const [messages, setMessages] = useState<
    { message: string; sender: string }[]
  >([]);

  const messagesRef = useRef(null);

  const scrollBottom = () => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  useEffect(() => {
    if (typing) {
      socket.emit('typing', { receiver: receiver.username });
    } else {
      socket.emit('stop typing', { receiver: receiver.username });
    }
  }, [typing, receiver.username]);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  useEffect(() => {
    socket.on('id', ({ id }) => {
      localStorage.setItem('socketId', id);
      socket.emit('username', { username: sender.username });
      setIsConnected(true);
    });
    socket.on('chat message', ({ message, sender }) => {
      console.log(message, sender);

      setMessages((prev) => [...prev, { message, sender: sender.username }]);
    });
    socket.on('typing', (data) => {
      setReceiverTyping(true);
    });
    socket.on('stop typing', (data) => {
      setReceiverTyping(false);
    });

    return () => {
      socket.off('id');
      socket.off('chat message');
      socket.off('typing');
      socket.off('stop typing');
    };
  }, [sender.username]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!receiver.username) return;
    if (!message) return;

    socket.emit('chat message', {
      receiver: receiver.username,
      message,
      sender: sender.username,
    });
    setMessages((prev) => [...prev, { message, sender: sender.username }]);
    setTyping(false);
    setMessage('');
  };

  return (
    <div className=" w-full h-screen max-h-screen p-2 relative flex flex-col">
      <button
        type="button"
        onClick={() => {
          connect();
        }}
      >
        Connect
      </button>
      <button
        type="button"
        onClick={() => {
          disconnect();
        }}
      >
        disconnect
      </button>
      <div className="border-b flex justify-between">
        <div className="flex justify-center items-center gap-3">
          {!receiver.username ? (
            <span className="text-xl font-bold">Select a user</span>
          ) : (
            <>
              <img
                src={receiver.avatar}
                alt=""
                className="rounded-full"
                style={{ height: '50px', width: '50px' }}
              />
              <span>{receiver.username}</span>
            </>
          )}
        </div>
        <div className="">
          <Search
            onConfirm={(user) => {
              setReceiver(user as { username: string; avatar: string });
            }}
          />
        </div>
      </div>
      {receiver.username && (
        <div
          className="flex flex-col w-full  overflow-y-auto grow"
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
                    message.sender === sender.username
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
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="h-24">
        {receiverTyping && (
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold">Typing...</span>
          </div>
        )}
      </div>

      <form
        action=""
        onSubmit={submitHandler}
        className="absolute bottom-5 w-4/5"
      >
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
