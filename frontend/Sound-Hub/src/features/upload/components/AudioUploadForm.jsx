import React, { useRef, useState } from "react";
import CardEditor from "../../cards/components/CardEditor";
import { Button, Typography } from "@material-tailwind/react";
import AudioDropzone from "./AudioDropzone";
import { useUploadActions } from "../hooks/useUploadActions";
import MusicCardModal from "../../cards/components/MusicCardModal";
import { useAuth } from "../../../app/providers/AuthProvider";


function AudioUploadForm() {
  const { user } = useAuth();
  const cardEditorRef = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);

  const {
    file,
    setFile,
    message,
    setMessage,
    handleUpload } = useUploadActions();


  const getPreviewCard = () => {
    const data = cardEditorRef.current?.getData();
    if (!data || !file) return null;

    return {
      id: "preview",
      title: data.title || "Untitled",
      audioUrl: URL.createObjectURL(file),
      categories: data.categories || [],
      authorId: user.id,
    };
  };


  const handlePreview = (e) => {
    e.preventDefault();

    const card = getPreviewCard();
    if (!card) {
      setMessage("Please fill out title, categories and upload an audio file before preview.");
      return;
    }

    setPreviewOpen(true);
  };


  return (
    <div className="flex items-center justify-center">
      <div style={{ maxWidth: 400, margin: "auto" }}>
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
          variant="gradient"
          color="green"
          className="w-full"
          onClick={handlePreview}
        >
          Upload
        </Button>

        {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
      </div>


      {/* Preview Modal */}
      {previewOpen && (
        <MusicCardModal
          open={previewOpen}
          card={getPreviewCard()}
          onClose={() => setPreviewOpen(false)}
          isFavorite={false}
          onToggleFavorite={() => { }}
          onPlay={() => { }}
          downloadUrl={null}
          canDownload={false}
          actionButton={
            <Button color="green" variant="gradient" onClick={(e) => { handleUpload(e, cardEditorRef), setPreviewOpen(false); }}>
              Confirm Upload
            </Button>
          }
        />
      )}
    </div>
  );
}

export default AudioUploadForm;
