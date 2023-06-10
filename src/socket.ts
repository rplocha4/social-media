import { io } from 'socket.io-client';

const URL = 'https://social-media-backend-tfft.onrender.com:3001';

export const socket = io(URL);
