import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => (
  <div className="flex">
    <div className="w-1/2 justify-center items-center flex">{children}</div>
    <div className="w-1/2 items-end justify-center h-screen flex pb-10 px-5">
      <div>
        <h1 className="text-2xl font-semibold pb-3">Social Web3</h1>
        <h3 className="text-lg ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut veniam
          non similique possimus? Minus, praesentium.
        </h3>
      </div>
    </div>
  </div>
);

export default AuthLayout;
