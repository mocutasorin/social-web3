import { SyntheticEvent, useRef } from "react";
import { BsImage } from "react-icons/bs";

const AddPost = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (textareaRef.current === null) return;
    textareaRef.current.style.height = "40px";
    textareaRef.current.style.height = `${target.scrollHeight}px`;
  };
  return (
    <div className="bg-white border-gray-200 border-solid border p-10">
      {/* Text input */}
      <div className="flex flex-1 flex-row w-full">
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
      <div>
        <div>
          <a href="#" className="flex items-center text-gray-800 font-semibold">
            <BsImage className="mr-3 text-xl" />
            Photo/Video
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
