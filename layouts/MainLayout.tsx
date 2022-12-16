import Head from "next/head";
import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
  title: string;
};

export default function MainLayout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header title={title} />
      {children}
      <Footer />
    </>
  );
}
