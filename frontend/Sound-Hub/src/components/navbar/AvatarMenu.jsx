import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import useSession from "../../hooks/api/useSession";
import { ArrowUpCircleIcon, HeartIcon, PowerIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";


const menuItems = [
  {
    label: "Saved cards",
    icon: HeartIcon,
    to: "/saved",
  },
  {
    label: "Upload new",
    icon: ArrowUpCircleIcon,
    to: "/upload",
  },
  {
    label: "Admin panel",
    icon: ShieldCheckIcon,
    to: "/admin",
    adminOnly: true,
    color: "orange",
    hoverColor: "hover:bg-orange-500/10 focus:bg-orange-500/10 active:bg-orange-500/10",
  },
  {
    label: "Logout",
    icon: PowerIcon,
    action: "logout",
    color: "red",
    hoverColor: "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10",
  },
];


export default function AvatarMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAdmin, user, handleLogout } = useSession();
  let location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;


  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src={user?.avatar || "icons/user_icon.svg"}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {menuItems.map((item) => {
          if (item.adminOnly && !isAdmin)
            return null;

          const Icon = item.icon;
          const isLogout = item.action === "logout";
          const color = item.color || "inherit";
          const hover = item.hoverColor || "";

          return (
            <MenuItem
              key={item.label}
              onClick={() => {
                closeMenu();
                if (isLogout)
                  handleLogout();
              }}
              className={`${hover}`}
            >
              {item.to ? (
                <Link
                  to={item.to}
                  className={`flex gap-2 w-full ${isActive(item.to) ? "underline underline-offset-4 font-semibold" : ""}`}>
                  <Icon className={`h-4 w-4 relative top-0.5 ${color !== "inherit" ? `text-${color}-500` : ""}`} />
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={color}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ) : (
                <div className="flex gap-2 w-full cursor-pointer">
                  <Icon className={`h-4 w-4 relative top-0.5 ${color !== "inherit" ? `text-${color}-500` : ""}`}
                  />
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={color}
                  >
                    {item.label}
                  </Typography>
                </div>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}