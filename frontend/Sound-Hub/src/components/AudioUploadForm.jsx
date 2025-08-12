import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/api/axios-instance";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import CardEditor from "../components/card/CardEditor";


function AudioUploadForm({ userId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { isAuth, loading } = useAuth();
  const navigate = useNavigate();
  const cardEditorRef = useRef();

  useEffect(() => {
    if (!isAuth && !loading) navigate("/auth");
  }, [isAuth, loading, navigate]);

  const validateForm = () => {
    let message = "";

    if (!file) {
      message = "Please select an audio file.";
    } else {
      const cardData = cardEditorRef.current?.getData();
      if (!cardData || !cardData.title.trim()) {
        message = "Please enter a title.";
      }
    }

    setMessage(message);
    return message === "";
  };

  const getFormData = () => {
    const formData = new FormData();
    formData.append("audio", file);

    const cardData = cardEditorRef.current.getData();
    formData.append("title", cardData.title);
    formData.append("categories", JSON.stringify(cardData.categories));

    formData.append("userId", userId);

    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const { status, data } = await axiosInstance.post("/music", getFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status === 201) {
        setMessage("Upload successful!");
        setFile(null);
        //TODO: Add clear form method in CardEditor
      } else {
        setMessage(data.message || "Upload failed.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <CardEditor ref={cardEditorRef} />

      <div style={{ marginTop: 12 }}>
        <label>
          Audio file:
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            style={{ marginTop: 4, marginBottom: 12 }}
          />
        </label>
      </div>

      <button type="submit">Upload</button>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </form>
  );
}

export default AudioUploadForm;
