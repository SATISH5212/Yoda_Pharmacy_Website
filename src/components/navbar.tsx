import { Link } from "@tanstack/react-router"
import { Search } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Mail } from 'lucide-react';


export const Navbar = () => {
    return (

        <div style={{ padding: "8px",}} className="border-b-1">
            
            <Link to="/field" className="text-sm font-bold">Robot Fields</Link>
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
            </div>
        </div>

    )
}

