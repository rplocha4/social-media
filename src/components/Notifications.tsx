import React from 'react';
import { useReducer } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { useShowInfo } from './context/ShowInfoProvider';

const reducer = (
  state: {
    follows: boolean;
    likes: boolean;
    comments: boolean;
    mentions: boolean;
  },
  action: { type: string; payload: boolean }
) => {
  switch (action.type) {
    case 'follows':
      return { ...state, follows: action.payload };
    case 'likes':
      return { ...state, likes: action.payload };
    case 'comments':
      return { ...state, comments: action.payload };
    case 'mentions':
      return { ...state, mentions: action.payload };
    default:
      return state;
  }
};

function Notifications({ onClose }: { onClose: () => void }) {
  const username = localStorage.getItem('username');
  const initialState = localStorage.getItem(
    `notificationSettings-${username}` || '{}'
  ) as string;
  const [setting, dispatch] = useReducer(reducer, {
    ...JSON.parse(initialState),
  });
  const { displayInfo } = useShowInfo();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem(
      `notificationSettings-${username}`,
      JSON.stringify(setting)
    );
    onClose();
    displayInfo({ message: 'Settings saved!', color: 'green' });
  };

  return (
    <div className="flex flex-col gap-10 p-5 w-full h-full ">
      <h1 className="text-4xl font-bold text-white">Notifications settings</h1>
      <form action="" onSubmit={submitHandler} className="flex flex-col">
        <div className="flex flex-col gap-12 p-2">
          <div className="flex items-center gap-2 text-3xl font-semibold">
            <FormControlLabel
              className="bg-inherit max-w-xs"
              control={
                <Switch
                  checked={setting.follows}
                  onChange={(e) =>
                    dispatch({ type: 'follows', payload: e.target.checked })
                  }
                />
              }
              label="Someone follows you"
            />
          </div>
          <div className="flex items-center gap-2 text-3xl font-semibold">
            <FormControlLabel
              className="bg-inherit max-w-xs "
              control={
                <Switch
                  checked={setting.likes}
                  onChange={(e) =>
                    dispatch({ type: 'likes', payload: e.target.checked })
                  }
                />
              }
              label="Someone likes your post"
            />
          </div>
          <div className="flex items-center gap-2 text-3xl font-semibold">
            <FormControlLabel
              className="bg-inherit max-w-xs "
              control={
                <Switch
                  checked={setting.comments}
                  onChange={(e) =>
                    dispatch({ type: 'comments', payload: e.target.checked })
                  }
                />
              }
              label="Someone comments on your post"
            />
          </div>
          <div className="flex items-center gap-2 text-3xl font-semibold">
            <FormControlLabel
              className="bg-inherit max-w-xs "
              control={
                <Switch
                  checked={setting.mentions}
                  onChange={(e) =>
                    dispatch({ type: 'mentions', payload: e.target.checked })
                  }
                />
              }
              label="Someone mentions you in post"
            />
          </div>
        </div>
        <button className="bg-green-900 rounded-xl p-2 text-white hover:bg-green-800 self-end">
          Save changes
        </button>
      </form>
    </div>
  );
}

export default Notifications;
