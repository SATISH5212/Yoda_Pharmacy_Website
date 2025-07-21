import { Link } from "@tanstack/react-router";
import CompanyLogo from "public/assets/logo";

const Sidebar = () => {
    return (
        <div className="flex flex-col  items-center border-r-1 gap-80px mt-2">
            <CompanyLogo width={12} height={12} mb={14} />
            <div className="flex flex-col items-center gap-y-6">
                <Link to="/all-fields" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/assets/fields/fields.svg" alt="field" className="w-[26px] h-[20px] " />
                </Link>
                <Link to="/all-robots" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/assets/robots/all-robots.svg" alt="field" className="w-[24px] h-[20px]" />
                </Link>
                <Link to="/all-robots" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/assets/teleoperation/teleoperation.svg" alt="field" className="w-[24px] h-[22px]" />
                </Link>
                <Link to="/add-robot" className="[&.active]:bg-[#05A155] hover:bg-gray-300 rounded-sm h-8 w-8 flex items-center justify-center">
                    <img src="/assets/questionIcon.svg" alt="field" className="w-[24px] h-[24px]" />
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
