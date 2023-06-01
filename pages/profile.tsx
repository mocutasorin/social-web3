import { NextPage } from "next";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import { BsCaretLeft } from "react-icons/bs";

const Profile: NextPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  return (
    <MainLayout title="Profile">
      <Link
        href="/"
        className="text-lg font-semibold px-2 text-gray-700 flex items-center"
      >
        <BsCaretLeft /> Back
      </Link>
      <h1 className="text-4xl">{`${user.first_name} ${user.last_name}`}</h1>
      <p>Email: {user.email}</p>
      <p>Birth date: {user.birth_date}</p>
      <p>Genre: {user.genre}</p>
    </MainLayout>
  );
};

export default Profile;
