import { Typography } from "@material-tailwind/react";
import Header from "../app/layout/Header";
import SafeArea from "../app/layout/SafeArea";
import AudioUploadForm from "../features/upload/components/AudioUploadForm";


export default function UploadPage() {
  return (
    <>
      <Header />
      <SafeArea className="my-16">
        <Typography
          className="
            text-center mb-6 
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
            bg-clip-text text-transparent 
            animate-gradient-x bg-[length:200%_200%]
          "
          variant="h3"
        >
          Uploading form
        </Typography>
        <AudioUploadForm />
      </SafeArea>
    </>
  );
}