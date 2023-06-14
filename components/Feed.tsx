import {
  useEvmNativeBalance,
  useEvmWalletTokenBalances,
} from "@moralisweb3/next";
import UserModel from "../backend/models/UserModel";
import { useEffect, useState } from "react";

const Feed = () => {
  const address = "0x02bEcfaa6382a3e699ACEE1136587f06487BA133";
  const { data: tokenBalances } = useEvmWalletTokenBalances({ address });
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  useEffect(
    () => console.log("tokenBalances: ", tokenBalances),
    [tokenBalances]
  );

  return (
    <div className="bg-white border-gray-200 border-solid border p-3">
      <h2>FEED</h2>
      {/* {isMounted && <h3>Wallet: {nativeBalance?.balance.ether}</h3>} */}
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
        nostrum consectetur repellat praesentium voluptatibus voluptate unde
        perspiciatis? Accusamus blanditiis maiores aperiam porro adipisci qui.
        Architecto cumque mollitia rerum nisi dicta.
      </p>
    </div>
  );
};

export default Feed;
