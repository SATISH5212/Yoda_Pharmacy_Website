const Header = () => {
    return (
        <div className="flex flex-col h-[100vh] bg-gray-100  p-4">
            <div className="flex justify-between items-center h-[8vh] bg-gray-100 pl-4 space-x-8">
                <div className="flex items-center gap-2 w-[75vw] bg-white px-4 py-2 rounded shadow-sm ">
                    <span className="text-gray-500">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Enter Github User Name"
                        className="flex-grow placeholder:text-xl font-medium placeholder:text-gray-900"
                    />
                    <button className="bg-red-500 bg-red-600 text-white px-2 py-1 rounded self-center">
                        ⋯
                    </button>
                    <button className="bg-teal-600  text-white px-3 py-1 rounded">
                        Search
                    </button>
                </div>


                <div className="text-[23px] text-gray-700 font-medium whitespace-nowrap ml-4 pr-10">
                    Requests: 60/60
                </div>

            </div>

            <div className="flex  mt-8 mr-10 space-x-4 justify-around pl-4">
                <div className="grid grid-cols-2 bg-white rounded shadow-sm h-20  w-[24%]">
                    <div className="flex justify-center ">
                        <span className="flex justify-center bg-pink-100 rounded-full  h-12 self-center w-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-pink-600 mt-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                            </svg>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center rounded leading-4 pb-2 ">
                        <div className="text-2xl font-bold text-gray-900 tracking-tight">107</div>
                        <div className="text-md text-gray-400 font-medium">Repos</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 bg-white rounded shadow-sm h-20  w-[24%]">
                    <div className="flex justify-center ">
                        <span className="flex justify-center bg-pink-100 rounded-full  h-12 self-center w-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-pink-600 mt-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                            </svg>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center rounded leading-4 pb-2 ">
                        <div className="text-2xl font-bold text-gray-900 tracking-tight">107</div>
                        <div className="text-md text-gray-400 font-medium">Repos</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 bg-white rounded shadow-sm h-20  w-[24%]">
                    <div className="flex justify-center ">
                        <span className="flex justify-center bg-pink-100 rounded-full  h-12 self-center w-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-pink-600 mt-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                            </svg>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center rounded leading-4 pb-2 ">
                        <div className="text-2xl font-bold text-gray-900 tracking-tight">107</div>
                        <div className="text-md text-gray-400 font-medium">Repos</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 bg-white rounded shadow-sm h-20  w-[24%]">
                    <div className="flex justify-center ">
                        <span className="flex justify-center bg-pink-100 rounded-full  h-12 self-center w-12">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-pink-600 mt-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                            </svg>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center rounded leading-4 pb-2 ">
                        <div className="text-2xl font-bold text-gray-900 tracking-tight">107</div>
                        <div className="text-md text-gray-400 font-medium">Repos</div>
                    </div>
                </div>
            </div>
            <div className="flex mt-12 space-x-4 ml-5">
                <div className="flex flex-col w-[47.5%] h-[45vh] bg-grey rounded  h-20  ">
                    <div className="flex justify-center items-center w-[14%] h-[6vh] bg-white text-md text-gray-400 font-small tracking-wide">User</div>
                    <div className="w-[100%] h-[45vh] bg-white">
                        <div className="flex h-[30%] w-[100%]">
                            <div className="flex w-[70%] justify-center items-center space-x-4">
                                <div className="flex w-16 justify-start items-center h-[90%] bg-pink-100 rounded-full mt-8 ml-12"></div>
                                <div className="mt-8">
                                    <div className=" text-sm font-bold text-gray-900 tracking-wide w-50">Nikaolay Advolodkin</div>
                                    <div className="text-sm text-gray-400 font-normal">@nikolay_a00</div>
                                </div>
                            </div>
                            <div className="flex w-[50%] items-center justify-center mt-7 ml-6 ">
                                <div className="border border-teal-500  rounded-full w-18 h-7 flex justify-end ml-4">
                                    <div className="text-sm text-teal-500 font-small mt-1 mr-2.5 tracking-widest">Follow</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-3 ml-12">
                            <div className="text-md text-gray-600 font-medium mt-4 tracking-tight">My mission is to train 1 Million SDETs!</div>
                            <div className="text-sm tracking-wide">
                                <div className="flex flex-row mt-2 gap-1.5 mb-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex h-5 w-5 text-grey-200 "
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                                    </svg><span className="text-sm text-gray-500 font-medium tracking-tight">Sauce Labs</span></div>
                                <div className="flex flex-row  gap-1.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex h-5 w-5 text-grey-200 "
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                                    </svg><span className="text-md text-gray-500 font-medium tracking-tight">Miami, FL</span></div>
                                <div className="flex flex-row  gap-1.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex h-5 w-5 text-grey-200 "
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M6 4a2 2 0 0 0-2 2v12a1 1 0 0 0 1.447.894L12 16.118l6.553 2.776A1 1 0 0 0 20 18V6a2 2 0 0 0-2-2H6z" />
                                    </svg><span className="text-sm text-teal-400 font-small tracking-small">www.ultimateqa.com</span></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[47.5%] h-[45vh]   bg-grey rounded h-20  ">
                    <div className="flex justify-center items-center w-[18%] h-[6vh] bg-white text-sm text-gray-400 font-small tracking-wide">Followers</div>
                    <div className="w-[100%] h-[45vh] bg-white ">
                        <div className="flex flex-row w-[100%] pl-7 mt-4 bg-white">
                            <div className="bg-orange-500  rounded-full w-9 h-9 flex justify-center">
                            </div>
                            <div className="flex flex-col ml-3 text-sm leading-3 mt-1">
                                <div className="font-bold text-black text-md">ThaELL1</div>
                                <div className="text-sm font-normal text-gray-500 tracking-tight">https://github.com/ThaELL1</div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%] pl-7 mt-4 bg-white">
                            <div className="bg-orange-500  rounded-full w-9 h-9 flex justify-center">
                            </div>
                            <div className="flex flex-col ml-3 text-sm leading-3 mt-1">
                                <div className="font-bold text-black text-md">ThaELL1</div>
                                <div className="text-sm font-normal text-gray-500 tracking-tight">https://github.com/ThaELL1</div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%] pl-7 mt-4 bg-white">
                            <div className="bg-orange-500  rounded-full w-9 h-9 flex justify-center">
                            </div>
                            <div className="flex flex-col ml-3 text-sm leading-3 mt-1">
                                <div className="font-bold text-black text-md">ThaELL1</div>
                                <div className="text-sm font-normal text-gray-500 tracking-tight">https://github.com/ThaELL1</div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%] pl-7  mt-4 bg-white">
                            <div className="bg-orange-500  rounded-full w-9 h-9 flex justify-center">
                            </div>
                            <div className="flex flex-col ml-3 text-sm leading-3 mt-1">
                                <div className="font-bold text-black text-md">ThaELL1</div>
                                <div className="text-sm font-normal text-gray-500 tracking-tight">https://github.com/ThaELL1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;