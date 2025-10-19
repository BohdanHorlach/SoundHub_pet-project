import { Typography, Button, Navbar } from "@material-tailwind/react";
import SafeArea from "./SafeArea";
import { useNavigate } from "react-router-dom";
import NavList from "../../features/search/AvatarMenu";
import { useAuth } from "../providers/AuthProvider";


export default function Header() {
    const { isAuth } = useAuth();
    const navigate = useNavigate();


    const handleSignIn = () => {
        navigate("/auth");
    };


    return (
        <>
            <Navbar className="sticky top-0 z-50 h-max max-w-full bg-white/25 rounded-none p-0 py-2">
                <SafeArea>
                    <div className="flex justify-between items-center">
                        <Typography
                            variant="h3"
                            as="a"
                            href="/"
                            className="cursor-pointer py-1.5 text-blue-gray-800"
                        >
                            Sound-Hub
                            <Typography variant="h6" className="inline text-gray-500 ml-2">
                                pet-project
                            </Typography>
                        </Typography>
                        <div className="flex items-center gap-4">
                            <div>
                                {isAuth ? (
                                    <NavList />
                                ) : (
                                    <Button onClick={handleSignIn} variant="outlined">
                                        <Typography variant="paragraph">
                                            Sign In
                                        </Typography>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </SafeArea>
            </Navbar>
        </>
    )
}