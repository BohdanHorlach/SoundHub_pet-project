import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-tailwind/react";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["audio/mpeg", "audio/wav", "audio/x-m4a", "audio/aac"];


export default function AudioDropzone({ file, setFile, setMessage }) {
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      const reason = fileRejections[0].errors[0].message;
      setMessage(reason);
      return;
    }

    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > MAX_FILE_SIZE) {
      setMessage("File too large (max 15MB)");
      return;
    }

    setMessage("");
    setFile(selectedFile);
  }, [setFile, setMessage]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: ALLOWED_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div {...getRootProps()} className={`
      border-dashed border-2 rounded-md p-4 text-center cursor-pointer
      ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}
      ${isDragReject ? "border-red-400 bg-red-50" : ""}
    `}>
      <input {...getInputProps()} />
      {file ? (
        <Typography>{file.name}</Typography>
      ) : (
        <Typography>
          {isDragActive ? "Drop the audio file here..." : "Drag & drop an audio file here, or click to select"}
        </Typography>
      )}
    </div>
  );
}
