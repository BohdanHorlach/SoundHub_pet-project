import { useState, useEffect } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api/axios-instance";
import toast from "react-hot-toast";


export function useUploadActions() {
  const TOAST_HIDE_DURATION = 6000;

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { user, isAuth, loading } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuth && !loading) navigate("/auth");
  }, [isAuth, loading, navigate]);


  const validateForm = (cardEditorRef) => {
    if (message !== "") 
      return false;

    let error = "";
    if (!file) {
      error = "Please select an audio file.";
    } else {
      const cardData = cardEditorRef.current?.getData();
      if (!cardData) error = "Please resolve issues.";
    }

    setMessage(error);
    return error === "";
  };


  const getFormData = (cardEditorRef) => {
    const cardData = cardEditorRef.current?.getData();
    return { ...cardData, userId: user.id, audio: file };
  };


  const handleUpload = async (event, cardEditorRef) => {
    event.preventDefault();
    if (!validateForm(cardEditorRef)) return;

    const loadingToast = toast.loading("Uploading audio...");

    try {
      const { status, data } = await axiosInstance.post("/music", getFormData(cardEditorRef), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.dismiss(loadingToast);

      if (status === 201) {
        toast.success("Upload successful!");
        setFile(null);
        cardEditorRef.current?.clear();
      } else {
        toast.error(data.message || "Upload failed.", { duration: TOAST_HIDE_DURATION });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Upload failed.", { duration: TOAST_HIDE_DURATION });
    }
  };


  return {
    file,
    setFile,
    message,
    setMessage,
    handleUpload
  };
}
