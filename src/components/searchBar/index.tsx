import { Search } from "lucide-react"

const SearchBar = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 md:mt-[64px] px-4 md:px-12 lg:px-16">
                <span className="mb-4 md:mb-0">
                    <h3 className="text-lg md:text-[20px] font-inter text-[#535353] font-semibold">
                        What are you looking for?
                    </h3>
                </span>
                <span className="flex flex-col md:flex-row md:space-x-3">
                    <span className="flex items-center font-medium text-sm md:text-[16px] leading-[25px] text-[#535353] pb-1">
                        <img src="/assets/searchBar/file.svg" alt="Logo" className="w-4 h-4 mr-1" />Order with prescription.
                    </span>
                    <span className="flex items-center font-medium text-sm md:text-[15px] mt-1 md:mt-0">
                        <span className="flex items-center text-[#ED8818] font-semibold">UPLOAD NOW</span>
                        <span className="flex text-[#ED8818] text-xl md:text-2xl items-center pb-1 pl-1">&gt;</span>
                    </span>
                </span>
            </div>
            <div className="flex mt-3 mx-2 md:mx-10 lg:mx-16 h-[49px]">
                <div className="flex w-full h-full border border-gray-300 rounded-full shadow-sm p-1.5">
                    <div className="flex relative w-full items-center">
                        <span className="h-full w-10 text-gray-400 pointer-events-none flex items-center justify-center">
                            <Search size={17} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search medicines & more"
                            className="w-full pr-2 md:pr-4 py-2 placeholder-gray-400 text-sm md:text-md font-medium focus:outline-none"
                        />
                    </div>
                    <div className="hidden sm:flex items-center bg-[#ED8818] rounded-full cursor-pointer text-white font-semibold px-3 md:px-4 text-lg md:text-xl w-[100px] md:w-[135px] justify-center tracking-wider">
                        Search
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBar