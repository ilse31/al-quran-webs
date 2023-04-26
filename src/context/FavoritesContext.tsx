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
  IsFavorite: boolean;
};

// Inisialisasi state awal
export const initialState: FavoritesState = {
  favorites: [],
  IsFavorite: false,
};

// Membuat tipe untuk action
type Action =
  | { type: "ADD_FAVORITE"; payload: Favorite }
  | { type: "REMOVE_FAVORITE"; payload: number };

// Reducer untuk mengubah state favorites
function favoritesReducer(
  state: FavoritesState,
  action: Action
): FavoritesState {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (
        state.favorites.some(
          (favorite) => favorite.nomor === action.payload.nomor
        )
      ) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        IsFavorite: true,
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.nomor !== action.payload
        ),
        IsFavorite: false,
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
    } else {
      console.log("You are on the server, 👉️ can't use localStorage");
    }
  }, []);
  const [state, dispatch] = useReducer(favoritesReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("favorites");
      try {
        return localData ? JSON.parse(localData) : initialState;
      } catch (error) {
        console.error("Error parsing favorites data from localStorage", error);
        return initialState;
      }
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(state));
    }
  }, [state]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
