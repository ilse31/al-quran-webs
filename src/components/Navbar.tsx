import { AnimationNavbarData, NavbarData } from "@/constants/navbar";
import { BiMenuAltLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
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

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <nav className='bg-gray-800 fixed w-full z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='flex justify-between h-16 items-center'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Image
                className='block lg:hidden h-8 w-auto'
                src={Logo}
                alt='logo'
                width={40}
                height={40}
              />
              <Image
                className='hidden lg:block h-8 w-auto'
                src={Logo}
                alt='logo'
                width={40}
                height={40}
              />
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
        variants={AnimationNavbarData}
        initial='closed'
        animate={isShow ? "open" : "closed"}
      >
        <div className='px-2 pb-3 space-y-1'>
          {NavbarData.map((item, index) => (
            <motion.a
              whileHover={{
                x: 10,
              }}
              href={item.link}
              key={index}
              className={`${isActive(item.link)} block`}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
