import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultAvatar } from '../../types/types';

const PostData: React.FC<{
  img: string;
  username: string;
  content: string;
  link: string;
  image: string;
}> = ({ img, content, username, link, image }) => {
  const navigate = useNavigate();
  // let imageData = '';
  // const [loading, setLoading] = React.useState(true);

  // if (image.length > 0) {
  //   imageData = imageFromBinary(image);
  // }
  // const navigate = useNavigate();
  const [linkHover, setLinkHover] = React.useState(false);
  const linkRefs = React.useRef<HTMLAnchorElement[]>([]);
  const formattedContent = useMemo(() => {
    const words = content.split(' ');
    const newWords = words.map((word, i) => {
      if (word.startsWith('@')) {
        return (
          <Link
            to={`/profile/${word.slice(1)}`}
            className="text-blue-500 hover:underline z-10"
            key={i}
            ref={(el) => {
              if (el) {
                linkRefs.current.push(el);
              }
            }}
            onMouseEnter={() => {
              setLinkHover(true);
            }}
            onMouseLeave={() => {
              setLinkHover(false);
            }}
          >
            {word}{' '}
          </Link>
        );
      }
      return (
        <p key={i} className="inline break-all">
          {word == '' ? ' ' : word}
        </p>
      );
    });

    return newWords;
  }, [content]);

  return (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full self-start"
        src={img !== null ? img : defaultAvatar}
        alt="user profile"
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex flex-col gap-2 w-full">
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
          className="flex-1 flex-col flex gap-3 cursor-pointer w-full"
          onClick={() => {
            if (linkHover) {
              return;
            }
            navigate(link);
          }}
        >
          <div>{formattedContent.map((word) => word)}</div>
          {image && (
            <img src={image} alt="post" className="w-full h-80 object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostData;
