import { useState } from "react";
import axiosInstance from "../../../utils/api/axios-instance";
import { useNavigate } from "react-router-dom";


export function useMusicCardActions(card) {
  const [isFavorite, setIsFavorite] = useState(card.isOnFavorite || false);
  const [openDetails, setOpenDetails] = useState(false);
  const navigate = useNavigate();

  const ensureAuth = (error) => {
    if (error.status === 401) navigate("/auth");
  };

  const onReady = () => setIsFavorite(card.isOnFavorite);

  const addToFavorite = async (cardId) => {
    try {
      await axiosInstance.post(`/favorite/${cardId}`);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      ensureAuth(error);
    }
  };

  return {
    isFavorite,
    openDetails,
    setOpenDetails,
    addToFavorite,
    onReady,
  };
}
