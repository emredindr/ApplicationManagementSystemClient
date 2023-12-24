import { createContext,useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (data) => {
    console.log(data);
    // setLoggedIn(true);
    // setUser(data.result);
    // localStorage.setItem("access-token", data.result.token);
  };
  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("access-token");
  };

  const values = {
    user,
    loggedIn,
    login,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
