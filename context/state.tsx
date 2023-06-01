import React, { createContext, useContext, useState, ReactNode } from "react";
import { TUser } from "../types";

type AppContextType = {
  user: TUser;
  setUser: React.Dispatch<React.SetStateAction<TUser>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUser>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birth_date: "",
    genre: "",
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
