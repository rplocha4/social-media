import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Post, { loader as postLoader } from './pages/Post.tsx';
import Group, { loader as groupLoader } from './pages/Group.tsx';
import Home from './pages/Home.tsx';
import Register from './components/Auth/Register.tsx';
import Login from './components/Auth/Login.tsx';
import Profile from './pages/Profile.tsx';
import { loader as profileLoader } from './pages/Profile.tsx';
import Chat from './components/Chat/Chat.tsx';
import Admin from './pages/Admin.tsx';
import Events from './pages/Events.tsx';
import Groups from './pages/Groups.tsx';
import ThemeProvider from './components/context/ThemeProvider.tsx';
import ShowInfoProvider from './components/context/ShowInfoProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Navigate to="/" />,

    children: [
      {
        path: 'home',
        element: <Home />,
        // loader: homeLoader,
      },
      {
        path: 'post/:id',
        element: <Post />,
        loader: postLoader,
      },
      {
        path: 'profile/:username',
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'groups',
        element: <Groups />,
      },
      {
        path: 'group/:id',
        element: <Group />,
        loader: groupLoader,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '*',
    element: <Navigate to="/home" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ShowInfoProvider>
          <RouterProvider router={router} />
        </ShowInfoProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
