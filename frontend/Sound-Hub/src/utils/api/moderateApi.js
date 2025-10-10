import axiosInstance from "../../utils/api/axios-instance";

export async function fetchPendingCards() {
  const res = await axiosInstance.get("/music", {
    params: { page: 1, limit: 30, status: "pending" },
  });
  return res.data.cards;
}

export async function updateCardStatus(cardId, data) {
  return axiosInstance.post(`/music/${cardId}`, data, {
    headers: { "Content-Type": "application/json" },
  });
}
