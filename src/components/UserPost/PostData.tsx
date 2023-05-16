import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostData: React.FC<{
  img: string;
  username: string;
  content: string;
  link: string;
  image: string;
}> = ({ img, content, username, link, image }) => {
  // let imageData = '';
  // const [loading, setLoading] = React.useState(true);

  // if (image.length > 0) {
  //   imageData = imageFromBinary(image);
  // }

  return (
    <div className="flex items-center gap-2 ">
      <img
        className="rounded-full self-start"
        src={
          img !== null
            ? img
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU'
        }
        alt="user profile"
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex flex-col gap-2 ">
        <div className="flex gap-1 ">
          <Link
            to={`/profile/${username}`}
            className=" font-bold hover:underline  hover:cursor-pointer"
          >
            {username}
          </Link>
          <p className="text-gray-500">@{username}</p>
        </div>
        <Link to={link} className="flex-1 flex-col flex gap-3 ">
          <p className="break-all">{content}</p>
          {image && (
            <img src={image} alt="post" className="w-full h-80 object-cover" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default PostData;
