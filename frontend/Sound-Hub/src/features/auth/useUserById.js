import { useEffect, useState } from "react";
import axiosInstance from "../../utils/api/axios-instance";


export default function useUserById(id, enabled = false) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !id || user !== null)
      return;

    setLoading(true);
    setError(null);

    axiosInstance.get(`/user/${id}`)
      .then((response) => setUser(response.data.user))
      .catch((error) => setError(error))
      .finally(()=> setLoading(false));
  }, [id, enabled]);

  return {user, loading, error};
}