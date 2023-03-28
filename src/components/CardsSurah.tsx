import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { title } from "process";

type Props = {
  number: number;
  title: string;
  desc: string;
};

const CardsSurah = (props: Props) => {
  return (
    <motion.div
      className='bg-white rounded-lg overflow-hidden shadow-md'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='p-4 w-[300px]'>
        <h2 className='text-black'>{props.number}</h2>
        <h3 className='text-lg text-black font-medium mb-2'>{props.title}</h3>
        <p className='text-gray-600'>{props.desc}</p>
        <a href='#' className='text-blue-500 inline-flex items-center mt-4'>
          Read More
        </a>
      </div>
    </motion.div>
  );
};

export default CardsSurah;
