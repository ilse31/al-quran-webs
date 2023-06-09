import api from "@/service/api";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import MainLayouts from "@/layouts/MainLayouts";
import { DetailSurah, ListSurah, Params } from "@/types/DetailSurah";
import Slider from "react-slick";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { ConvertToArabicNumbers, stringToHTML } from "@/helpers/ParsingData";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AudioPlayer } from "@/components";

type Props = {
  detail?: DetailSurah;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const response = await api.get("quran");
    const surahs: ListSurah[] = response.data;

    if (!Array.isArray(surahs)) {
      throw new Error("Unexpected response format");
    }

    const paths = surahs.map((surah: ListSurah) => ({
      params: { nomor: surah.nomor.toString() },
    }));
    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    return { props: {} };
  }
  const { nomor } = params;
  try {
    const response = await api.get(`quran/${nomor}`);
    const detail: DetailSurah = response.data;
    return {
      props: {
        detail,
      },
      revalidate: 3600, //
    };
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return { props: {} };
  }
};

const DetailSurahPages = ({ detail }: Props) => {
  const router = useRouter();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  if (!detail) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    accessibility: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleNext = (nomor: number) => {
    if (nomor === 114) {
      return;
    }
    setIsPlaying(false);
    router.push(`/quran/${nomor + 1}`);
  };

  const handlePrev = (nomor: number) => {
    if (nomor === 1) {
      return;
    }
    setIsPlaying(false);
    router.push(`/quran/${nomor - 1}`);
  };

  return (
    <MainLayouts>
      <div className='mx-auto bg-gray-800 '>
        <Slider {...settings} className='h-auto '>
          <div className='flex flex-col items-center h-auto '>
            <div className='p-5 flex justify-around md:flex-row-reverse flex-col items-center h-full'>
              <div className='flex'>
                <Image src={Logo} alt='alquran' width={200} />
              </div>
              <div className='font-poppins text-white flex flex-col items-center mt-10'>
                <h1 className='text-6xl font-bold'>{detail.nama}</h1>
                <h1 className='text-4xl font-normal'>{detail.nama_latin}</h1>
                <h1 className='text-4xl font-light'>{detail.arti}</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center h-auto text-white'>
            <div className='p-5 flex flex-col h-full max-w-6xl mx-auto'>
              <h1 className='text-4xl font-normal text-center'>
                {detail.nama_latin}
              </h1>
              <h1>Jumlah Ayat {detail.jumlah_ayat}</h1>
              <h1>{stringToHTML(detail.deskripsi)}</h1>
              <h1>Tempat Turun {detail.tempat_turun}</h1>
            </div>
          </div>
        </Slider>
      </div>
      <div className='flex flex-col max-w-6xl mx-auto p-5 gap-y-3 mt-5'>
        <div className='flex justify-between text-white'>
          <motion.button
            onClick={() => handlePrev(detail.nomor)}
            className='px-3 py-2 bg-gray-700 rounded-md text-sm cursor-pointer'
            whileHover={{
              scale: detail.nomor === 1 ? 1 : 1.1,
            }}
            whileTap={{
              scale: detail.nomor === 1 ? 1 : 0.9,
              backgroundColor: detail.nomor === 1 ? "#999" : "#67F6E7",
              border: "none",
              color: "#000",
            }}
            animate={{
              backgroundColor: detail.nomor === 1 ? "#999" : "#333",
              cursor: detail.nomor === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </motion.button>
          <AudioPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            src={detail.audio}
          />
          <motion.button
            className='px-3 py-2 bg-gray-700 rounded-md text-sm cursor-pointer disabled:bg-gray-500'
            whileHover={{
              scale: 1.1,
            }}
            disabled={detail.nomor === 114}
            whileTap={{
              scale: 0.9,
              backgroundColor: "#67F6E7",
              border: "none",
              color: "#000",
            }}
            onClick={() => handleNext(detail.nomor)}
          >
            Next
          </motion.button>
        </div>
        {detail.ayat.map((ayat) => (
          <div
            className='flex font-medium text-3xl gap-x-4 justify-end border p-5 shadow-lg rounded-lg'
            key={ayat.nomor}
          >
            <div>
              {ayat.ar}
              <span className='px-5 py-3 mr-4 rounded-full border text-xl'>
                {ConvertToArabicNumbers(ayat.nomor)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </MainLayouts>
  );
};

export default DetailSurahPages;
