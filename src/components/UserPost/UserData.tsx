import React from 'react';
import { Link } from 'react-router-dom';

const UserData: React.FC<{
  img: string;
  username: string;
  content: string;
  link: string;
}> = ({ img, content, username, link }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <img
        className="rounded-full w-full h-full mx-1"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU"
        alt="user profile"
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-1">
          <p className=" font-bold hover:underline  hover:cursor-pointer">
            {username}
          </p>
          <p className="text-gray-500">@{username}</p>
        </div>
        <Link to={link} className="w-full">
          {content}
        </Link>
      </div>
    </div>
  );
};

export default UserData;
