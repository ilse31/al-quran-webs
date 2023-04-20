// create modal context with timer 5 seconds to close modal
import { createContext, ReactNode, useEffect, useState } from "react";

type ModalContextType = {
  modal: boolean;
  setModal: (value: boolean) => void;
};

const ModalContext = createContext<ModalContextType>({
  modal: false,
  setModal: () => {},
});

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setModal(false);
      }, 5000);
    }
  }, [modal]);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
