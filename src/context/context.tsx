import { getLocalStorage, setLocalStorage } from "@/helpers/storage";
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Membuat tipe untuk state favorites
export type Favorite = {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
};

export type FavoritesState = {
  favorites: Favorite[];
  isFavorite: boolean;
};

// Inisialisasi state awal
export const initialState: FavoritesState = {
  favorites: [],
  isFavorite: false,
};

// Membuat tipe untuk action
type Action =
  | { type: "ADD_FAVORITE"; payload: Favorite }
  | { type: "REMOVE_FAVORITE"; payload: number };

// Reducer untuk mengubah state favorites
function favoritesReducer(state: FavoritesState, action: Action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (
        state.favorites.find(
          (favorite) => favorite.nomor === action.payload.nomor
        )
      ) {
        console.log("sudah ada");
        state.isFavorite = true;
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.nomor !== action.payload
        ),
      };
  }
}

// Membuat context favorites
export const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Membuat custom hook untuk mengakses context favorites
export const useFavorites = () => useContext(FavoritesContext);

interface Props {
  children: React.ReactNode;
}

// Component provider untuk favorites context
export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      console.log(getLocalStorage("favorites"));
    } else {
      console.log("You are on the server");
      // 👉️ can't use localStorage
    }
  }, []);
  const [state, dispatch] = useReducer(favoritesReducer, initialState, () => {
    // Ambil data favorites dari local storage saat pertama kali rendering
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      return favorites
        ? { ...initialState, favorites: JSON.parse(favorites) }
        : initialState;
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
