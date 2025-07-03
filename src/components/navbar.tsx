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
        <div style={{ padding: "8px" }} className="border-b-1 flex justify-between items-center">
            <Link to="/fields" className="text-sm font-bold">Robot Fields</Link>

            <div className="flex gap-4 items-center">
                {/* Search Icon */}
                <div className="p-1 rounded-full border-2 border-gray-200 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Search size={12} strokeWidth={2} />
                </div>

                {/* Notification Icon */}
                <div className="p-1 rounded-full border-2 border-gray-200 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Bell size={12} strokeWidth={2} />
                </div>

                {/* Mail Icon */}
                <div className="p-1 rounded-full border-2 border-gray-200 flex items-center hover:bg-gray-100 cursor-pointer">
                    <Mail size={12} strokeWidth={2} />
                </div>

                {/* Profile Icon with Dropdown */}
                <div className="relative"
                    onMouseEnter={() => setIsProfileMenuOpen(true)}
                    onMouseLeave={() => setIsProfileMenuOpen(false)}>
                    <div className="p-1 rounded-full border-2 border-gray-200 flex items-center hover:bg-gray-100 cursor-pointer">
                        <User size={12} strokeWidth={2} />
                    </div>

                    {isProfileMenuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border py-1 z-20"
                        >
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                <div className="font-normal">User Account</div>
                                <div className="text-xs text-gray-500">
                                    {
                                        // Assuming you have user data stored in localStorage
                                        (() => {
                                            const user = JSON.parse(localStorage.getItem("userCredentials") || "{}");
                                            return user.email || "Guest";
                                        })()
                                    }
                                </div>
                            </div>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleNavigation("/profile")}
                            >
                                My Profile
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleNavigation("/settings")}
                            >
                                Settings
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => handleNavigation("/logout")}
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







// import { Link, useLocation, useRouter } from "@tanstack/react-router"
// import { LogOut, Search } from 'lucide-react';
// import { Bell } from 'lucide-react';
// import { Mail } from 'lucide-react';

// import Cookies from "js-cookie";
// import { useEffect, useRef, useState } from "react";
// export const Navbar = () => {
//     const router = useRouter();
//     const { pathname } = useLocation();
//     const menuRef = useRef<HTMLDivElement>(null);
//     const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//     const handleNavigation = (path: any) => {
//         if (path === "/logout") {
//             router.navigate({ to: "/" });
//             Cookies.remove("token");
//             localStorage.removeItem("authToken");
//         } else {
//             router.navigate({ to: path });
//         }
//         setIsProfileMenuOpen(false);
//     };
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//                 setIsProfileMenuOpen(false);
//             }
//         };

//         if (isProfileMenuOpen) {
//             document.addEventListener("mousedown", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isProfileMenuOpen]);
//     return (

//         <div style={{ padding: "8px", }} className="border-b-1">

//             <Link to="/fields" className="text-sm font-bold">Robot Fields</Link>
//             <div style={{ float: "right", paddingRight: "10px", display: "flex", gap: "15px" }}>
//                 <div className=" p-1 rounded-full border-2 border-gray-200 flex items-center">
//                     <Search size={12} strokeWidth={2} />
//                 </div>
//                 <div className="p-1 rounded-full border-2 border-gray-200 flex items-center " >
//                     <Bell size={12} strokeWidth={2} />
//                 </div>
//                 <div className="p-1 rounded-full border-2 border-gray-200 flex items-center ">
//                     <Mail size={12} strokeWidth={2} />
//                 </div>
//                 <div className="p-1 rounded-full border-2 border-gray-200 flex items-center ">
//                     <LogOut size={12} strokeWidth={2} onClick={() => handleNavigation("/logout")} />
//                 </div>
//                 {isProfileMenuOpen && (
//                     <div
//                         ref={menuRef}
//                         className="absolute right-0 mt-2 w-fit px-4 bg-white shadow-lg rounded-lg border py-2 z-20"
//                     >

//                         <hr />
//                         <button
//                             className="p-1 rounded-full border-2 border-gray-200 flex items-center "
//                             onClick={() => handleNavigation("/logout")}
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>

//     )
// }

