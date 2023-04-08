import api from "@/service/api";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import MainLayouts from "@/layouts/MainLayouts";
import { DetailSurah, ListSurah, Params } from "@/types/DetailSurah";
import Slider from "react-slick";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { stringToHTML } from "@/helpers/ParsingData";
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
  const [first, setfirst] = useState(null);

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

  return (
    <MainLayouts>
      <div className='mx-auto bg-gray-800'>
        <Slider {...settings} className='h-96'>
          <div className='flex flex-col items-center h-96 '>
            <div className='p-5 flex justify-around flex-row-reverse items-center h-full'>
              <div className='flex'>
                <Image src={Logo} alt='alquran' width={200} />
              </div>
              <div className='font-poppins text-white'>
                <h1 className='text-6xl font-bold'>{detail.nama}</h1>
                <h1 className='text-4xl font-normal'>{detail.nama_latin}</h1>
                <h1 className='text-4xl font-light'>{detail.arti}</h1>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center h-96 text-white'>
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
      <div className='flex flex-col max-w-6xl mx-auto p-5'>
        {detail.ayat.map((ayat) => (
          <div className='flex' key={ayat.nomor}>
            <p>{ayat.nomor}</p>
            <p>{ayat.ar}</p>
          </div>
        ))}
      </div>
    </MainLayouts>
  );
};

export default DetailSurahPages;
