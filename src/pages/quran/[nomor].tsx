import api from "@/service/api";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import MainLayouts from "@/layouts/MainLayouts";
import { DetailSurah, ListSurah, Params } from "@/types/DetailSurah";

type Props = {
  detail?: DetailSurah;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const response = await api.get("/surah");
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
    const response = await api.get(`/quran/${nomor}`);
    const detail: DetailSurah = response.data;
    return {
      props: {
        detail,
      },
    };
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return { props: {} };
  }
};

const DetailSurahPages = ({ detail }: Props) => {
  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayouts>
      <div className='min-w-6xl gap-x-5'>
        <h1>{detail.nama}</h1>
        <p>{detail.jumlah_ayat}</p>
      </div>
    </MainLayouts>
  );
};

export default DetailSurahPages;
