import Head from "next/head";
import { ReactNode } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import VerticalMenu from "../../components/VerticalMenu";

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
      <div className="flex w-full flex-col sm:flex-row">
        <VerticalMenu />
        <div className="bg-bg-mainLayout flex flex-1 flex-col sm:flex-row gap-3 p-3">
          <main className="flex pt-1 px-2 flex-1 flex-col gap-4">
            {children}
          </main>
          <Sidebar />
        </div>
      </div>

      <Footer />
    </>
  );
}
