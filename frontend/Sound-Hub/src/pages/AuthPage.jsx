import { Card, CardBody, List, Typography } from "@material-tailwind/react";
import { getRedirectResult, signInWithPopup } from "firebase/auth";
import SafeArea from "../components/base/SafeArea";
import AuthType from "../components/auth/AuthType";
import { auth } from "../firebase/firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import providers from "../firebase/provides";


export default function AuthPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseDescription = "Sign in with ";


  const handleSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider.instance);

      if (result)
        navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = provider.class.credentialFromError?.(error);

      console.error("Auth error:", errorCode, errorMessage, credential);
      setError(errorMessage);
    }
  };


  return (
    <SafeArea className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Card color="white" variant="gradient" className="w-96 shadow-xl rounded-3xl py-10">
        <CardBody>
          <Typography variant="h2" className="text-center text-black mb-5">
            Sign up / Sign in
          </Typography>
          <List className="items-center">
            {Object.entries(providers).map(([key, provider]) => (
              <AuthType
                key={key}
                text={baseDescription + provider.name}
                icon={provider.icon}
                onClick={() => handleSignIn(provider)}
              />
            ))}
          </List>
        </CardBody>
      </Card>
      {error && (
        <Typography variant="lead" color="red" className="mt-10">
          {error}
        </Typography>
      )}
    </SafeArea>
  );
}