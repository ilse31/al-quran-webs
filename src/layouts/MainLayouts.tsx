import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
  title?: string;
  desc?: string;
};

const MainLayouts = (props: Props) => {
  return (
    <motion.div className='bg-white w-full min-h-screen font-poppins'>
      <Head>
        <title>{props.title ? props.title : "Ayo Ibadah"}</title>
        <meta
          name='description'
          content={`${props.desc ? props.desc : "Ayo Ibadah"} `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex p-5 max-w-7xl mx-auto'>{props.children}</div>
      </motion.main>

      {/* Footer */}
      <footer className='w-full mt-5 bg-white'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <div className='mt-6 flex justify-center space-x-6'>
            <a
              href='https://ilhaampras-porto.vercel.app/'
              className='text-gray-400 hover:text-gray-500 flex flex-row-reverse'
            >
              <span>Ilham Prasetya</span>
            </a>
          </div>
          <div className='mt-8 flex justify-center space-x-6'>
            <p className='text-center text-base text-gray-400'>
              &copy; 2021 Al-Qur&apos;an. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default MainLayouts;
