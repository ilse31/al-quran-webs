import CardsSurah from "@/components/CardsSurah";
import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";

type Post = {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
};

type Props = {
  posts: Post[];
};

const Surah = ({ posts }: Props) => {
  return (
    <div className='bg-white flex w-full min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex gap-5 flex-row flex-wrap justify-center'>
          {posts.map((post) => (
            <div key={post.nomor}>
              <CardsSurah
                number={post.nomor}
                title={post.nama}
                desc={post.nama_latin}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
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
