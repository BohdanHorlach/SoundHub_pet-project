import { Spinner } from "@material-tailwind/react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen text-2xl">
      <Spinner color="indigo" className="h-10 w-10" />
    </div>
  );
}