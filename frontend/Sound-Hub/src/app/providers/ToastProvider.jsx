import { Toaster } from "react-hot-toast";


export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className:
          "bg-gray-800 text-white rounded-lg px-4 py-3 shadow-lg font-medium",
        success: {
          className:
            "bg-green-600 text-white rounded-lg px-4 py-3 shadow-lg font-medium",
        },
        error: {
          className:
            "bg-red-600 text-white rounded-lg px-4 py-3 shadow-lg font-medium",
        },
      }}
    />
  );
}
