import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const MainLayouts = (props: Props) => {
  return (
    <motion.div
      className='bg-white w-full min-h-screen font-poppins'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {props.children}

      {/* Footer */}
      <footer className='w-full mt-5 bg-white'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <div className='mt-6 flex justify-center space-x-6'>
            <a
              href='#'
              className='text-gray-400 hover:text-gray-500 flex flex-row-reverse'
            >
              <span>Ilham Prasetya</span>
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M12 2a10 10 0 00-3.54 19.54A10.003 10.003 0 002 12 10 10 0 0012 2zm-1.5 15V13h-1v-1.5h1V9.5c0-1.38.56-2.5 2.5-2.5h1.5v1.5h-1c-.83 0-1 .17-1 .83V11h2l-.25 1.5h-1.75V17h-1.5z'
                  clipRule='evenodd'
                />
              </svg>
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
