import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainLayouts from "@/layouts/MainLayouts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainLayouts>
        <div className='flex mt-5 max-w-7xl mx-auto'>
          <div className='gap-5'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
            doloremque excepturi eligendi! Voluptates placeat sapiente
            explicabo? Vero pariatur eos quod ab fuga ipsum, quis, harum saepe,
            consequuntur similique odio porro.
          </div>
        </div>
      </MainLayouts>
    </>
  );
}
