import { Dispatch, SetStateAction, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

type ModalState = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

const auth = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="flex">
      <div className="w-1/2 justify-center items-center flex">
        <LoginForm setShowForm={setShowForm} showForm={showForm} />
      </div>
      <div className="w-1/2 items-end justify-center h-screen flex pb-10 px-5">
        <div>
          <h1 className="text-2xl font-semibold pb-3">Social Web3</h1>
          <h3 className="text-lg ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut veniam
            non similique possimus? Minus, praesentium.
          </h3>
        </div>
      </div>
      {showForm && (
        <RegisterForm setShowForm={setShowForm} showForm={showForm} />
      )}
    </div>
  );
};

export default auth;
