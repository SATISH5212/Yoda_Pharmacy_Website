import Header from "../header"
import { Search } from "lucide-react"
import SearchBar from "../searchBar"
const MainScreen = () => {
    return (
        <div className=" overflow-x-hidden  h-screen pr-7">
            {/* <Header /> */}
            <div className=" mx-44">
                <SearchBar />
            </div>
            <div className="flex mx-43 mt-12  pl-4">
                <span className="flex w-full justify-between">

                    <div className="flex flex-col items-center ">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D] mt-2 ">Medicine</span>



                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D] mt-2 ">Women Care</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D]  mt-2 ">Health &  Nutrition</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D] mt-2  ">Protein's</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D] mt-2 ">Home Essentails</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D] mt-2  ">Ayurveda</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D]  mt-2 ">Personal Care</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="/public/assets/categories/_categories_category_1.png"
                                alt="Medicine"
                                className="h-[130px] w-[131px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                        <span className="font-medium text-[15px] text-[#4D4D4D]  mt-2 ">Offers</span>
                    </div>
                </span>
            </div>
            <div className="flex mx-40 mt-12  pl-3.5 h-[197px]  justify-between ">
                <img src="/public/assets/services/Free-Delivery.svg" alt="Medicine" className="h-full w-1/3" />
                <img src="/public/assets/services/Banner-2.svg" alt="Medicine" className="h-full w-1/3" />
                <img src="/public/assets/services/Banner-3_1.svg" alt="Medicine" className="h-full w-1/3" />

            </div>
            <div className="flex mx-42 mt-14.5  pl-7 h-[235px]  ">
                <div className="flex w-full  rounded-md  ">
                    <span className="flex w-4/10 bg-[#00435D] items-center rounded-l-md ">
                        <div className="flex items-center w-5/12 h-full justify-center  "><img src="/public/assets/services/_icons_prescription-icon.png" alt="Medicine" className="w-[130px] h-[153px]  pl-4 " /></div>
                        <div className="flex  flex-col h-full w-8/12   justify-center ">
                            <div className="h-full my-13" >
                                <div className="text-2xl font-bold text-white">Order with Prescription</div>
                                <div className="font-semibold text-white text-xl mt-3">Upload prescription and we will</div>
                                <div className="font-semibold text-white text-xl mt-0.5">deliver your medicines</div>
                                <button className="bg-[#ED8818] text-white rounded-md font-medium text-md w-40 h-11 mt-4">Upload</button>
                            </div>
                        </div>
                    </span>

                    <span className="w-6/10 border rounded-r-md px-11 py-8">

                        <div className="text-2xl font-semibold text-[#535353] mb-5">
                            How does this work?
                        </div>


                        <div className="grid grid-cols-2 gap-y-6 gap-x-10 ">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                    1
                                </div>
                                <p className="text-base text-black font-medium tracking-wide">
                                    Upload a photo of your prescription.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-9 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                    2
                                </div>
                                <p className="text-base text-black font-medium tracking-wide">
                                    Add delivery address and place the order.
                                </p>
                            </div>


                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-9 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                    3
                                </div>
                                <p className="text-base text-black font-medium tracking-wide">
                                    We will call you to confirm the medicines.
                                </p>
                            </div>


                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-14 h-8 bg-[#00435D] text-white rounded-full font-bold">
                                    4
                                </div>
                                <p className="text-base text-black font-medium tracking-wide">
                                    Now, sit back! your medicines will get delivered at your doorstep.
                                </p>
                            </div>
                        </div>
                    </span>


                </div>


            </div >
            <div className="flex flex-col mx-45 mt-5  pl-3.5 ">
                <div className="text-2xl font-semibold tracking-wide ">New Launches</div>
                <div className="text-lg font-semibold text-[#535353]">New wellness range just for you!</div>
            </div>
            <div className="flex flex-col mx-45 mt-5  pl-3.5 mt-1">
                <div className="text-2xl font-semibold tracking-wide ">Trending in your City</div>
                <div className="text-lg font-semibold text-[#535353]">Popular in your city</div>
            </div>
            <div className="flex flex-col mx-43 mt-5  pl-3.5 mt-13">
                <div className="text-2xl font-semibold ">Shop by Concern</div>
                <div className="text-lg font-semibold text-[#535353]">Products are handpicked by experts</div>
            </div>

            <div className="flex mx-42 mt-8  pl-2">
                <span className="flex w-full justify-start space-x-3">

                    <div className="flex flex-col items-center ">
                        <div className="rounded-xl bg-[#FFEFDD]">
                            <img
                                src="/public/assets/health/image_1.svg"
                                alt="Medicine"
                                className="h-[167px] w-[195px] px-8 py-10"
                            />
                        </div>
                        <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Skin care</span>



                    </div>

                    <div className="flex flex-col items-center ">
                        <div className="rounded-xl bg-[#FFEFDD]">
                            <img
                                src="/public/assets/health/image_2.svg"
                                alt="Medicine"
                                className="h-[167px] w-[195px] px-8 py-10"
                            />
                        </div>
                        <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Vitamins</span>



                    </div>
                    <div className="flex flex-col items-center ">
                        <div className="rounded-xl bg-[#FFEFDD]">
                            <img
                                src="/public/assets/health/image_3.svg"
                                alt="Medicine"
                                className="h-[167px] w-[195px] px-8 py-10"
                            />
                        </div>
                        <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Diabetes Care & Sugar</span>



                    </div>
                    <div className="flex flex-col items-center ">
                        <div className="rounded-xl bg-[#FFEFDD]">
                            <img
                                src="/public/assets/health/image_4.svg"
                                alt="Medicine"
                                className="h-[167px] w-[195px] px-8 py-10"
                            />
                        </div>
                        <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Cardiac Care</span>



                    </div>
                    <div className="flex flex-col items-center ">
                        <div className="rounded-xl bg-[#FFEFDD]">
                            <img
                                src="/public/assets/health/image_5.svg"
                                alt="Medicine"
                                className="h-[167px] w-[195px] px-8 py-10"
                            />
                        </div>
                        <span className="font-medium text-[17px] text-[#4D4D4D] mt-1 ">Baby & Mom Care</span>



                    </div>
                </span>
            </div>
            <div className="flex flex-col mx-43 mt-3  pl-3.5">
                <div className="text-2xl font-semibold ">Featured Brands</div>
                <div className="text-lg font-semibold text-[#535353]">Pick from our favorite brands</div>
            </div>
            <div className="flex mx-40 mt-12  pl-3.5 h-[197px]  justify-between ">dhd</div>
            <div className="flex mx-40 mt-12  pl-3.5 h-[197px]  justify-between ">dhd</div>
            <div className="flex mx-40 mt-12  pl-3.5 h-[197px]  justify-between ">dhd</div>
            <div className="flex mx-40 mt-12  pl-3.5 h-[197px]  justify-between ">dhd</div>
        </div >
    )
}

export default MainScreen