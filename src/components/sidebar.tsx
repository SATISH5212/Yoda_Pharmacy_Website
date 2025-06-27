import { Link } from "@tanstack/react-router";
import { Settings } from 'lucide-react';
import { Joystick } from 'lucide-react';
import { Bot } from 'lucide-react';
import { Sprout } from 'lucide-react';
// import { LogOut } from 'lucide-react';


export function Sidebar() {
    return (
        <div className=" pt-8  mr-2 w-15 flex flex-col items-center border-r-1 ">
            <Link to="/field" className="[&.active]:bg-[#0ed78d] mb-8 hover:bg-green-200 rounded-lg h-8 w-8 flex items-center justify-center">
                <Sprout size={20} strokeWidth={2} />
            </Link>
            <Link to="/devices" className="[&.active]:bg-[#0ed78d] mb-8  hover:bg-green-200  rounded-lg h-8 w-8 flex items-center justify-center">
                <Bot size={20} strokeWidth={2}/>
            </Link>
            <Link to="/teleop" className="[&.active]:bg-[#0ed78d] mb-8  hover:bg-green-200 rounded-lg h-8 w-8 flex items-center justify-center">
                <Joystick size={20} strokeWidth={2}/>
            </Link>
            <Link to="/settings" className="[&.active]:bg-[#0ed78d]  hover:bg-green-200  rounded-lg h-8 w-8 flex items-center justify-center">
                <Settings size={20} strokeWidth={2}/>
            </Link> 
{/* 
            <div className="mt-50">
                  <LogOut size={20} strokeWidth={2} />
            </div> */}
          
        </div>
    );
}
