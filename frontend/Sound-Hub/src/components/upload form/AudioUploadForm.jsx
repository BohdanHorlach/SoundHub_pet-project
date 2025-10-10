import React, { useRef } from "react";
import CardEditor from "../card/CardEditor";
import { Button, Typography } from "@material-tailwind/react";
import AudioDropzone from "./AudioDropzone";
import { useUploadActions } from "../../hooks/presenters/useUploadActions";


function AudioUploadForm() {
  const cardEditorRef = useRef();
  const {
    file,
    setFile,
    message,
    setMessage,
    handleSubmit } = useUploadActions();

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={(e) => handleSubmit(e, cardEditorRef)} style={{ maxWidth: 400, margin: "auto" }}>
        <CardEditor setMessage={setMessage} ref={cardEditorRef} />

        <div className="my-8">
          <Typography variant="h5" className="font-medium mb-2">
            Upload audio file:
          </Typography>
          <AudioDropzone
            file={file}
            setFile={setFile}
            setMessage={setMessage}
          />
        </div>

        <Button
          type="submit"
          variant="gradient"
          color="green"
          className="w-full"
        >
          Upload
        </Button>

        {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default AudioUploadForm;
