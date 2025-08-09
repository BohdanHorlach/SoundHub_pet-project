import axios from "axios";
import { auth } from "../firebase/firebase-config";

const axiosInstance = axios.create({
  baseURL: "/api",
});


axiosInstance.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Axios Request:", config);
  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", response);
    return response;
  },
  (error) => {
    console.error("Axios Error:", error);
    return Promise.reject(error);
  }
);


export default axiosInstance;