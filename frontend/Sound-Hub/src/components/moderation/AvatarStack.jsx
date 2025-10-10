import { Avatar } from "@material-tailwind/react";

export default function AvatarStack({ users = [] }) {
  return (
    <div className="flex items-center -space-x-4">
      {users.map((user, index) => (
        <Avatar
          key={index}
          variant="circular"
          alt={user.name}
          className="border-2 border-white hover:z-10 focus:z-10"
          src={user.avatar ?? "icons/user_icon.svg"}
        />
      ))}
    </div>
  );
}
