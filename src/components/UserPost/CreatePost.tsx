import React from 'react';
import { BiImageAlt } from 'react-icons/bi';
import { AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmileFill } from 'react-icons/bs';
const CreatePost: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  return (
    <div className="flex w-full py-4">
      <img
        className="rounded-full  mx-2"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU"
        alt="user profile"
        style={{ height: '50px', width: '50px' }}
      />
      <div className="flex w-full">
        <form className="flex flex-col w-full" action="">
          <textarea
            placeholder={placeholder}
            className="w-full bg-transparent outline-none h-16 overflow-clip "
          />
          <div className="flex justify-between ">
            <div className="flex items-end gap-2 text-xl text-blue-600">
              <AiOutlineGif className="cursor-pointer hover:scale-105" />
              <BiImageAlt className="cursor-pointer hover:scale-105" />
              <BsEmojiSmileFill className="cursor-pointer hover:scale-105" />
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
