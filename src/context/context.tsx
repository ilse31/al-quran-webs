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
};

// Inisialisasi state awal
export const initialState: FavoritesState = {
  favorites: [],
};

// Membuat tipe untuk action
type Action =
  | { type: "ADD_FAVORITE"; payload: Favorite }
  | { type: "REMOVE_FAVORITE"; payload: number };

// Reducer untuk mengubah state favorites
function favoritesReducer(state: FavoritesState, action: Action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      // Jika buku belum ada di favorites, tambahkan ke favorites
      if (
        !state.favorites.find(
          (favorite) => favorite.nomor === action.payload.nomor
        )
      ) {
        return { ...state, favorites: [...state.favorites, action.payload] };
      }
      return state;
    case "REMOVE_FAVORITE":
      // Filter buku yang akan dihapus dari favorites
      const newFavorites = state.favorites.filter(
        (favorite) => favorite.nomor !== action.payload
      );
      return { ...state, favorites: newFavorites };
    default:
      return state;
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
      console.log(localStorage.getItem("name"));
    } else {
      console.log("You are on the server");
      // 👉️ can't use localStorage
    }
  }, []);
  const [state, dispatch] = useReducer(favoritesReducer, initialState, () => {
    // Ambil data favorites dari local storage saat pertama kali rendering
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      return favorites ? { favorites: JSON.parse(favorites) } : initialState;
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
