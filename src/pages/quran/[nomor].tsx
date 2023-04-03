import api from "@/service/api";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import React from "react";

type ListSurah = {
  nomor: number;
};

type DetailSurah = {
  nomor: number;
  nama: string;
  jumlah_ayat: number;
};

type Props = {
  detail?: DetailSurah;
};

interface Params extends ParsedUrlQuery {
  nomor: any;
}

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
    const response = await axios.get(
      `https://quran-api.santrikoding.com/api/surah/${nomor}`
    );
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
    <div>
      DetailSurahPages
      <div>
        <h1>{detail?.nama}</h1>
      </div>
    </div>
  );
};

export default DetailSurahPages;
