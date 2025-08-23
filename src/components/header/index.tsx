import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="border-b border-gray-300 sticky top-0 z-[999] bg-white">
            <div className="border-b border-gray-300 h-[58px]">
                <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 xl:px-32">
                    <span className="flex items-center">
                        <img
                            src="/assets/header/company-logo.svg"
                            alt="Logo"
                            className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[260px] h-[60px] md:h-[80px] -mt-1 md:-mt-3"
                        />
                    </span>
                    <span className="hidden md:flex items-center space-x-6">
                        <span className="flex items-center space-x-2">
                            <img src="/assets/header/testing-tube.svg" alt="Lab Tests" className="w-5 h-5" />
                            <span className="text-sm md:text-md font-semibold tracking-wide text-[#ED8818]">
                                Lab Tests
                            </span>
                        </span>

                        <span className="flex items-center space-x-2">
                            <img src="/assets/header/wishList.svg" alt="Wishlist" className="w-5 h-5" />
                            <span className="text-sm md:text-md font-semibold tracking-wide">Wishlist</span>
                        </span>

                        <span className="flex items-center space-x-2">
                            <img src="/assets/header/shopping-cart.svg" alt="Cart" className="w-5 h-5" />
                        </span>

                        <span className="flex items-center space-x-2">
                            <img src="/assets/header/login-user.svg" alt="Login" className="w-5 h-5" />
                            <span className="text-sm md:text-md font-semibold tracking-wide">Login</span>
                        </span>
                    </span>
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            <div className="hidden lg:flex justify-between px-4 sm:px-8 lg:px-16 xl:px-32 h-[46px] items-center">
                {[
                    "Yoda Products",
                    "Lab Tests",
                    "Health & Nutrition",
                    "Women Care",
                    "Personal Care",
                    "Ayurveda",
                    "Health Devices",
                    "Home Essentials",
                ].map((item, i) => (
                    <span
                        key={i}
                        className="text-sm md:text-md lg:text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]"
                    >
                        {item}
                    </span>
                ))}
            </div>

            {menuOpen && (
                <div className="flex flex-col bg-white px-6 py-4 space-y-3 md:hidden">
                    {[
                        "Yoda Products",
                        "Lab Tests",
                        "Health & Nutrition",
                        "Women Care",
                        "Personal Care",
                        "Ayurveda",
                        "Health Devices",
                        "Home Essentials",
                    ].map((item, i) => (
                        <span
                            key={i}
                            className="text-base tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Header;
