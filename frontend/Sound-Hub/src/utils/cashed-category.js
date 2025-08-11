import axiosInstance from "./axios/axios-instance";

let cachedCategories = null;

export async function getCategories() {
  if (cachedCategories) {
    return cachedCategories;
  }

  try {
    const response = await axiosInstance.get("/category");
    cachedCategories = response.data;
    return cachedCategories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}