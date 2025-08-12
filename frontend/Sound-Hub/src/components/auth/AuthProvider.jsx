import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axiosInstance from "../../utils/api/axios-instance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);

      if (user) {
        setIsAuth(true);
        axiosInstance.get("/user").then((response) => {
          setUser(response.data.user);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);