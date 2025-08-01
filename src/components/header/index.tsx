const Header = () => {
    return (
        <div className="border-b border-gray-300 sticky top-0  z-[999] " >
            <div className="border-b border-gray-300  h-[58px]">
                <div className="flex justify-between mx-44 pr-7 ">
                    <span className="flex items-center"><img src="/public/assets/header/company-logo.svg" alt="Logo" className="w-[260px] h-[80px]  -mt-3" /></span>
                    <span className="flex items-center space-x-7 ">
                        <span className="flex items-start space-x-2 ">
                            <img src="/public/assets/header/testing-tube.svg" alt="Logo" className="w-[20px] h-[20px] " />
                            <span className="text-md font-semibold tracking-wide text-[#ED8818]">Lab Tests</span>
                        </span>
                        <span className="flex items-start  space-x-2 ">
                            <img src="/public/assets/header/wishList.svg" alt="Logo" className="w-[20px] h-[20px]" />
                            <span className="text-md font-semibold tracking-wide">Wishlist</span>
                        </span>

                        <span className="flex items-start  space-x-2 ">
                            <img src="/public/assets/header/shopping-cart.svg" alt="Logo" className="w-[20px] h-[20px] " />
                        </span>
                        <span className="flex items-start  space-x-2 ">
                            <img src="/public/assets/header/login-user.svg" alt="Logo" className="w-[20px] h-[20px]" />
                            <span className="text-md font-semibold tracking-wide">Login</span>
                        </span>
                    </span>
                </div>
            </div>
            <div className="flex justify-between mx-44 pr-7  h-[46px] items-center  ">
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Yoda Products </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Lab Tests </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Health & Nutrition </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Women Care  </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]"> Personal Care </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Ayurveda </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Health Devices </span>
                <span className="text-lg tracking-wide text-[#434040] cursor-pointer hover:text-[#ED8818]">Home Essentials </span>
            </div>


        </div>
    )
}

export default Header   