import { NavbarData } from "@/constants/navbar";
import { BiMenuAltLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AiFillBook } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const router = useRouter();
  const isActive = (r: string) => {
    if (r === router.pathname) {
      return "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium";
    } else {
      return "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    }
  };
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
      },
    },
  };
  const [isShow, setIsShow] = useState(false);

  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:mb-5'>
        <div className='flex justify-between h-16 items-center'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <AiFillBook className='block lg:hidden h-8 w-auto' />
              <AiFillBook className='hidden lg:block h-8 w-auto' />
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:space-x-8 items-center'>
              {NavbarData.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className={`${isActive(item.link)} cursor-pointer`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className='-mr-2 flex items-center sm:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setIsShow(!isShow)}
            >
              <span className='sr-only'>Open main menu</span>
              <BiMenuAltLeft className='block h-6 w-6' />
            </button>
          </div>
        </div>
      </div>
      <motion.div
        className={`sm:hidden  ${isShow ? "block" : "hidden"}`}
        id='mobile-menu'
        variants={menuVariants}
        initial='closed'
        animate={isShow ? "open" : "closed"}
      >
        <div className='px-2 pb-3 space-y-1'>
          {NavbarData.map((item, index) => (
            <a
              href={item.link}
              key={index}
              className={`${isActive(item.link)} block`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
