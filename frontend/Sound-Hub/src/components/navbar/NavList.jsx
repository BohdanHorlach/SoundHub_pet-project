import { Typography, Button } from "@material-tailwind/react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-config";
import { useAuth } from "../auth/AuthProvider";

export default function NavList() {
  const { isAdmin } = useAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Log out complete");
        location.reload();
      })
      .catch((error) => {
        console.error("Log out ERROR:", error);
      });
  };


  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Favorite
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Upload
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Categories
        </a>
      </Typography>
      <>
        {
          isAdmin ?
            (
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <a href="/admin" className="flex items-center">
                  Admin Panel
                </a>
              </Typography>
            ) :
            (<></>)
        }
      </>
      <div>
        <Button onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </ul>
  );
}