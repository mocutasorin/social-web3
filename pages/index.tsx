import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout title="Homepage">
      <h1 className="text-3xl font-bold underline">Startin</h1>
    </MainLayout>
  );
};

export default Home;
