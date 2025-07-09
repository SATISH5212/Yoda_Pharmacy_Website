import { Link, useLocation, useRouter } from "@tanstack/react-router"
import { LogOut, Search, Bell, Mail, User } from 'lucide-react';
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
    const router = useRouter();
    const { pathname } = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleNavigation = (path: string) => {
        if (path === "/logout") {
            router.navigate({ to: "/" });
            Cookies.remove("token");
            localStorage.removeItem("authToken");
        } else {
            router.navigate({ to: path });
        }
        setIsProfileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };

        if (isProfileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    return (
        <div className="flex justify-between items-center border-b px-4 h-14 w-full">
            <div className="text-md font-semibold">
                Fields
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
                <div
                    className="flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer"
                    onMouseEnter={() => setIsProfileMenuOpen(true)}
                    onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                    <img
                        src="/path-to-user-image.jpg"
                        alt="User"
                        className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="text-sm">
                        <div className="font-medium leading-tight">Visualboard</div>
                        <div className="text-xs text-gray-500 -mt-1">Visualboard</div>
                    </div>
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );

}




//  {isProfileMenuOpen && (
//                         <div
//                             ref={menuRef}
//                             className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border py-1 z-20"
//                         >
//                             <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                                 <div className="font-normal">User Account</div>
//                                 <div className="text-xs text-gray-500">
//                                     {
//                                         // Assuming you have user data stored in localStorage
//                                         (() => {
//                                             const user = JSON.parse(localStorage.getItem("userCredentials") || "{}");
//                                             return user.email || "Guest";
//                                         })()
//                                     }
//                                 </div>
//                             </div>

//                             <button
//                                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                                 onClick={() => handleNavigation("/settings")}
//                             >
//                                 Settings
//                             </button>
//                             <button
//                                 className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
//                                 onClick={() => handleNavigation("/logout")}
//                             >
//                                 Sign Out
//                             </button>
//                         </div>
//                     )}



