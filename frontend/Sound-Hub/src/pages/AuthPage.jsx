import { Card, CardBody, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import SafeArea from "../components/SafeArea";


function AuthType({ text, icon }) {
  return (
    <ListItem ripple={false} className="flex flex-row justify-center gap-2 m-2 rounded-2xl border border-gray-600 shadow-lg">
      <ListItemPrefix className="max-w-[12.5%] m-0">
        <img src={icon} />
      </ListItemPrefix>
      <Typography variant="lead" className="flex justify-center">
        {text}
      </Typography>
    </ListItem>
  );
}


export default function AuthPage() {
  return (
    <SafeArea className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Card color="white" variant="gradient" className="w-96 shadow-xl rounded-3xl py-10">
        <CardBody>
          <Typography variant="h2" className="text-center text-black mb-5">
            Sign up / Sign in
          </Typography>
          <List className="items-center">
            <AuthType text="Sign in with Google" icon="icons/google_icon.svg" />
            <AuthType text="Sign in with Facebook" icon="icons/facebook_icon.svg" />
          </List>
        </CardBody>
      </Card>
    </SafeArea>
  );
}