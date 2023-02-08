import Head from "next/head";
import { Inter } from "@next/font/google";
import Flow from "@/components/Flow";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className='h-full flex flex-col'>
      <Head>
        <title>ELTE Subject Explorer</title>
        <meta name='description' content='ELTE SUBJECT EXPLORER' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='h-10 flex items-center'>ELTE SUBJECT EXPLORER</header>
      <Flow />
    </div>
  );
}
