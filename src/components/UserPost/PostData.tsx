import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
// const navigate = useNavigate();
  const formattedContent = useMemo(() => {
    const words = content.split(' ');
    const newWords = words.map((word, i) => {
      if (word.startsWith('@')) {
        return (
          <Link
            to={`/profile/${word.slice(1)}`}
            className="text-blue-500 hover:underline"
            key={i}
          >
            {word}{' '}
          </Link>
        );
      }
      return word + ' ';
    });
    return newWords;
  }, [content]);

  return (
    <div className="flex items-center gap-2 ">
      <img
        className="rounded-full self-start"
        src={
          img !== null
            ? img
            : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
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
        <div
          className="flex-1 flex-col flex gap-3 "
          // onMouseDown={() => {
          //   navigate(link);
          // }}
        >
          <p>{formattedContent}</p>
          {image && (
            <img src={image} alt="post" className="w-full h-80 object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostData;
