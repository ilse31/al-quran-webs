import React from "react";
import { motion } from "framer-motion";
import { htmlParser } from "@/helpers/ParsingData";
import Link from "next/link";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";

type Props = {
  number: number;
  title: string;
  desc: string;
  totalAyat: number;
  arti: string;
  nama_latin: string;
  handleClick: () => void;
  IsFavorites: boolean;
};

const CardsSurah = (props: Props) => {
  return (
    <motion.div
      className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl '
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='p-5 w-[300px] text-black'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='font-poppins font-semibold'>
              {props.number}. {props.nama_latin} ({props.totalAyat})
            </h2>
            <h2>{props.arti}</h2>
          </div>
          <h3 className='text-2xl font-medium mb-2'>{props.title}</h3>
        </div>
        <p
          className={`text-gray-600 ${
            props.desc.length > 100 ? "truncate " : ""
          }`}
        >
          {htmlParser(props.desc)}
        </p>
        <div className='flex justify-between flex-row'>
          <Link
            href={`quran/${props.number}`}
            className='text-blue-500 pr-5 py-2 inline-flex items-center'
          >
            Read More
          </Link>
          <button className='text-gray-700' onClick={() => props.handleClick()}>
            {props.IsFavorites ? (
              <BsBookmarksFill className='text-2xl' />
            ) : (
              <BsBookmarks className='text-2xl' />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CardsSurah;
