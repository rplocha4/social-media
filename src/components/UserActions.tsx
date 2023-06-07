import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

const UserActions: React.FC<{
  isPrivate: number;
}> = ({ isPrivate }) => {
  return (
    <BsThreeDots
      className="
    text-2xl font-bold cursor-pointer hover:text-slate-400 transition duration-300 ease-in-out"
      onClick={() => {
        console.log('clicked');
      }}
    />
  );
};

export default UserActions;
