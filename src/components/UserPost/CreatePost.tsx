import React, { useRef } from 'react';
import { BiImageAlt } from 'react-icons/bi';
import { AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmileFill } from 'react-icons/bs';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
const CreatePost: React.FC<{
  placeholder: string;
  noUserMessage: string;
  onCreate: (formData: FormData) => void;
}> = ({ placeholder, onCreate, noUserMessage }) => {
  const [content, setContent] = React.useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const userSelector = useSelector((state: RootState) => state.user);

  useAutosizeTextArea(textAreaRef.current, content);

  const [image, setImage] = React.useState<File | null>(null);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim().length === 0 && !image) {
      return;
    }
    const formData = new FormData();
    formData.append('content', content);
    formData.append('user_id', userSelector.user_id!);
    if (image) {
      formData.append('image', image);
    }

    onCreate(formData);
    setContent('');
    setImage(null);
  };
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
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU"
        alt="user profile"
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex w-full">
        <form
          className="flex flex-col w-full"
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
            {image && (
              <img
                alt="not found"
                width={'250px'}
                src={URL.createObjectURL(image)}
              />
            )}
          </div>
          <div className="flex justify-between ">
            <div className="flex items-end gap-2 text-xl text-blue-600">
              <AiOutlineGif className="cursor-pointer hover:scale-125" />
              <span>
                <BiImageAlt className="cursor-pointer hover:scale-125" />
                <input
                  type="file"
                  accept="image/*"
                  name="myImage"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </span>
              <BsEmojiSmileFill className="cursor-pointer hover:scale-125" />
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
