import React from 'react';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { hideInfo, showInfo } from '../store/uiSlice';

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
  const dispatch2 = useDispatch();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem(
      `notificationSettings-${username}`,
      JSON.stringify(setting)
    );
    onClose();
    dispatch2(showInfo({ message: 'Settings saved!', color: 'green' }));
    setTimeout(() => {
      dispatch2(hideInfo());
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-2 p-2 w-full h-full">
      <h1 className="text-2xl font-bold text-white">Notifications settings</h1>
      <form action="" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={setting.follows}
              onChange={(e) =>
                dispatch({ type: 'follows', payload: e.target.checked })
              }
            />
            <p>Someone follows you</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={setting.likes}
              onChange={(e) =>
                dispatch({ type: 'likes', payload: e.target.checked })
              }
            />
            <p>Someone likes your post</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={setting.comments}
              onChange={(e) =>
                dispatch({ type: 'comments', payload: e.target.checked })
              }
            />
            <p>Someone comments on your post</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={setting.mentions}
              onChange={(e) =>
                dispatch({ type: 'mentions', payload: e.target.checked })
              }
            />
            <p>Someone mentions you in post</p>
          </div>
        </div>
        <button className="bg-slate-900 rounded-xl p-2 text-white hover:bg-slate-800">
          Save changes
        </button>
      </form>
    </div>
  );
}

export default Notifications;
