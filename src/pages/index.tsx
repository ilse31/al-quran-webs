import { FavoritesContext } from "@/context/FavoritesContext";
import MainLayouts from "@/layouts/MainLayouts";
import { useContext } from "react";

export default function Home() {
  const { state, dispatch } = useContext(FavoritesContext);
  const { favorites } = state;
  return (
    <>
      <MainLayouts desc='Ayo Ibadah Apps' title='Ayo Ibadah'>
        <div className='h-screen flex justify-center items-center'>
          Halaman masih dalam tahap pengembangan 🚧 🚧 🚧{" "}
          {favorites && favorites ? favorites.length : 0}
        </div>
      </MainLayouts>
    </>
  );
}
