import { Link, useLocation, useRouter } from "@tanstack/react-router"
import { LogOut, Search, Bell, Mail, User } from 'lucide-react';
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "@/lib/helpers/CaptalizeFirstLetter";

export const Navbar = () => {
    const router = useRouter();
    const pathname = useLocation();
    const currentPath = pathname.pathname.split("/")[1];
    const menuRef = useRef<HTMLDivElement>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        first_name: "",
        email: "",
        user_type: "",
    });

    const handleNavigation = () => {
        router.navigate({ to: "/" });
        Cookies.remove("token");
        localStorage.removeItem("authToken");
        localStorage.remove("userCredentials");
        setIsProfileMenuOpen(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userCredentials") || "{}");
        setUserDetails(user);
    }, []);

    return (
        <div className="flex justify-between items-center border-b px-4 h-14 w-full">
            <div className="text-md font-semibold ml-4 mt-2">
                {currentPath?.charAt(0).toUpperCase() + currentPath?.slice(1)}
            </div>
            <div className="flex items-center gap-4">
                <div className="p-1 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <Search size={16} strokeWidth={1.5} />
                </div>

                <div className="p-1 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <Bell size={16} strokeWidth={1.5} />
                </div>

                <div className="p-1 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <Mail size={16} strokeWidth={1.5} />
                </div>
                <div className="relative w-44 h-10">
                    <div
                        className="flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-2xl hover:bg-gray-100 cursor-pointer"
                        onMouseEnter={() => setIsProfileMenuOpen(true)}
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                        <img
                            src="/src/components/svg/userProfile.svg"
                            alt="User"
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="text-sm">
                            <div className="font-medium">

                                {capitalize(userDetails?.first_name ? userDetails?.first_name : "User Name")
                                }</div>
                            <div className="text-xs text-gray-500 -mt-1"> {userDetails?.user_type ? userDetails?.user_type : "--"}</div>
                        </div>
                        <svg
                            className=" flex w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {isProfileMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 w-52 bg-white shadow-lg rounded-md border py-1 z-50"
                            onMouseEnter={() => setIsProfileMenuOpen(true)}
                            onMouseLeave={() => setIsProfileMenuOpen(false)}
                        >
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                <div className="text-md  font-semibold text-gray-500">
                                    {userDetails?.email ? userDetails?.email : "--"}
                                </div>
                            </div>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover: cursor-pointer hover:bg-gray-100"
                                onClick={() => handleNavigation()}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}



