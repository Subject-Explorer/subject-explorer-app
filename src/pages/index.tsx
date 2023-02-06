import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Button from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ELTE Subject Explorer</title>
        <meta name='description' content='TODO' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='p-9 flex flex-nowrap gap-2 flex-col'>
        <Button text='Hello' />
        <Button text='OK' />
        <Button text='NO' />
        <Button text='Cancel' />
      </div>
    </>
  );
}
