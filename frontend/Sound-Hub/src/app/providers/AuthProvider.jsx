import { createContext, useContext } from "react";
import useSession from "../../features/auth/useSession";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isAuth, isAdmin, loading, token } = useSession();

  return (
    <AuthContext.Provider value={{ user, isAuth, isAdmin, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);