"use client";
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
      <div className="w-1/2 items-start justify-end h-screen flex pb-10 px-5 bg-[url(/images/login-right.png)]">
        <div className="bg-white p-5 bg-opacity-75 w-1/3 mt-5 rounded-xl">
          <h1 className="text-4xl inline-block font-bold text-transparent bg-clip-text pb-12 pt-2 bg-gradient-to-r from-violet-500 to-fuchsia-500">
            Social Web3
          </h1>
          <h3 className="text-lg indent-5">
            Welcome to our social web3 platform! Here, you can connect with
            others while knowing that your account is secure. Our platform is
            built on blockchain technology, ensuring that your information is
            safe and cannot be tampered with. Join our community and experience
            the future of social networking on the decentralized web.
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
