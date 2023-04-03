import { CardsSurah } from "@/components";
import MainLayouts from "@/layouts/MainLayouts";
import api from "@/service/api";
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
      <div className='flex mt-5 max-w-7xl mx-auto'>
        <div className='flex gap-3 flex-row flex-wrap justify-center'>
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
    </MainLayouts>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await api.get("/surah");
  const posts: Post[] = response.data;
  return {
    props: {
      posts,
    },
  };
};

export default Surah;
