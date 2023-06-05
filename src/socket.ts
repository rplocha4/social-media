import { io } from 'socket.io-client';

const URL = 'https://social-media-backend-tfft.onrender.com';

export const socket = io(URL,{
  autoConnect: false
});
