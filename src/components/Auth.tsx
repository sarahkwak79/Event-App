import { createContext, useContext, useState, ReactNode } from "react";

interface AuthType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const Auth = createContext<AuthType>(null!);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login = (username: string, password: string) => {
    if (username === "sarahkwak" && password === "hackthenorth") {
      setisLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setisLoggedIn(false);
  };

  return (
    <Auth.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
