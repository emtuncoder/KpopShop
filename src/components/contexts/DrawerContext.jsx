import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(null); // "cart" | "search" | null

  const toggleDrawer = (type) => {
    setOpenDrawer(prev => (prev === type ? null : type));
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
