import { CardsSurah } from "@/components";
import { FavoritesContext } from "@/context/FavoritesContext";
import MainLayouts from "@/layouts/MainLayouts";
import api from "@/service/api";
import { Quran } from "@/types/DataQuran";
import { GetStaticProps } from "next";
import React, { useContext, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

type Props = {
  dataSurah: Quran[];
};

const Surah = ({ dataSurah }: Props) => {
  const { state, dispatch } = useContext(FavoritesContext);
  const { favorites } = state;
  const [searchTerms, setSearchTerms] = useState("");
  const [seelectedOption, setSelectedOption] = useState(null);
  const [showOption, setShowOption] = useState(false);
  const [searchSelect, setSearchSelect] = useState("");

  const handleInputChange = (e: any) => {
    setSearchTerms(e.target.value);
    setShowOption(true);
  };

  const handleoptionClick = (option: any) => {
    setSelectedOption(option);
    setSearchTerms(option.nama_latin);
    setShowOption(false);
  };

  const filtered = dataSurah.filter(
    (option) =>
      option.nama_latin.toLowerCase().includes(searchTerms.toLowerCase()) ||
      option.nama.toLowerCase().includes(searchTerms.toLowerCase())
  );

  const handleDelete = () => {
    setSearchTerms("");
    setSelectedOption(null);
    setShowOption(false);
  };

  const handleAddFavorite = (surah: any) => {
    if (favorites.some((favorite) => favorite.nomor === surah.nomor)) {
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: surah.nomor,
      });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: surah,
      });
    }
  };

  const handleSelect = (e: any) => {
    setSearchSelect(e.target.value);
    console.log(searchSelect);
  };

  return (
    <MainLayouts desc='Ayo Baca Quran' title='Ayo Ibadah || Baca Al-Quran'>
      <div className='flex p-5 max-w-7xl mx-auto flex-col'>
        <div className='flex flex-col md:flex-row items-center justify-between flex-wrap'>
          <div className='flex border rounded-md px-3 py-2 md:w-1/4 w-full'>
            Favorit :
          </div>
          <div className='flex border rounded-md md:w-1/4 w-full px-3'>
            <div className='flex items-center w-full'>
              <BiSearchAlt className='text-gray-700 mr-2' />
              <input
                type='text'
                placeholder='Search...'
                value={searchTerms}
                onChange={handleInputChange}
                className=' py-2 text-gray-700 w-full border-none outline-none'
              />

              {searchTerms && searchTerms.length >= 2 && (
                <div className='flex items-center'>
                  <button
                    className='text-gray-700'
                    onClick={() => handleDelete()}
                  >
                    X
                  </button>
                </div>
              )}
            </div>

            {showOption && searchTerms.length >= 2 && (
              <div className='absolute mt-16 w-1/4 bg-white rounded-xl shadow-2xl'>
                {filtered.map((option) => (
                  <div
                    key={option.nomor}
                    className='p-2 border-b cursor-pointer hover:bg-gray-200'
                    onClick={() => handleoptionClick(option)}
                  >
                    {option.nama_latin}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-3 flex-row flex-wrap justify-center'>
          {filtered.map((surah) => (
            <div key={surah.nomor}>
              <CardsSurah
                IsFavorites={
                  favorites &&
                  favorites.some((favorite) => favorite.nomor === surah.nomor)
                }
                arti={surah.arti}
                nama_latin={surah.nama_latin}
                number={surah.nomor}
                title={surah.nama}
                totalAyat={surah.jumlah_ayat}
                desc={surah.deskripsi}
                handleClick={() => handleAddFavorite(surah)}
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayouts>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await api.get("quran");
  const dataSurah: Quran[] = response.data;
  return {
    props: {
      dataSurah,
    },
  };
};

export default Surah;
