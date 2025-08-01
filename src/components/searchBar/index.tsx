import { Search } from "lucide-react"

const SearchBar = () => {
    return (
        <div className="">

            <div className="flex  items-center  justify-between mt-48.5  px-46">
                <span>
                    <h3 className="text-[20px] font-inter text-[#535353] font-semibold">
                        What are you looking for?
                    </h3>
                </span>
                <span className="flex space-x-3">
                    <span className="flex items-center font-medium text-[16px] leading-[25px] text-[#535353] pb-1">
                        <img src="/public/assets/searchBar/file.svg" alt="Logo" className="w-4 h-4 mr-1 " />Order with prescription.</span>
                    <span className="flex items-center font-medium text-[15px]  ">
                        <span className="flex items-center  text-[#ED8818] font-semibold">UPLOAD NOW</span>  <span className=" flex text-[#ED8818] text-2xl items-center pb-1 pl-1">&gt;</span>
                    </span>
                </span>

            </div >
            <div className="flex mt-3 mx-40.5 h-[49px] pl-3">
                <div className="flex w-full h-full border border-gray-300 rounded-full shadow-sm p-1.5">

                    <div className="flex relative w-full items-center">
                        <span className="h-full w-10 text-gray-400 pointer-events-none flex items-center justify-center">
                            <Search size={17} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search medicines & more"
                            className="w-full  pr-4 py-2 placeholder-gray-400 text-md font-medium focus:outline-none "
                        />
                    </div>
                    <div className="flex items-center bg-[#ED8818] rounded-full cursor-pointer text-white font-semibold px-4 text-xl w-[135px] justify-center tracking-wider    ">
                        Search
                    </div>

                </div>

            </div>
        </div>
    )
}
export default SearchBar