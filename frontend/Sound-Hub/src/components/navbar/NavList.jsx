import { Typography, Button } from "@material-tailwind/react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export default function NavList() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Выход выполнен");
        location.reload();
      })
      .catch((error) => {
        console.error("Ошибка выхода:", error);
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
      <div>
        <Button onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </ul>
  );
}