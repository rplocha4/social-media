import React, { useRef } from 'react';
import { BiImageAlt } from 'react-icons/bi';
import { AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmileFill } from 'react-icons/bs';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
const CreatePost: React.FC<{
  placeholder: string;
  onCreate: (content: string) => void;
}> = ({ placeholder, onCreate }) => {
  const [content, setContent] = React.useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, content);

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim().length === 0) {
      return;
    }
    onCreate(content);
    setContent('');
  };
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
          </div>
          <div className="flex justify-between ">
            <div className="flex items-end gap-2 text-xl text-blue-600">
              <AiOutlineGif className="cursor-pointer hover:scale-125" />
              <BiImageAlt className="cursor-pointer hover:scale-125" />
              <BsEmojiSmileFill className="cursor-pointer hover:scale-125" />
            </div>
            <button className="bg-blue-500 px-2 py-1 rounded-xl mr-3">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
