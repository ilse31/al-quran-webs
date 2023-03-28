import { CardsSurah } from "@/components";
import MainLayouts from "@/layouts/MainLayouts";
import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";

type Post = {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
};

type Props = {
  posts: Post[];
};

const Surah = ({ posts }: Props) => {
  return (
    <MainLayouts>
      <div className='flex min-h-screen'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex gap-5 flex-row flex-wrap justify-center'>
            {posts.map((post) => (
              <div key={post.nomor}>
                <CardsSurah
                  arti={post.arti}
                  nama_latin={post.nama_latin}
                  number={post.nomor}
                  title={post.nama}
                  totalAyat={post.jumlah_ayat}
                  desc={post.deskripsi}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayouts>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await axios.get("http://localhost:3000/api/quran/surah");
  const posts: Post[] = response.data;
  return {
    props: {
      posts,
    },
  };
};

export default Surah;
