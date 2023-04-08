import { CardsSurah } from "@/components";
import MainLayouts from "@/layouts/MainLayouts";
import api from "@/service/api";
import { Quran } from "@/types/DataQuran";
import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";

type Props = {
  dataSurah: Quran[];
};

const Surah = ({ dataSurah }: Props) => {
  return (
    <MainLayouts desc='Ayo Baca Quran' title='Ayo Ibadah || Baca Al-Quran'>
      <div className='flex p-5 max-w-7xl mx-auto'>
        <div className='flex gap-3 flex-row flex-wrap justify-center'>
          {dataSurah.map((surah) => (
            <div key={surah.nomor}>
              <CardsSurah
                arti={surah.arti}
                nama_latin={surah.nama_latin}
                number={surah.nomor}
                title={surah.nama}
                totalAyat={surah.jumlah_ayat}
                desc={surah.deskripsi}
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayouts>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await axios.get(
    "https://quran-api.santrikoding.com/api/surah"
  );
  const dataSurah: Quran[] = response.data;
  return {
    props: {
      dataSurah,
    },
    revalidate: 3600, //
  };
};

export default Surah;
