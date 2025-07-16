import { Link } from "@tanstack/react-router";
import { Settings } from 'lucide-react';
import { Joystick } from 'lucide-react';
import { Bot } from 'lucide-react';
import { Sprout } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="flex flex-col  items-center border-r-1 gap-80px mt-2">
            <img src="/src/components/svg/logo.svg" alt="logo" className="w-12 h-12 mb-14" />
            <div className="flex flex-col items-center gap-y-6">
                <Link to="/all-fields" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/src/components/svg/fields/fields.svg" alt="field" className="w-[26px] h-[20px] " />
                </Link>
                <Link to="/all-robots" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/src/components/svg/robots/all-robots.svg" alt="field" className="w-[24px] h-[20px]" />
                </Link>
                <Link to="/teleop" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/src/components/svg/teleoperation/teleoperation.svg" alt="field" className="w-[24px] h-[22px]" />
                </Link>
                <Link to="/add-robot" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/src/components/svg/questionIcon.svg" alt="field" className="w-[24px] h-[24px]" />
                </Link>
            </div>      
        </div>
    );
}

export default Sidebar;
