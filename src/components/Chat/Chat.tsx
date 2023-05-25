import { useEffect, useState } from 'react';
import { socket } from '../../socket';
function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <div className=" w-80 h-80 bg-slate-400">
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}

export default Chat;
