import { FavoritesProvider } from "@/context/FavoritesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ModalProvider } from "@/context/ModalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </ModalProvider>
  );
}
