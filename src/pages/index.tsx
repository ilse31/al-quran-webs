import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainLayouts from "@/layouts/MainLayouts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MainLayouts desc='Ayo Ibadah Apps' title='Ayo Ibadah'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
        doloremque excepturi eligendi! Voluptates placeat sapiente explicabo?
        Vero pariatur eos quod ab fuga ipsum, quis, harum saepe, consequuntur
        similique odio porro.
      </MainLayouts>
    </>
  );
}
