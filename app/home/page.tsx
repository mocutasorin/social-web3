import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title",
};

import { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
// import { Toaster } from "react-hot-toast";
import AddPost from "../../components/AddPost";
import Feed from "../../components/Feed";
import MainLayout from "../../layouts/MainLayout";

type Props = {
  users: User[];
};
type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
};

const Home: NextPage<Props> = ({ users }) => {
  return (
    <div>
      {/* <Toaster position="bottom-right" /> */}
      <AddPost />
      {/* <Feed users={users} /> */}
      {/* {users.map((user, i) => (
        <h1 key={i} className="text-amber-700">
          {user.first_name}
        </h1>
      ))} */}
    </div>
  );
};

// export const getStaticProps: GetStaticProps<{}> = async () => {
//   const res = await fetch("http://localhost:8080/users/list");
//   const data = await res.json();
//   return {
//     props: { users: data.users },
//   };
// };

export default Home;
