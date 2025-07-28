import { Typography, Button, Navbar, IconButton, Drawer } from "@material-tailwind/react";
import SafeArea from "./SafeArea";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import NavList from "./navbar/NavList";

const WITH_THRESHOLD = 960;


export default function Header() {
    const [user, setUser] = useState(null);
    const [isOpenNav, setOpenNav] = useState(false);
    const navigate = useNavigate();

    function handleResize() {
        if (window.innerWidth >= WITH_THRESHOLD) {
            setOpenNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        const unsubscribe = onAuthStateChanged(auth, setUser);

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, []);


    const handleSignIn = () => {
        navigate("/auth");
    };

    const closeDrawer = () => setOpenNav(false);

    return (
        <>
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none p-0 py-2">
                <SafeArea>
                    <div className="flex justify-between items-center">
                        <Typography
                            variant="h3"
                            as="a"
                            href="/"
                            className="cursor-pointer py-1.5 text-blue-gray-800"
                        >
                            Sound-Hub
                        </Typography>
                        <div className="flex items-center gap-4">
                            <div>
                                {user ? (
                                    <div>
                                        <div className="hidden lg:block">{NavList}</div>
                                        <IconButton
                                            title="Toggle navigation"
                                            variant="text"
                                            className="ml-auto h-6 w-6 text-foreground hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                            ripple={false}
                                            onClick={() => setOpenNav(!isOpenNav)}
                                        >
                                            {isOpenNav ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    className="h-6 w-6"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4 6h16M4 12h16M4 18h16"
                                                    />
                                                </svg>
                                            )}
                                        </IconButton>
                                    </div>
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
            <Drawer
                placement="right"
                open={isOpenNav}
                onClose={closeDrawer}
                overlay={true}
                overlayProps={{ className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50" }}>
                <Navbar>
                    {user ? (
                        <div className="block lg:hidden">
                            <div>{NavList}</div>
                        </div>
                    ) : (
                        <Typography color="red">
                            The account was not found, please reload the page.
                        </Typography>
                    )}
                </Navbar>
            </Drawer>
        </>
    )
}