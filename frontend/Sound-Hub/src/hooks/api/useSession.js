import { auth } from "../../utils/firebase/firebase-config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import axiosInstance from "../../utils/api/axios-instance";
import { useEffect, useState } from "react";


export default function useSession(){
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);

      if (user) {
        setIsAuth(true);
        axiosInstance.get("/user").then((response) => {
          setUser(response.data.user);
          setIsAdmin(response.data.user.role === "admin");
        });
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (!isAuth) {
      setToken(null);
      return;
    }
    let canceled = false;
    auth.currentUser.getIdToken().then(t => {
      if (!canceled) setToken(t);
    });
    return () => { canceled = true; };
  }, [isAuth]);


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Log out complete");
        location.reload();
      })
      .catch((error) => {
        console.error("Log out ERROR:", error);
      });
  };


  return { user, isAuth, loading, isAdmin, token, handleLogout };
}