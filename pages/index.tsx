import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AddPost from "../components/AddPost";
import Feed from "../components/Feed";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout title="Homepage">
      <AddPost />
      <Feed />
    </MainLayout>
  );
};

export default Home;
