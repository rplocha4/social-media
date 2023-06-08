import React, { useEffect, useRef } from 'react';
import { BiImageAlt } from 'react-icons/bi';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineGif } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useLazySearchUsersQuery } from '../../store/features/serverApi';
import Loading from '../UI/Loading';
import { socket } from '../../socket';
import { defaultAvatar } from '../../types/types';

// const buffer = new ArrayBuffer(32);

// new Blob([buffer]);

const CreatePost: React.FC<{
  placeholder?: string;
  noUserMessage?: string;
  onCreate: (formData: FormData) => void;
  data?: string;
  imageFile?: string | null;
}> = ({ placeholder, onCreate, noUserMessage, data, imageFile }) => {
  const [content, setContent] = React.useState(data || '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const userSelector = useSelector((state: RootState) => state.user);
  const ref = useRef<HTMLInputElement>(null);
  useAutosizeTextArea(textAreaRef.current, content);
  const [image, setImage] = React.useState<File | null>(null);
  const [editImage, setEditImage] = React.useState<string | null>(
    imageFile as string | null
  );

  const [getResults] = useLazySearchUsersQuery();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0 && !image) {
      return;
    }
    if (!userSelector.user_id) {
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    //check if @user is in content
    const words = content.split(' ');
    words.forEach((word) => {
      if (word.startsWith('@')) {
        const username = word.slice(1);
        socket.emit('mention', {
          username,
          author: userSelector.username,
        });
      }
    });
    formData.append('user_id', userSelector.user_id);

    if (image) {
      formData.append('image', image);
    } else if (editImage) {
      formData.append('img', editImage);
    }
    onCreate(formData);

    setContent('');
    setImage(null);
  };
  useEffect(() => {
    if (!content) return;
    const words = content.split(' ');
    const lastWord = words[words.length - 1].trim();

    if (lastWord.startsWith('@') && lastWord.length > 1) {
      setLoading(true);
      getResults(lastWord.slice(1)).then((res) => {
        setResults(res.data.data);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  }, [content, getResults]);

  if (userSelector.user_id === null) {
    return (
      <div className="flex justify-center items-center p-2 text-xl font-bold text-blue-500">
        <Link to="/login">{noUserMessage}</Link>
      </div>
    );
  }

  return (
    <div className="flex w-full py-4">
      <img
        className="rounded-full  mx-2"
        src={userSelector.avatar ? userSelector.avatar : defaultAvatar}
        alt="user profile"
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex w-full relative">
        <form
          className="flex flex-col w-full "
          action=""
          onSubmit={formSubmitHandler}
        >
          <div className="min-h-16 ">
            <textarea
              placeholder={placeholder}
              className="w-full bg-transparent outline-none  resize-none "
              value={content}
              ref={textAreaRef}
              onChange={(e) => setContent(e.target.value)}
            />
            {(results.length > 0 || loading) && (
              <div
                className={`flex flex-col p-2 w-60 h-80 overflow-y-scroll absolute top-${textAreaRef.current?.style.height} bg-slate-900 z-10 rounded-xl`}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    {results.map(
                      (user: {
                        user_id: string;
                        username: string;
                        avatar: string;
                      }) => {
                        return (
                          <div
                            key={user.user_id}
                            className="flex gap-1 items-center darkHover p-2 hover:cursor-pointer"
                            onClick={() => {
                              setContent((prev) => {
                                const words = prev.split(' ');
                                words[words.length - 1] = `@${user.username} `;
                                return words.join(' ');
                              });
                              textAreaRef.current?.focus();
                              setResults([]);
                            }}
                          >
                            <img
                              className="rounded-full"
                              src={user.avatar || defaultAvatar}
                              alt="user profile"
                              style={{ height: '50px', width: '50px' }}
                            />
                            <p>{user.username}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            )}

            {(image || editImage) && (
              <div className="relative w-60">
                <img
                  alt="not found"
                  src={
                    image ? URL.createObjectURL(image) : (editImage as string)
                  }
                />
                <RxCross1
                  className="
                absolute top-0 left-0 text-2xl text-white bg-black opacity-80 rounded-full cursor-pointer hover:scale-110"
                  onClick={() => {
                    setImage(null);
                    setEditImage(null);
                  }}
                  title="Remove image"
                />
              </div>
            )}
          </div>
          <div className="flex justify-between pb-4 ">
            <div className="flex items-end gap-2 text-xl text-blue-600">
              <BiImageAlt
                className="cursor-pointer hover:scale-125"
                onClick={() => {
                  ref.current?.click();
                }}
              />

              <input
                id="image-input"
                className="hidden"
                type="file"
                accept="image/*"
                name="myImage"
                ref={ref}
                onChange={(event) => {
                  event.target.files && setImage(event.target.files[0]);
                }}
              />

              <BsEmojiSmileFill className="cursor-pointer hover:scale-125" />

              <AiOutlineGif className="cursor-pointer hover:scale-125" />
            </div>
            <button className="bg-blue-500 px-2 py-1 rounded-xl mr-3">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
