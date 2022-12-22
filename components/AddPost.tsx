import { SyntheticEvent, useRef } from "react";
import { BsImage, BsPersonPlusFill } from "react-icons/bs";

const AddPost = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (textareaRef.current === null) return;
    textareaRef.current.style.height = "40px";
    textareaRef.current.style.height = `${target.scrollHeight}px`;
  };
  return (
    <div className="bg-white border-gray-200 border-solid border pt-10 pb-5">
      {/* Text input */}
      <div className="flex flex-1 flex-row w-full px-10 pb-5">
        <img
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <textarea
          ref={textareaRef}
          placeholder="What's in your mind, Sam Bankman?"
          className="ml-5 w-full overflow-hidden focus:outline-none text-gray-600"
          onChange={handleChange}
        ></textarea>
      </div>
      {/* Call to action buttons */}
      <div className="flex justify-between items-center pt-5 border-t px-10">
        <a href="#" className="flex items-center text-gray-800 font-semibold">
          <BsImage className="mr-3 text-xl" />
          <span className="hidden md:block">Photo/Video</span>
        </a>
        <a href="#" className="flex items-center text-gray-800 font-semibold">
          <BsPersonPlusFill className="mr-3 text-xl" />
          <span className="hidden md:block">Tag Friends</span>
        </a>
        <button className="bg-gray-300 px-10 py-2 font-semibold hover:bg-violet-600 hover:text-white transition ease-in-out delay-100 ">
          Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
