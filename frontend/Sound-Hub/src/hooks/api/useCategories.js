import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/api/axios-instance";

let cachedCategories = null;
let inFlightPromise = null;


export function useCategories() {
  const [categories, setCategories] = useState(cachedCategories);
  const [loading, setLoading] = useState(!cachedCategories);
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);


  const handleResponse = (data, error) => {
    if (!mountedRef.current)
      return;

    setCategories(data);
    setLoading(false);
    setError(error);
  };


  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);


  useEffect(() => {
    if (cachedCategories) {
      setCategories(cachedCategories);
      setLoading(false);
      return;
    }

    if (!inFlightPromise) {
      inFlightPromise = axiosInstance
        .get("/category")
        .then((res) => (cachedCategories = res.data))
        .finally(() => {
          inFlightPromise = null;
        });
    }

    setLoading(true);
    inFlightPromise
      .then((data) => handleResponse(data, null))
      .catch((err) => handleResponse(null, err));
  }, []);

  return { categories, loading, error };
}
