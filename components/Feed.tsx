"use client";
import { useEffect, useState } from "react";
import { TUser } from "../types";
import Image from "next/image";

interface IComments {
  content: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  _id: string;
}

interface Post {
  comments: IComments[];
  content: string;
  image: string;
  createdAt: string;
  likes: string[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

const options = {
  method: "GET",
  cache: "no-store" as RequestCache,
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to false to use 24-hour format
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: string]: TUser }>({});
  async function getPosts() {
    const res = await fetch("http://localhost:8080/posts", options);
    const data = await res.json();
    console.log("mm", data);
    setPosts(data.posts);
  }

  async function getUsers() {
    const res = await fetch("http://localhost:8080/users/list", options);
    const data = await res.json();
    const userMap = data.users.reduce(
      (acc: { [key: string]: TUser }, user: TUser) => {
        acc[user._id] = user;
        return acc;
      },
      {}
    );
    setUsers(userMap);
  }
  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  return (
    posts &&
    posts.map((post) => (
      <div className="p-6 bg-white border border-gray-200 mt-4" key={post._id}>
        {users[post.user] && (
          <div>
            <p className="font-bold text-sm">
              {`${users[post.user].first_name} ${users[post.user].last_name}`}
            </p>
            <p className=" text-xs text-gray-600">
              {formatDate(post.createdAt)}
            </p>
          </div>
        )}

        <p className="my-3 text-gray-700 text-sm">{post.content}</p>
        {post.image && (
          <Image src={post.image} height={500} width={1000} alt="image-post" />
        )}
      </div>
    ))
  );
};

export default Feed;
