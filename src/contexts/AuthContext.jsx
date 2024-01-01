import { createContext,useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("access-token") ? true : false);

  const signIn = (user) => {
    setLoggedIn(true);
    setUser(user);
    localStorage.setItem("access-token", user.token);
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    setLoggedIn(false);
    setUser(null);
  };

  const values = {
    user,
    loggedIn,
    signIn,
    logout,
  };
  
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
