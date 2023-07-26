"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BsFillBellFill,
  BsFillPersonPlusFill,
  BsHouseDoor,
  BsPerson,
  BsPlusSquare,
} from "react-icons/bs";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import SearchBar from "./SearchBar";
import { useAppContext } from "../context/state";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import Image from "next/image";

type Props = {
  title: string;
};

type User = {
  first_name: string;
  last_name: string;
};

export default function Header({ title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [metamask, setMetamask] = useState(false);

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  // Checking if Metamask is installed and available
  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      setMetamask(true);
    }
  }, []);

  const getConnector = (metamask: boolean): any => {
    return metamask
      ? new MetaMaskConnector()
      : new Web3AuthConnector({
          options: {
            socialLoginConfig: {},
            enableLogging: true,
            clientId:
              "BBK-ogAdTsS3cpep_j-JJlGPKZtrHVRfo1eH4jwbaVqwbe0oV1yqSFHEEHxOboC0gTVpksk2WDJ_QjwI4N-lqjM", // Get your own client id from https://dashboard.web3auth.io
            network: "testnet", // web3auth network
            chainId: "0x61", // chainId that you want to connect with
          },
        });
  };

  // connect with Metamask
  const handleAuth = async (metamask: boolean) => {
    if (!isConnected) {
      await disconnectAsync();
    }
    const { account, chain } = await connectAsync({
      connector: getConnector(metamask),
    });

    const userData = { address: account, chainId: chain.id, network: "evm" };

    console.log(userData);
  };
  return (
    <>
      <nav>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x-mark

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex sm:flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo */}
              <div className="flex items-center ml-14 relative sm:ml-0">
                <Image
                  width={32}
                  height={32}
                  className="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <Image
                  width={32}
                  height={32}
                  className="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-8 sm:block w-full">
                <div
                  className="items-center justify-between w-full md:flex md:w-auto"
                  id="navbar-search"
                >
                  <div className="relative ml-3 md:w-1/2 flex justify-center items-center sm:w-full md:order-2">
                    {user ? (
                      <a
                        href="#"
                        className="text-lg font-semibold px-2 text-gray-700 flex items-center"
                      >
                        <Image
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <Link
                          href="/profile"
                          className="text-lg font-semibold px-2 text-gray-700 flex items-center"
                        >
                          <span className="pl-2">{`${user.first_name} ${user.last_name}`}</span>
                        </Link>
                      </a>
                    ) : (
                      <Link
                        href="/auth"
                        className="text-lg font-semibold px-2 text-gray-700 flex items-center"
                      >
                        <span className="px-3 py-1 bg-violet-800 text-white rounded-lg text-base">
                          Sign In
                        </span>
                      </Link>
                    )}
                    <span className="text-gray-300 font-thin">|</span>
                    <a
                      href="#"
                      className="text-base font-semibold px-2 text-gray-700"
                    >
                      Create
                    </a>
                    <span className="text-gray-300 font-thin">|</span>
                    <a
                      href="#"
                      className="text-base font-semibold px-2 text-gray-700"
                    >
                      Home
                    </a>
                    {/* User dropdown */}
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-1"
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                  <SearchBar />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a
                href="#"
                className="text-xl text-gray-600 hover:text-violet-600 px-2"
              >
                <BsFillBellFill />
              </a>
              <a
                href="#"
                className="text-xl text-gray-600 hover:text-violet-600 px-2"
              >
                <BsFillPersonPlusFill />
              </a>
              <a
                href="#"
                onClick={() => handleAuth(false)}
                className="border-violet-600 border-2 px-3 py-1 rounded-lg text-violet-600 ml-4"
              >
                Connect Wallet
              </a>
            </div>
          </div>
        </div>

        {/*
         *   Mobile menu
         */}
        <div
          className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className=" px-2 pt-2 pb-3">
            {user ? (
              <a
                href="#"
                className="text-lg font-semibold px-3 py-4 text-gray-700 flex items-center hover:bg-gray-700 hover:text-white"
              >
                <Image
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="pl-2 ">{"user.email"}</span>
                <span className="text-gray-500 font-thin pl-2 hover:text-white">
                  | View Profile
                </span>
              </a>
            ) : (
              <a
                href="#"
                className="text-lg font-semibold px-3 py-4 text-gray-700 flex items-center hover:bg-gray-700 hover:text-white"
              >
                <BsPerson className="mr-4 text-xl" />
                <span className="pl-2 ">Sign In </span>
              </a>
            )}
            <a
              href="#"
              className="flex px-3 py-4 items-center text-lg font-semibold hover:bg-gray-700 hover:text-white text-gray-600"
              aria-current="page"
            >
              <BsHouseDoor className="mr-4 text-xl" />
              Home
            </a>
            <a
              href="#"
              className="flex px-3 py-4 items-center text-lg font-semibold hover:bg-gray-700 hover:text-white text-gray-600"
              aria-current="page"
            >
              <BsPlusSquare className="mr-4 text-xl" />
              Create
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
