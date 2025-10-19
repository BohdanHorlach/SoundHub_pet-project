import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/api/axios-instance";


export function useCards(type = "all", searchParams) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [screenLimit, setLimit] = useState(20); // default limit

  const updateLimitByWidth = () => {
    const width = window.innerWidth;

    if (width >= 1536) {        // 2xl
      setLimit(20);
    } else if (width >= 1140) { // xl
      setLimit(12);
    } else if (width >= 1000) {  // md
      setLimit(8);
    } else {                     // sm
      setLimit(6);
    }
  };


  useEffect(() => {
    updateLimitByWidth();
    window.addEventListener("resize", updateLimitByWidth);

    return () => window.removeEventListener("resize", updateLimitByWidth);
  }, []);


  const fetchCards = async () => {
    try {
      const categories = JSON.parse(searchParams.get("categories") || "[]");
      const title = searchParams.get("title") || "";
      const page = Number(searchParams.get("page") || 1);
      const limit = Number(searchParams.get("limit") || screenLimit);

      setLoading(true);
      const { data } = await axiosInstance.get(`/music?type=${type}`, {
        params: { categories: JSON.stringify(categories), title, page, limit },
      });

      setCards(data.cards || []);
      setPagination({
        page: data.page || page,
        totalPages: data.totalPages || Math.ceil(data.total / limit),
        total: data.total || 0,
      });
    } catch (err) {
      console.error(err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (screenLimit) 
      fetchCards();
  }, [searchParams.toString(), screenLimit]);


  return { cards, pagination, loading, fetchCards };
}