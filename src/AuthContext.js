import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     const isAuth = async () => {
  //       try {
  //         const res = await axios.get("http://localhost:5000/api/logged-user/");

  //         setUser(res.data);
  //       } catch (error) {
  //         setUser(null);
  //       }
  //     };

  //     isAuth();
  //   }, [auth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
