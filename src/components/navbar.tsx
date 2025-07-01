import { Link, useLocation, useRouter } from "@tanstack/react-router"
import { LogOut, Search } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Mail } from 'lucide-react';

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
export const Navbar = () => {
    const router = useRouter();
    const { pathname } = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const handleNavigation = (path: any) => {
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

        <div style={{ padding: "8px", }} className="border-b-1">

            <Link to="/fields" className="text-sm font-bold">Robot Fields</Link>
            <div style={{ float: "right", paddingRight: "10px", display: "flex", gap: "15px" }}>
                <div className=" p-1 rounded-full border-2 border-gray-200 flex items-center">
                    <Search size={12} strokeWidth={2} />
                </div>
                <div className="p-1 rounded-full border-2 border-gray-200 flex items-center " >
                    <Bell size={12} strokeWidth={2} />
                </div>
                <div className="p-1 rounded-full border-2 border-gray-200 flex items-center ">
                    <Mail size={12} strokeWidth={2} />
                </div>
                <div className="p-1 rounded-full border-2 border-gray-200 flex items-center ">
                    <LogOut size={12} strokeWidth={2} onClick={() => handleNavigation("/logout")} />
                </div>
                {isProfileMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-fit px-4 bg-white shadow-lg rounded-lg border py-2 z-20"
                    >

                        <hr />
                        <button
                            className="p-1 rounded-full border-2 border-gray-200 flex items-center "
                            onClick={() => handleNavigation("/logout")}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}

