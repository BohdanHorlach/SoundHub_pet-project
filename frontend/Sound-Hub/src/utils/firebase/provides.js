import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

export default {
  google: {
    name: "Google",
    icon: "icons/google_icon.svg",
    instance: new GoogleAuthProvider(),
    class: GoogleAuthProvider,
  },
  facebook: {
    name: "Facebook",
    icon: "icons/facebook_icon.svg",
    instance: new FacebookAuthProvider(),
    class: FacebookAuthProvider,
  },
};