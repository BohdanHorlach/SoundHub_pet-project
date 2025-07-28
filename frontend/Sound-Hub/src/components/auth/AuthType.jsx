import { ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";


export default function AuthType({ text = "", icon = "", onClick = () => { } }) {
  return (
    <ListItem
      onClick={onClick}
      ripple={false}
      className="flex flex-row justify-center gap-2 m-2 rounded-2xl border border-gray-600 shadow-lg"
    >
      <ListItemPrefix className="max-w-[12.5%] m-0">
        <img src={icon} />
      </ListItemPrefix>
      <Typography variant="lead" className="flex justify-center">
        {text}
      </Typography>
    </ListItem>
  );
}