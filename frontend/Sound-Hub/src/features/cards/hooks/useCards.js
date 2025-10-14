import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/api/axios-instance";


export function useCards(type = "all", searchParams) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCards = async () => {
    try {
      const categories = JSON.parse(searchParams.get("categories") || "[]");
      const title = searchParams.get("title") || "";

      setLoading(true);
      const { data } = await axiosInstance.get(`/music?type=${type}`, {
        params: { categories: JSON.stringify(categories), title },
      });
      setCards(data.cards);
    } catch (err) {
      console.error(err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCards();
  }, [searchParams.toString()]);


  return { cards, loading, fetchCards };
}