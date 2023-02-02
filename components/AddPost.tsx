import { SyntheticEvent, useRef, useState } from "react";
import { BsImage, BsPersonPlusFill, BsXCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";

const AddPost = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleContentChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (textareaRef.current === null) return;
    textareaRef.current.style.height = "40px";
    textareaRef.current.style.height = `${target.scrollHeight}px`;
  };

  const handleFileChange = (file: File) => {
    // If not an image
    if (!file.type.startsWith("image")) {
      toast.error("Only image file is allowed");
      return;
    }
    // If greater than 5MB
    if (file.size > 5000000) {
      toast.error("Max 5MB file size");
      return;
    }

    // Set file and preview URL
    setPostImage(file);
    setImageURL(URL.createObjectURL(file));

    // ? setPostImage(event.target.files[0])
    // : setPostImage(null);
  };

  const removeImage = () => {
    // fileUploadRef.current?.files = {};
    setPostImage(null);
    setImageURL(null);
  };

  return (
    <div className="bg-white border-gray-200 border-solid border pt-10 pb-5">
      {/* Text input */}
      <div className="flex flex-1 flex-col w-full px-10 pb-5">
        <div className="flex flex-row">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <textarea
            ref={textareaRef}
            placeholder="What's in your mind, Sam Bankman?"
            className="ml-5 mb-5 w-full overflow-hidden focus:outline-none text-gray-600"
            onChange={handleContentChange}
          ></textarea>
        </div>
        {imageURL && (
          <div className="relative">
            <BsXCircle
              fill="#fff"
              className="text-3xl mt-2 ml-2 absolute rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:to-violet-500 hover: cursor-pointer"
              onClick={removeImage}
            />
            <img className="rounded-md px-15" src={imageURL} />
          </div>
        )}
      </div>
      {/* Call to action buttons */}
      <div className="flex justify-between items-center pt-5 border-t px-10">
        <a
          href="#"
          className="flex items-center text-gray-800 font-semibold"
          onClick={() => fileUploadRef.current?.click()}
        >
          <BsImage className="mr-3 text-xl" />
          <span className="hidden md:block">Photo</span>
          <input
            accept="image/*"
            className="hidden"
            type="file"
            ref={fileUploadRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
            multiple={false}
          ></input>
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
